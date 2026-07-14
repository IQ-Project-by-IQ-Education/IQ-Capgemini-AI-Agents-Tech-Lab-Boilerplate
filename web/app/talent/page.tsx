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
          <p>Nothing here yet, and that&apos;s normal.</p>
          <p>
            This page fills up during the <strong>live CV-scoring demo</strong>: one agent
            screens 20 CVs, argues its top 5, re-ranks after spoken feedback, and remembers
            your preferences for next time.
          </p>
        </div>
      )}

      <Runs runs={runs} />
    </>
  );
}
