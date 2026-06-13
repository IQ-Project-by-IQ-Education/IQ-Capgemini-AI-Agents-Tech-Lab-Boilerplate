import Link from "next/link";

const CARDS = [
  {
    href: "/talent",
    tag: "Talent",
    title: "CV scorecard",
    desc: "The ranked shortlist your agent wrote for a job — scored, justified, with vigilance points.",
  },
  {
    href: "/radar",
    tag: "Radar",
    title: "Press briefing",
    desc: "The dated executive briefing your agent synthesized from the day's news, fully sourced.",
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
        <h1>Your agents&apos; work, on screen</h1>
        <p>
          This is a thin front-end over the three lab projects. Each page reads that
          project&apos;s <code>output/</code> folder and shows what your agent produced. It is
          deliberately plain — ask the <code>frontend-design</code> skill to make it yours.
        </p>
      </section>
      <section className="card-grid">
        {CARDS.map((c) => (
          <Link key={c.href} href={c.href} className="card">
            <span className="tag">{c.tag}</span>
            <h2>{c.title}</h2>
            <p>{c.desc}</p>
          </Link>
        ))}
      </section>
    </>
  );
}
