import glob
import logging
import re
from datetime import date
from pathlib import Path

from sqlalchemy.exc import IntegrityError

from app.collectors.base import BaseCollector
from app.config import settings
from app.core.database import async_session
from app.models.community_snapshot import CommunitySnapshot

logger = logging.getLogger("evo-dashboard.collector.community")

WORKSPACE_ROOT = Path(settings.WORKSPACE_ROOT)
DAILY_DIR = WORKSPACE_ROOT / "03 Comunidade" / "reports" / "daily"
WEEKLY_DIR = WORKSPACE_ROOT / "03 Comunidade" / "reports" / "weekly"


def _strip_tags(html: str) -> str:
    return re.sub(r'<[^>]+>', '', html).strip()


def _strip_styles(html: str) -> str:
    html = re.sub(r'<style[^>]*>.*?</style>', '', html, flags=re.DOTALL)
    html = re.sub(r'<script[^>]*>.*?</script>', '', html, flags=re.DOTALL)
    return html


def _extract_date_from_filename(filename: str) -> date | None:
    match = re.search(r"(\d{4}-\d{2}-\d{2})", filename)
    if match:
        return date.fromisoformat(match.group(1))
    # Weekly: [C] 2026-W14-community-report.html → Monday of that week
    week_match = re.search(r"(\d{4})-W(\d{2})", filename)
    if week_match:
        year, week = int(week_match.group(1)), int(week_match.group(2))
        return date.fromisocalendar(year, week, 1)
    return None


def _extract_week_from_filename(filename: str) -> str | None:
    match = re.search(r"(\d{4}-W\d{2})", filename)
    return match.group(1) if match else None


def _extract_status(html: str) -> str:
    match = re.search(r'health-badge\s+(normal|atencao|critico)', html)
    return match.group(1) if match else "normal"


def _extract_metrics(html: str) -> dict:
    label_to_field = {
        "mensagens": "messages_count",
        "total mensagens": "messages_count",
        "membros ativos": "active_members",
        "wam": "active_members",
        "novos membros": "new_members",
    }
    result = {"messages_count": 0, "active_members": 0, "new_members": 0}
    # Daily format: class="label" + class="value"
    pairs = re.findall(
        r'class="label"[^>]*>([^<]+)</div>\s*<div class="value"[^>]*>(\d+)</div>',
        html,
    )
    # Weekly format: class="m-label" + class="m-value"
    pairs += re.findall(
        r'class="m-label"[^>]*>([^<]+)</div>\s*<div class="m-value"[^>]*[^>]*>(\d+)',
        html,
    )
    for label_text, value_text in pairs:
        label_clean = re.sub(r'\s*\([^)]*\)', '', label_text).strip().lower()
        field = label_to_field.get(label_clean)
        if field and result[field] == 0:
            result[field] = int(value_text)
    return result


def _extract_sentiment(html: str) -> tuple[float | None, str | None, str | None, str | None]:
    """Returns (score, label, emoji, narrative_text)."""
    body = _strip_styles(html)
    emoji_map = {"🟢": (0.8, "positivo"), "🟡": (0.5, "neutro"), "🔴": (0.2, "negativo")}

    score, label, emoji, narrative = None, None, None, None

    for em, (sc, lb) in emoji_map.items():
        if em in body:
            emoji = em
            score = sc
            # Get label text near emoji (e.g. "Neutro / Misto")
            lbl_match = re.search(re.escape(em) + r'.*?font-weight:\s*700[^>]*>([^<]+)<', body, re.DOTALL)
            if lbl_match:
                label = lbl_match.group(1).strip()
            else:
                label = lb
            break

    # Extract narrative text from sentiment section
    sent_section = re.search(r'Sentimento</h2>.*?<div[^>]*style="[^"]*line-height[^"]*"[^>]*>(.*?)</div>', body, re.DOTALL)
    if sent_section:
        narrative = _strip_tags(sent_section.group(1)).strip()

    return score, label, emoji, narrative


def _extract_support_items(html: str) -> list[dict]:
    items = []
    matches = re.findall(
        r'class="question"[^>]*>([^<]+)</div>\s*<div class="time[^"]*"[^>]*>([^<]+)</div>',
        html,
    )
    for question, status in matches:
        items.append({"question": question.strip(), "status": status.strip()})
    return items


def _extract_top_topics(html: str) -> list[dict]:
    topics = []
    # Daily: topic-name + topic-count with "~18 menções"
    pairs = re.findall(
        r'class="topic-name"[^>]*>([^<]+)</div>\s*'
        r'<div class="topic-count"[^>]*>~?(\d+)',
        html,
    )
    for name, count in pairs:
        topics.append({"topic": name.strip(), "count": int(count)})
    # Weekly: topic-name + topic-msgs with "~80 msgs"
    if not topics:
        pairs = re.findall(
            r'class="topic-name"[^>]*>([^<]+)</div>\s*'
            r'<div class="topic-msgs"[^>]*>~?(\d+)',
            html,
        )
        for name, count in pairs:
            topics.append({"topic": name.strip(), "count": int(count)})
    return topics[:10]


def _extract_standout_members(html: str) -> list[dict]:
    members = []
    rows = re.findall(
        r'<tr>\s*<td><strong>([^<]+)</strong></td>\s*<td>([^<]+)</td>\s*<td>([^<]+)</td>\s*</tr>',
        html,
    )
    for name, contribution, channel in rows:
        members.append({
            "name": name.strip(),
            "contribution": contribution.strip(),
            "channel": channel.strip(),
        })
    return members


def _extract_new_members(html: str) -> list[dict]:
    members = []
    # New members section has a table with username and join time
    new_section = re.search(r'Novos Membros.*?<tbody>(.*?)</tbody>', html, re.DOTALL)
    if new_section:
        rows = re.findall(r'<td>([^<]+)</td>\s*<td>([^<]+)</td>', new_section.group(1))
        for name, time in rows:
            members.append({"name": name.strip(), "joined_at": time.strip()})
    return members


def _extract_action_items(html: str) -> list[dict]:
    items = []
    matches = re.findall(
        r'class="action-text"[^>]*>([^<]+)</div>\s*<div class="action-tag\s+(\w+)"[^>]*>([^<]+)</div>',
        html,
    )
    for text, priority_class, priority_label in matches:
        items.append({
            "text": text.strip(),
            "priority": priority_label.strip(),
            "priority_class": priority_class.strip(),
        })
    return items


def _extract_unresolved(html: str) -> int:
    return len(re.findall(r'sem\s+resposta', html, re.IGNORECASE))


def _parse_report(filepath: str, report_type: str = "daily") -> dict | None:
    try:
        with open(filepath, encoding="utf-8") as f:
            html = f.read()
    except Exception as e:
        logger.error(f"Failed to read {filepath}: {e}")
        return None

    report_date = _extract_date_from_filename(Path(filepath).name)
    if not report_date:
        logger.warning(f"Could not extract date from {filepath}")
        return None

    metrics = _extract_metrics(html)
    status = _extract_status(html)
    score, label, emoji, narrative = _extract_sentiment(html)
    if score is None:
        logger.warning(f"Could not extract sentiment from {filepath}")
    topics = _extract_top_topics(html)
    support = _extract_support_items(html)
    standout = _extract_standout_members(html)
    new_members = _extract_new_members(html)
    actions = _extract_action_items(html)
    unresolved = _extract_unresolved(html)

    return {
        "date": report_date,
        "report_type": report_type,
        "messages_count": metrics["messages_count"],
        "active_members": metrics["active_members"],
        "new_members": metrics["new_members"],
        "sentiment_score": score,
        "sentiment_label": label,
        "top_topics": topics,
        "unresolved_questions": unresolved,
        "status": status,
        "report_data": {
            "sentiment_emoji": emoji,
            "sentiment_narrative": narrative,
            "support_items": support,
            "standout_members": standout,
            "new_members_list": new_members,
            "action_items": actions,
        },
    }


class CommunityCollector(BaseCollector):
    @property
    def name(self) -> str:
        return "community"

    async def collect(self) -> None:
        total_imported = 0
        total_skipped = 0

        # Process daily reports
        if DAILY_DIR.exists():
            for filepath in sorted(glob.glob(str(DAILY_DIR / "*.html"))):
                data = _parse_report(filepath, "daily")
                if data is None:
                    continue
                imported = await self._save(data)
                if imported:
                    total_imported += 1
                else:
                    total_skipped += 1

        # Process weekly reports
        if WEEKLY_DIR.exists():
            for filepath in sorted(glob.glob(str(WEEKLY_DIR / "*.html"))):
                data = _parse_report(filepath, "weekly")
                if data is None:
                    continue
                imported = await self._save(data)
                if imported:
                    total_imported += 1
                else:
                    total_skipped += 1

        logger.info(f"Community collector: {total_imported} imported, {total_skipped} skipped")

    async def _save(self, data: dict) -> bool:
        async with async_session() as session:
            snapshot = CommunitySnapshot(
                date=data["date"],
                report_type=data["report_type"],
                messages_count=data["messages_count"],
                active_members=data["active_members"],
                new_members=data["new_members"],
                sentiment_score=data["sentiment_score"],
                sentiment_label=data["sentiment_label"],
                top_topics=data["top_topics"],
                unresolved_questions=data["unresolved_questions"],
                status=data["status"],
                report_data=data["report_data"],
            )
            session.add(snapshot)
            try:
                await session.commit()
                return True
            except IntegrityError:
                await session.rollback()
                return False
