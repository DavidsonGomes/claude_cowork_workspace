import logging
from abc import ABC, abstractmethod


class BaseCollector(ABC):
    @property
    @abstractmethod
    def name(self) -> str: ...

    @abstractmethod
    async def collect(self) -> None: ...

    async def safe_collect(self) -> None:
        logger = logging.getLogger(f"evo-dashboard.collector.{self.name}")
        try:
            await self.collect()
            logger.info(f"Collector {self.name} completed")
        except Exception as e:
            logger.error(f"Collector {self.name} failed: {e}")
