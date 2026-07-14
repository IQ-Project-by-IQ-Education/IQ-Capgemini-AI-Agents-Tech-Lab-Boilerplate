import { readLatestMarkdown, readRuns } from "@/lib/readOutput";
import { renderMarkdown } from "@/lib/markdown";
import { Runs } from "@/components/Runs";

export const dynamic = "force-dynamic";

export default async function RadarPage() {
  const doc = await readLatestMarkdown("2-radar-press-synthesis");
  const runs = await readRuns("2-radar-press-synthesis");

  return (
    <>
      <div className="page-head">
        <span className="tag">Radar</span>
        <h1>Press briefing</h1>
        {doc && <div className="source">Showing {doc.name}</div>}
      </div>

      {doc ? (
        <article className="doc">{renderMarkdown(doc.content)}</article>
      ) : (
        <div className="empty">
          <p>Nothing here yet — and that&apos;s normal.</p>
          <p>
            Tell Claude Code: <strong>“quick start”</strong>. Answer three simple questions, and
            your press release and news briefing will appear right here. Then refresh this page.
          </p>
        </div>
      )}

      <Runs runs={runs} />
    </>
  );
}
