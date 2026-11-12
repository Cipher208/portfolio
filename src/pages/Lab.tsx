import { Nav, Footer } from "../App";

type Entry = { id: string; line: string; status: "sealed" | "active"; when: string };

const SEALED: Entry[] = [
  { id: "clack", line: "A lossless context archive for agents. Spec v1.3 and paper drafts.", status: "sealed", when: "2026-11" },
  { id: "MUSE", line: "A personality engine: graphs, states and a body on PURR.", status: "sealed", when: "2026-10" },
  { id: "viva", line: "A living-world sandbox for personal agents.", status: "sealed", when: "2026-10" },
  { id: "iubar", line: "Agent body prototype: MCP concept, CELS integration and a theory layer.", status: "sealed", when: "2026-08" },
];

const ACTIVE: Entry[] = [
  { id: "CELS", line: "28 compression techniques, measured for agent context.", status: "active", when: "2026-10" },
  { id: "scp-library", line: "An offline-first library app.", status: "active", when: "2026-10" },
];

type Doc = {
  project: string;
  status: "sealed" | "active";
  when: string;
  title: string;
  desc: string;
  metrics: { dt: string; dd: string }[];
};

const DOCS: Doc[] = [
  {
    project: "viva", status: "sealed", when: "2026-08-22", title: "Developer handoff.",
    desc: "A transfer package for the next developer: audited code state, notes, checklist.",
    metrics: [{ dt: "Audited state", dd: "2461ea0" }, { dt: "Scope", dd: "one repo, one owner" }],
  },
  {
    project: "viva", status: "sealed", when: "2026-08-27", title: "Release-owner briefing.",
    desc: "Waves 1 to 6 of release evidence, from conditional to unconditional sign-off.",
    metrics: [{ dt: "Waves", dd: "6 closed" }, { dt: "Outcome", dd: "unconditional sign-off" }],
  },
  {
    project: "compression harness", status: "sealed", when: "2026-08-15", title: "FP64-O numerical mitigation.",
    desc: "A numerical boundary found on real GPT-2, verified on WikiText-2.",
    metrics: [{ dt: "Holdout", dd: "286,221 tokens" }, { dt: "Setup", dd: "12 blocks, CPU-first" }],
  },
  {
    project: "CELS", status: "active", when: "2026-08-26", title: "TOON serializer, R2.",
    desc: "Hardening after early runs grew data instead of shrinking it.",
    metrics: [{ dt: "Token savings", dd: "25.0%" }, { dt: "P95 latency", dd: "0.04 ms" }],
  },
  {
    project: "CELS", status: "active", when: "2026-08-19", title: "SignalBlade memory.",
    desc: "Seven fresh runs compared, to separate real leaks from normal memory use.",
    metrics: [{ dt: "Leak signal", dd: "0 KiB, CV 0%" }, { dt: "Speed", dd: "−59.7% vs ResonanceField" }],
  },
];

function Shelf({ title, entries }: { title: string; entries: Entry[] }) {
  return (
    <div className="shelf-group">
      <h3>{title}</h3>
      <ul className="shelf">
        {entries.map((e) => (
          <li className="entry" key={e.id}>
            <span className="entry__id">{e.id}</span>
            <span className="entry__line">{e.line}</span>
            <span className="entry__meta">
              <span className={`chip chip--${e.status}`}>{e.status}</span>
              <span className="entry__when">{e.when}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Lab() {
  return (
    <div className="theme-amber-room">
      <Nav variant="pill" tag="Lab" />

      <header className="corridor">
        <div className="container corridor__grid">
          <div className="corridor__inner">
            <h1>The lab.</h1>
            <div className="corridor__letter">
              <p>Most work here stays sealed until it is ready.</p>
            </div>
            <div className="corridor__sign">
              <span>recorded by <span className="who">Sart</span></span>
              <span className="when">2026-10 to 2026-11</span>
            </div>
          </div>

          <aside className="sealed" aria-label="Record 001, clack">
            <div className="sealed__head">
              <span className="sealed__title">record 001</span>
              <span className="chip chip--sealed">sealed</span>
            </div>
            <dl>
              <div className="sealed__row"><dt>Subject</dt><dd>clack, a lossless context archive for agents</dd></div>
              <div className="sealed__row"><dt>Form</dt><dd>spec v1.3, paper drafts</dd></div>
              <div className="sealed__row"><dt>Status</dt><dd>sealed until it is ready</dd></div>
            </dl>
            <div className="sealed__sign">
              <span>signed <span className="who">Sart</span></span>
              <span className="when">2026-11</span>
            </div>
          </aside>
        </div>
      </header>

      <main className="entries container">
        <div className="entries__head">
          <h2>On the bench.</h2>
          <span className="entries__count">6 records</span>
        </div>

        <Shelf title="Sealed." entries={SEALED} />
        <Shelf title="Active." entries={ACTIVE} />

        <section className="docs">
          <h2>Document rack.</h2>
          <p className="docs__line">Five decks are recorded. Full versions open on request.</p>
          {DOCS.map((d) => (
            <article className="doc" key={d.title}>
              <div className="doc__ledge">
                <span className="doc__id">{d.project}</span>
                <span className={`chip chip--${d.status}`}>{d.status}</span>
                <span className="doc__when">{d.when}</span>
              </div>
              <div className="doc__grid">
                <div>
                  <h3>{d.title}</h3>
                  <p>{d.desc}</p>
                </div>
                <dl className="doc__metrics">
                  {d.metrics.map((m) => (
                    <div className="doc__metric" key={m.dt}>
                      <dt>{m.dt}</dt>
                      <dd>{m.dd}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </article>
          ))}
        </section>

        <div className="note">
          <p>Sealed work opens on request. Ask at the GitHub profile and the lab will answer.</p>
          <a className="btn btn--primary" href="https://github.com/Cipher208">
            Ask on GitHub
          </a>
        </div>
      </main>

      <Footer variant="columns" />
    </div>
  );
}
