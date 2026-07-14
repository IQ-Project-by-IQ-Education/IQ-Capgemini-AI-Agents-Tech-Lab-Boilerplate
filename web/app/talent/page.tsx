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
          <p>Nothing here yet — and that&apos;s normal.</p>
          <p>
            This page fills up if you build a CV-scoring agent. Tell Claude Code:{" "}
            <strong>“I want to build my agent”</strong> and describe a CV-screening job — a
            sales CV bank and job offer are already included. Then refresh this page.
          </p>
        </div>
      )}

      <Runs runs={runs} />
    </>
  );
}
