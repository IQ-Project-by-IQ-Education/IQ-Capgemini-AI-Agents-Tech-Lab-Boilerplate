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
          <p>No briefing yet.</p>
          <p>
            In Claude Code, run the <code>press-synthesis</code> skill on your themes and write
            the briefing to <code>projects/2-radar-press-synthesis/output/briefing-&lt;date&gt;.md</code>.
            Then refresh this page.
          </p>
        </div>
      )}

      <Runs runs={runs} />
    </>
  );
}
