"use client";

import { useEffect, useRef, useState } from "react";

// Polls /api/flow every 2s and re-renders the Mermaid diagram when the file changes.
// On a syntax error mid-edit, the last good diagram stays on screen.
export function FlowViewer() {
  const [src, setSrc] = useState<string | null>(null);
  const [svg, setSvg] = useState<string>("");
  const [stale, setStale] = useState(false);
  const seq = useRef(0);

  useEffect(() => {
    let active = true;
    const tick = async () => {
      try {
        const res = await fetch("/api/flow", { cache: "no-store" });
        const data = (await res.json()) as { content?: string };
        if (active && typeof data.content === "string") {
          const content = data.content;
          setSrc((prev) => (prev === content ? prev : content));
        }
      } catch {
        /* server briefly away; keep polling */
      }
    };
    tick();
    const id = setInterval(tick, 2000);
    return () => {
      active = false;
      clearInterval(id);
    };
  }, []);

  useEffect(() => {
    if (!src || !src.trim()) {
      setSvg("");
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          suppressErrorRendering: true,
          securityLevel: "strict",
          theme: "base",
          themeVariables: {
            darkMode: true,
            background: "transparent",
            fontFamily: "Ubuntu, Verdana, sans-serif",
            primaryColor: "#0e3a55",
            primaryTextColor: "#f5f2f9",
            primaryBorderColor: "#12abdb",
            lineColor: "#12abdb",
            secondaryColor: "#2b0a3d",
            tertiaryColor: "#1d0b2e",
            clusterBkg: "rgba(18, 171, 219, 0.06)",
            clusterBorder: "rgba(18, 171, 219, 0.4)",
            edgeLabelBackground: "#1d0b2e",
          },
        });
        const { svg: rendered } = await mermaid.render(`agent-flow-${++seq.current}`, src);
        if (!cancelled) {
          setSvg(rendered);
          setStale(false);
        }
      } catch {
        if (!cancelled) setStale(true); // keep the last good diagram
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [src]);

  if (src === null || !src.trim() || !svg) {
    return (
      <div className="empty">
        <p>No flow yet, and that&apos;s normal.</p>
        <p>
          Keep this page open next to your terminal. When you design your agent in Claude Code
          (say <strong>“I want to build my agent”</strong> or <strong>“quick start”</strong>),
          the flow draws itself here, answer after answer.
        </p>
      </div>
    );
  }

  return (
    <>
      {stale && <p className="source">Diagram is being updated…</p>}
      <div className="flow-canvas" dangerouslySetInnerHTML={{ __html: svg }} />
      <p className="source flow-hint">Redraws automatically as you answer, no refresh needed.</p>
    </>
  );
}
