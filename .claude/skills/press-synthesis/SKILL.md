---
name: press-synthesis
description: Use when turning raw news items into a concise executive briefing filtered on chosen themes. Produces a dated, sourced, skimmable business & tech brief.
---

# Press synthesis

Turn a pile of news into a **2-minute executive read**: what happened, why it matters, what to watch — every claim sourced.

## Method

1. **Confirm the themes & scope.** Which topics (e.g. *GenAI, regulation, deals, talent*) and which time window (today / last 7 days)? Filter aggressively — relevance over volume.
2. **Gather fresh items.** Use `npm run fetch:news -- "<query>"` (Tavily/NewsAPI) or your own web search. Capture title, source, date, URL.
3. **Cluster** items into 3–6 themes. Drop duplicates and low-signal noise.
4. **Synthesize per theme**: 1–2 sentences on *what happened* + 1 sentence on *why it matters / so what*. Cite the source inline.
5. **Lead with a TL;DR** — the 3 things an executive must know.

**Length budget:** keep the body **≤ ~500 words** (a 2–3 min read) — TL;DR + 3–6 themes,
each 1–2 lines. This makes "skimmable" an objective check: if it runs long, cut themes or
tighten lines rather than adding more. Brevity is the deliverable.

## Output format

```markdown
# Executive Briefing — <date>
*Scope: <themes> · sources as of <time>*

## TL;DR
1. ...
2. ...
3. ...

## <Theme>
- **<Headline>.** What happened. *Why it matters:* ... ([source](url), date)

## On the radar
- Early signals worth a second look next time.
```

## Limits to state out loud

- **Freshness ≠ truth.** Flag single-source or unconfirmed items.
- The model can't know what it didn't fetch — name the sources/window so gaps are visible.
- No paywalled content is reproduced; summarize and link.
