import { listOutputs, readJsonOutputs, readRuns } from "@/lib/readOutput";
import { Runs } from "@/components/Runs";

export const dynamic = "force-dynamic";

type Slide = { type?: string; title?: string; text?: string; subtitle?: string };
type Deck = { title?: string; subtitle?: string; slides?: Slide[] };

function kb(bytes: number): string {
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

export default async function DeckPage() {
  const specs = await readJsonOutputs("3-deck-pptx-creation", ".json");
  const pptx = await listOutputs("3-deck-pptx-creation", [".pptx"]);
  const runs = await readRuns("3-deck-pptx-creation");

  const hasContent = specs.length > 0 || pptx.length > 0;

  return (
    <>
      <div className="page-head">
        <span className="tag">Deck</span>
        <h1>Slide specs &amp; decks</h1>
      </div>

      {!hasContent && (
        <div className="empty">
          <p>No decks yet.</p>
          <p>
            Write a deck spec to{" "}
            <code>projects/3-deck-pptx-creation/output/&lt;name&gt;.deck.json</code> (use the{" "}
            <code>deck-builder</code> skill), then render it with{" "}
            <code>npm run build:deck -- &lt;path&gt;</code>. Refresh to see it here.
          </p>
        </div>
      )}

      {pptx.length > 0 && (
        <section style={{ marginBottom: "2rem" }}>
          <h2 style={{ color: "var(--cap-purple)" }}>Rendered files</h2>
          {pptx.map((f) => (
            <div className="file-row" key={f.name}>
              <span>{f.name}</span>
              <span className="size">{kb(f.size)}</span>
            </div>
          ))}
          <p className="source" style={{ marginTop: "0.5rem" }}>
            A <code>.pptx</code> can&apos;t render inline here — open it from{" "}
            <code>projects/3-deck-pptx-creation/output/</code>.
          </p>
        </section>
      )}

      {specs.map(({ name, data }) => {
        const deck = data as Deck;
        return (
          <section key={name} style={{ marginBottom: "2rem" }}>
            <h2 style={{ color: "var(--cap-purple)" }}>{deck.title ?? name}</h2>
            {deck.subtitle && <p className="source">{deck.subtitle}</p>}
            <div className="slide-list">
              {(deck.slides ?? []).map((s, i) => (
                <div className="slide" key={i}>
                  <div className="stype">{s.type ?? "slide"}</div>
                  <h3>{s.title ?? s.text ?? `Slide ${i + 1}`}</h3>
                  {s.subtitle && <div className="source">{s.subtitle}</div>}
                </div>
              ))}
            </div>
          </section>
        );
      })}

      <Runs runs={runs} />
    </>
  );
}
