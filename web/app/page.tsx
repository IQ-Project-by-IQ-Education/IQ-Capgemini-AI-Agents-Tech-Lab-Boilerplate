import Link from "next/link";

const STEPS = [
  {
    n: "1",
    title: "Design your agent",
    desc: (
      <>
        Open Claude Code in this repo and say <em>“I want to build my agent”</em>. It interviews
        you — you answer business questions, it handles all the tooling.
      </>
    ),
  },
  {
    n: "2",
    title: "Create it",
    desc: (
      <>
        Your agent is generated as a simple markdown file in <code>.claude/agents/</code> — its
        rulebook, like a new hire’s onboarding pack.
      </>
    ),
  },
  {
    n: "3",
    title: "Run & iterate",
    desc: (
      <>
        Put it to work on a real task. After each run it asks you 2 questions and{" "}
        <strong>records what it learns</strong> in long-term memory — watch it get better.
      </>
    ),
  },
  {
    n: "4",
    title: "Showcase",
    desc: (
      <>
        Ask for the <code>showcase</code> skill: your agent’s output becomes a polished,
        Capgemini-branded page — right here — for the final demo.
      </>
    ),
  },
];

const CARDS = [
  {
    href: "/talent",
    tag: "Talent",
    title: "CV scorecard",
    desc: "The ranked shortlist the cv-scorer agent wrote for the sales job offer — scored, justified, with vigilance points.",
  },
  {
    href: "/radar",
    tag: "Radar",
    title: "Press briefing & releases",
    desc: "The briefings and press releases your agent produced from live competitor news, fully sourced.",
  },
  {
    href: "/deck",
    tag: "Deck",
    title: "Slide specs",
    desc: "The deck specs and .pptx files your agent generated, in the Capgemini house style.",
  },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/capgemini-logo.webp" alt="Capgemini" className="hero-logo" />
        <h1>Welcome — this morning, you build your own AI agent</h1>
        <p>
          An agent is like a new hire: you give it instructions, tools and experience, then it
          works for you. By the end of the lab, yours will have produced something real — and
          this page is where its work shows up.
        </p>
      </section>

      <section className="steps">
        <h2>What you&apos;ll do</h2>
        <ol className="step-list">
          {STEPS.map((s) => (
            <li key={s.n} className="step">
              <span className="step-n">{s.n}</span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="steps-note">
          No idea, or stuck? Two agents are ready to adopt: <strong>cv-scorer</strong> (reviews
          CVs against a job offer) and <strong>press-release</strong> (writes a press release
          from competitor news). Just ask Claude Code for one of them.
        </p>
      </section>

      <section className="card-grid-wrap">
        <h2>Your agents&apos; work, on screen</h2>
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
