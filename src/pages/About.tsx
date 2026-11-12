import { Nav, Footer } from "../App";

const TIMELINE = [
  { when: "2026-03-20", what: "Opened the bench." },
  { when: "2026-10-07", what: "First hook kit." },
  { when: "2026-11-04", what: "Agent memory enters the record." },
  { when: "2026-11-08", what: "A knowledge base joins the bench." },
  { when: "2026-11-09", what: "gh-scope and py-purr, one day apart." },
];

const CREED = [
  { line: "A tool is done when it can be measured.", note: "Every entry carries what it read." },
  { line: "Everything stays local unless it says otherwise.", note: "No daemon, no telemetry." },
  { line: "The record is open. The lab stays sealed.", note: "Public work links to its source." },
];

export default function About() {
  return (
    <div className="theme-paper">
      <Nav variant="slab" tag="instruments for agents" />

      <header className="ledge">
        <div className="container ledge__grid">
          <div>
            <h1>Who keeps the bench.</h1>
            <p className="ledge__lede">Sart builds small instruments for agents.</p>
          </div>
          <div className="ledge__meta">
            <dl className="spec">
              <div className="spec__row"><dt>Kept by</dt><dd>Sart, Cipher208</dd></div>
              <div className="spec__row"><dt>On GitHub since</dt><dd>2026-03-20</dd></div>
              <div className="spec__row"><dt>Fields</dt><dd>agents, sqlite, mcp, context</dd></div>
              <div className="spec__row"><dt>Record</dt><dd>public bench, sealed lab</dd></div>
            </dl>
          </div>
        </div>
      </header>

      <main>
        <section className="record-section container">
          <h2>The record.</h2>
          <ol className="timeline">
            {TIMELINE.map((t) => (
              <li className="timeline__row" key={t.when}>
                <span className="timeline__when">{t.when}</span>
                <span className="timeline__what">{t.what}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="creed-section container">
          <h2>How the notes are kept.</h2>
          <div className="creed">
            {CREED.map((c) => (
              <div key={c.line}>
                <p>{c.line}</p>
                <span>{c.note}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="makes container">
          <h2>What the bench makes.</h2>
          <dl className="spec">
            <div className="spec__row"><dt>Engines</dt><dd>sqlite, no daemon, one file</dd></div>
            <div className="spec__row"><dt>Memory</dt><dd>tiers, fts5, graphs, mcp</dd></div>
            <div className="spec__row"><dt>Hooks</dt><dd>guards, token savings, yagni</dd></div>
          </dl>
        </section>

        <section className="closing container">
          <div className="closing-note">
            <p>The bench answers on GitHub.</p>
            <a className="btn btn--primary" href="https://github.com/Cipher208">
              Write to the bench
            </a>
          </div>
        </section>
      </main>

      <Footer variant="columns" />
    </div>
  );
}
