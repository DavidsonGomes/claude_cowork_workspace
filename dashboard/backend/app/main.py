import logging
import os
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from rich.logging import RichHandler

from app.core.database import init_db
from app.core.scheduler import start_scheduler, stop_scheduler

logging.basicConfig(
    level=logging.INFO,
    format="%(message)s",
    handlers=[RichHandler(rich_tracebacks=True)],
)
logging.getLogger("apscheduler").setLevel(logging.WARNING)


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    start_scheduler()
    yield
    stop_scheduler()


app = FastAPI(title="EVO Dashboard API", lifespan=lifespan)

# API routers
from app.api.routines import router as routines_router
from app.api.community import router as community_router
app.include_router(routines_router)
app.include_router(community_router)


@app.get("/health")
async def health():
    return {"status": "ok"}


frontend_dist = os.path.join(os.path.dirname(__file__), "../../frontend/dist")
if os.path.exists(frontend_dist):
    app.mount("/", StaticFiles(directory=frontend_dist, html=True), name="frontend")
