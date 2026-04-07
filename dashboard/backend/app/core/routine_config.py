import os
from dataclasses import dataclass
from pathlib import Path

import yaml


@dataclass
class RoutineConfig:
    timeout: int = 900
    max_retries: int = 1
    retry_delay: int = 30


_config: dict | None = None


def _load_config() -> dict:
    global _config
    if _config is not None:
        return _config
    config_path = Path(__file__).parent / "routine_config.yaml"
    if config_path.exists():
        with open(config_path) as f:
            _config = yaml.safe_load(f)
    else:
        _config = {"defaults": {}, "routines": {}}
    return _config


def get_routine_config(name: str) -> RoutineConfig:
    config = _load_config()
    defaults = config.get("defaults", {})
    routine = config.get("routines", {}).get(name, {})
    return RoutineConfig(
        timeout=routine.get("timeout", defaults.get("timeout", 900)),
        max_retries=routine.get("max_retries", defaults.get("max_retries", 1)),
        retry_delay=routine.get("retry_delay", defaults.get("retry_delay", 30)),
    )
