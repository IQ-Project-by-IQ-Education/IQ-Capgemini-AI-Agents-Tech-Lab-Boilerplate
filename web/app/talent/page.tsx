import { readLatestMarkdown, readRuns } from "@/lib/readOutput";
import { renderMarkdown } from "@/lib/markdown";
import { Runs } from "@/components/Runs";

export const dynamic = "force-dynamic";

export default async function TalentPage() {
  const doc = await readLatestMarkdown("1-talent-cv-scoring");
  const runs = await readRuns("1-talent-cv-scoring");

  return (
    <>
      <div className="page-head">
        <span className="tag">Talent</span>
        <h1>CV scorecard</h1>
        {doc && <div className="source">Showing {doc.name}</div>}
      </div>

      {doc ? (
        <article className="doc">{renderMarkdown(doc.content)}</article>
      ) : (
        <div className="empty">
          <p>No scorecard yet.</p>
          <p>
            In Claude Code, run the <code>cv-scoring</code> skill on{" "}
            <code>projects/1-talent-cv-scoring/data/jobs/sales-account-executive.md</code> and
            write the result to{" "}
            <code>projects/1-talent-cv-scoring/output/</code> as a <code>.md</code> file. Then
            refresh this page.
          </p>
        </div>
      )}

      <Runs runs={runs} />
    </>
  );
}
