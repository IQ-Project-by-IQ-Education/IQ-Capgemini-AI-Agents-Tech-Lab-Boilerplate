/* AI Agents Tech Lab — shared page runtime (plain JS, no build step, no dependencies).
   Every page in site/ loads this file. It:
     1. injects the site header (from nav.json) and footer,
     2. renders our own trusted markdown (headings, tables, lists, quotes, inline styles),
     3. fetches a project's outputs from the local server and mounts the page.
   Participant agent pages (site/<agent>.html) reuse the same helpers, see agent-page.example.html. */

(function () {
  "use strict";

  const LabSite = {};
  window.LabSite = LabSite;

  // ── Utilities ─────────────────────────────────────────────────────────────
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  LabSite.esc = esc;

  const el = (id) => document.getElementById(id);

  async function getJSON(url) {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`);
    return res.json();
  }
  LabSite.getJSON = getJSON;

  // ── Header / footer ───────────────────────────────────────────────────────
  // nav.json lists the pages; agent-builder appends the participant's agent page there.
  async function mountChrome() {
    let nav = [];
    try {
      nav = await getJSON("/nav.json");
    } catch {
      nav = [{ href: "/", label: "Home" }];
    }
    const here = location.pathname.replace(/\.html$/, "").replace(/\/index$/, "/");
    const links = nav
      .map((n) => {
        const active = n.href === here ? ' class="active"' : "";
        return `<a href="${esc(n.href)}"${active}>${esc(n.label)}</a>`;
      })
      .join("");
    const header = document.createElement("header");
    header.className = "site-header";
    header.innerHTML =
      `<a href="/" class="brand"><span class="brand-plate"><img src="/assets/capgemini-logo.webp" alt="Capgemini" class="brand-logo"></span>` +
      `<span class="brand-text">AI Agents Tech <span class="brand-sub">· Lab</span></span></a>` +
      `<nav class="site-nav">${links}</nav>`;
    const footer = document.createElement("footer");
    footer.className = "site-footer";
    footer.innerHTML = "Built in Claude Code · upgrade this UI live with the <code>showcase</code> skill";
    const main = document.querySelector("main") || document.body;
    document.body.insertBefore(header, main);
    document.body.appendChild(footer);
  }

  // ── Markdown → HTML (the subset the lab skills emit) ──────────────────────
  function inline(text) {
    let out = "";
    const re = /(\[[^\]]+\]\([^)]+\))|(`[^`]+`)|(\*\*[^*]+\*\*)|(\*[^*]+\*)/g;
    let last = 0;
    let m;
    while ((m = re.exec(text)) !== null) {
      out += esc(text.slice(last, m.index));
      const tok = m[0];
      if (tok.startsWith("[")) {
        const lm = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(tok);
        out += `<a href="${esc(lm[2])}" target="_blank" rel="noreferrer">${esc(lm[1])}</a>`;
      } else if (tok.startsWith("`")) out += `<code>${esc(tok.slice(1, -1))}</code>`;
      else if (tok.startsWith("**")) out += `<strong>${esc(tok.slice(2, -2))}</strong>`;
      else out += `<em>${esc(tok.slice(1, -1))}</em>`;
      last = m.index + tok.length;
    }
    return out + esc(text.slice(last));
  }

  const splitRow = (line) =>
    line
      .trim()
      .replace(/^\||\|$/g, "")
      .split("|")
      .map((c) => c.trim());
  const isTableSep = (line) => !!line && /^\s*\|?[\s:|-]*-[\s:|-]*\|?\s*$/.test(line) && line.includes("-");

  function renderMarkdown(md) {
    const lines = String(md).replace(/\r\n/g, "\n").split("\n");
    const out = [];
    let i = 0;
    while (i < lines.length) {
      const line = lines[i];
      if (line.trim() === "") {
        i++;
        continue;
      }
      const h = /^(#{1,6})\s+(.*)$/.exec(line);
      if (h) {
        out.push(`<h${h[1].length}>${inline(h[2])}</h${h[1].length}>`);
        i++;
        continue;
      }
      if (line.startsWith("```")) {
        const buf = [];
        i++;
        while (i < lines.length && !lines[i].startsWith("```")) buf.push(lines[i++]);
        i++;
        out.push(`<pre><code>${esc(buf.join("\n"))}</code></pre>`);
        continue;
      }
      if (line.includes("|") && isTableSep(lines[i + 1])) {
        const header = splitRow(line);
        i += 2;
        const rows = [];
        while (i < lines.length && lines[i].includes("|") && lines[i].trim() !== "") rows.push(splitRow(lines[i++]));
        out.push(
          `<table><thead><tr>${header.map((c) => `<th>${inline(c)}</th>`).join("")}</tr></thead><tbody>` +
            rows.map((r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join("")}</tr>`).join("") +
            `</tbody></table>`,
        );
        continue;
      }
      if (/^(-{3,}|\*{3,}|_{3,})$/.test(line.trim())) {
        out.push("<hr>");
        i++;
        continue;
      }
      if (/^>\s?/.test(line)) {
        const q = [];
        while (i < lines.length && /^>\s?/.test(lines[i])) q.push(lines[i++].replace(/^>\s?/, ""));
        out.push(`<blockquote>${inline(q.join(" "))}</blockquote>`);
        continue;
      }
      if (/^\s*[-*]\s+/.test(line)) {
        const items = [];
        while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) items.push(lines[i++].replace(/^\s*[-*]\s+/, ""));
        out.push(`<ul>${items.map((t) => `<li>${inline(t)}</li>`).join("")}</ul>`);
        continue;
      }
      if (/^\s*\d+\.\s+/.test(line)) {
        const items = [];
        while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) items.push(lines[i++].replace(/^\s*\d+\.\s+/, ""));
        out.push(`<ol>${items.map((t) => `<li>${inline(t)}</li>`).join("")}</ol>`);
        continue;
      }
      const para = [];
      while (
        i < lines.length &&
        lines[i].trim() !== "" &&
        !/^(#{1,6})\s/.test(lines[i]) &&
        !lines[i].startsWith("```") &&
        !/^\s*[-*]\s+/.test(lines[i]) &&
        !/^\s*\d+\.\s+/.test(lines[i]) &&
        !/^>\s?/.test(lines[i]) &&
        !(lines[i].includes("|") && isTableSep(lines[i + 1]))
      )
        para.push(lines[i++]);
      out.push(`<p>${inline(para.join(" "))}</p>`);
    }
    return out.join("\n");
  }
  LabSite.renderMarkdown = renderMarkdown;

  // ── Building blocks ───────────────────────────────────────────────────────
  LabSite.runsHtml = function (runs) {
    if (!runs || runs.length === 0) return "";
    const rows = runs
      .slice(0, 10)
      .map(
        (r) =>
          `<tr><td>${esc(r.ts ? r.ts.replace("T", " ").replace(/:\d\dZ?$/, "") : "·")}</td>` +
          `<td>${esc(r.input ?? "·")}</td><td>${esc(r.result ?? "·")}</td></tr>`,
      )
      .join("");
    return `<section class="runs"><h2>Recent runs</h2><table><thead><tr><th>When</th><th>Input</th><th>Result</th></tr></thead><tbody>${rows}</tbody></table></section>`;
  };

  LabSite.emptyHtml = (html) => `<div class="empty">${html}</div>`;

  /** Load a project's data from the local server: { outputs, latestMarkdown, json, runs }. */
  LabSite.project = (dir) => getJSON(`/api/project/${encodeURIComponent(dir)}`);

  /**
   * Standard document page: page head, the newest markdown as a white paper, the runs strip.
   * opts: { project, tag, title, empty (html), target (element id, default "app") }
   */
  LabSite.mountDoc = async function (opts) {
    const target = el(opts.target || "app");
    let data;
    try {
      data = await LabSite.project(opts.project);
    } catch (e) {
      target.innerHTML = LabSite.emptyHtml(`<p>Couldn't reach the local server.</p><p>${esc(String(e.message))}</p>`);
      return;
    }
    const doc = data.latestMarkdown;
    target.innerHTML =
      `<div class="page-head"><span class="tag">${esc(opts.tag)}</span><h1>${esc(opts.title)}</h1>` +
      (doc ? `<div class="source">Showing ${esc(doc.name)}</div>` : "") +
      `</div>` +
      (doc ? `<article class="doc">${renderMarkdown(doc.content)}</article>` : LabSite.emptyHtml(opts.empty || "<p>Nothing here yet.</p>")) +
      LabSite.runsHtml(data.runs);
  };

  /** Live agent-flow page: polls /api/flow every 2s, renders Mermaid, keeps the last good drawing. */
  LabSite.mountFlow = function (targetId) {
    const target = el(targetId || "app");
    const canvas = document.createElement("div");
    const hint = document.createElement("p");
    hint.className = "source flow-hint";
    let last = null;
    let seq = 0;
    let stale = false;

    const ago = (ms) => {
      const s = Math.max(0, Math.round(ms / 1000));
      if (s < 60) return `${s}s ago`;
      const m = Math.round(s / 60);
      return m < 60 ? `${m}m ago` : `${Math.round(m / 60)}h ago`;
    };

    const empty = () => {
      target.innerHTML = LabSite.emptyHtml(
        `<p>No flow yet, and that's normal.</p><p>Keep this page open next to your chat. When you design your agent in Claude Code (say <strong>“I want to build my agent”</strong> or <strong>“quick start”</strong>), the flow draws itself here, answer after answer.</p>`,
      );
    };
    empty();

    if (window.mermaid) {
      window.mermaid.initialize({
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
    }

    async function tick() {
      let data;
      try {
        data = await getJSON("/api/flow");
      } catch {
        return; // server briefly away; keep polling
      }
      const src = typeof data.content === "string" ? data.content : "";
      const fresh = typeof data.updatedAt === "number" ? ` · Flow last written ${ago(Date.now() - data.updatedAt)}.` : "";
      if (!src.trim()) {
        if (last !== null) empty();
        last = null;
        return;
      }
      if (src !== last) {
        try {
          if (!window.mermaid) throw new Error("mermaid not loaded");
          const { svg } = await window.mermaid.render(`agent-flow-${++seq}`, src);
          canvas.className = "flow-canvas";
          canvas.innerHTML = svg;
          stale = false;
          last = src;
          if (!target.contains(canvas)) {
            target.innerHTML = "";
            target.appendChild(canvas);
            target.appendChild(hint);
          }
        } catch {
          stale = true; // keep the last good diagram on screen
        }
      }
      if (target.contains(hint)) {
        hint.innerHTML =
          (stale ? "Latest update couldn't be drawn, showing the previous version. " : "") +
          `Redraws automatically as you answer, no refresh needed.${fresh}`;
      }
    }
    tick();
    setInterval(tick, 2000);
  };

  // ── Boot ──────────────────────────────────────────────────────────────────
  const ready = new Promise((resolve) => {
    if (document.readyState !== "loading") resolve();
    else document.addEventListener("DOMContentLoaded", resolve);
  });
  LabSite.ready = ready.then(() => (document.body.dataset.chrome === "off" ? null : mountChrome()));
})();
