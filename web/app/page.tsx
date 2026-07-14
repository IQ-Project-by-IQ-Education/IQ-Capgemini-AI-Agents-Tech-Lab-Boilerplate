import Link from "next/link";

const STEPS = [
  {
    n: "01",
    title: "Design your agent",
    desc: (
      <>
        Open Claude Code and say <em>“I want to build my agent”</em>. It interviews you — you
        answer business questions, it handles all the tooling.
      </>
    ),
  },
  {
    n: "02",
    title: "Create it",
    desc: (
      <>
        Your agent is born as a simple markdown file — its rulebook, like a new hire’s
        onboarding pack.
      </>
    ),
  },
  {
    n: "03",
    title: "Run & iterate",
    desc: (
      <>
        Put it to work on a real task. After each run it asks you 2 questions and{" "}
        <strong>records what it learns</strong> — watch it get better.
      </>
    ),
  },
  {
    n: "04",
    title: "Showcase",
    desc: (
      <>
        Its output becomes a polished, Capgemini-branded page — right here — for the final
        demo.
      </>
    ),
  },
];

const CARDS = [
  {
    href: "/radar",
    tag: "Radar",
    title: "Press briefing & releases",
    desc: "The briefings and press releases your agent produced from live competitor news, fully sourced.",
  },
  {
    href: "/deck",
    tag: "Deck",
    title: "PowerPoint decks",
    desc: "The executive decks your agent built and rendered, in the Capgemini house style.",
  },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <span className="hero-logo-plate">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/capgemini-logo.webp" alt="Capgemini" className="hero-logo" />
        </span>
        <p className="kicker">AI Agents Tech Lab · Live session</p>
        <h1>
          Welcome — this morning, <span className="hl">you build your own AI agent</span>
        </h1>
        <p className="lede">
          An agent is like a new hire: you give it instructions, tools and experience, then it
          works for you. By the end of the lab, yours will have produced something real — and
          this page is where its work shows up.
        </p>
      </section>

      <section className="steps">
        <h2 className="section-title">What you&apos;ll do</h2>
        <ol className="step-list">
          {STEPS.map((s) => (
            <li key={s.n} className="step">
              <span className="step-n">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="quickstart">
        <span className="quickstart-tag">No idea? Perfect — start here</span>
        <h2>The zero-effort start</h2>
        <p>
          Tell Claude Code: <span className="say">“quick start”</span>. It asks you three simple
          questions — which competitor move to react to, which topics to watch, what your deck
          should tell — <strong>then generates everything for you</strong>: a press release, a
          news briefing and a PowerPoint deck. No technical steps, ever. Watch the cards below
          fill up.
        </p>
      </section>

      <section className="card-grid-wrap">
        <h2 className="section-title">Your agents&apos; work, on screen</h2>
        <div className="card-grid">
          {CARDS.map((c) => (
            <Link key={c.href} href={c.href} className="card">
              <span className="tag">{c.tag}</span>
              <h2>{c.title}</h2>
              <p>{c.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
