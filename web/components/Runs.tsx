import type { RunRecord } from "@/lib/readOutput";

/** Compact "Recent runs" panel, fed by a project's runs.json. Renders nothing if empty. */
export function Runs({ runs }: { runs: RunRecord[] }) {
  if (runs.length === 0) return null;
  return (
    <section className="runs">
      <h2>Recent runs</h2>
      <table>
        <thead>
          <tr>
            <th>When</th>
            <th>Input</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {runs.slice(0, 10).map((r, i) => (
            <tr key={i}>
              <td>{r.ts ? r.ts.replace("T", " ").replace(/:\d\dZ?$/, "") : "—"}</td>
              <td>{r.input ?? "—"}</td>
              <td>{r.result ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
