import { Link } from "react-router-dom";
import { Nav, Footer } from "../App";

const RECORD = [
  { id: "py-purr", vals: ["kv", "ttl", "sagas", "pub/sub", "one file"] },
  { id: "a-memory", vals: ["4 tiers", "fts5", "graphs", "sealed"] },
  { id: "docs-haven", vals: ["mcp", "local", "instant search"] },
  { id: "gh-scope", vals: ["static", "filters", "no telemetry"] },
  { id: "mimocode hooks", vals: ["guards", "token save", "yagni"] },
];

const ENTRIES = [
  { id: "gh-scope", what: "explorer for GitHub filters, one static page", when: "2026-11-09" },
  { id: "py-purr", what: "Redis alternative on one SQLite file", when: "2026-11-09" },
  { id: "docs-haven", what: "local knowledge base with instant search", when: "2026-11-08" },
];

export default function Hub() {
  return (
    <div className="theme-graphite">
      <Nav variant="slab" tag="instruments for agents" />

      <header className="hero">
        <div className="container hero__grid">
          <div>
            <h1>Agent tools, kept like a bench record.</h1>
            <p className="hero__lede">
              Sart builds small instruments for agents: SQLite engines, MCP servers, token-saving hooks.
            </p>
            <div className="hero__actions">
              <Link className="btn btn--primary" to="/projects">See the projects</Link>
              <a className="btn" href="https://github.com/Cipher208">github.com/Cipher208</a>
            </div>
          </div>

          <aside className="record-panel" aria-label="Bench record">
            <div className="record-panel__head">
              <span className="record-panel__title">Bench record</span>
              <span className="record-panel__meta">5 instruments, public</span>
            </div>
            {RECORD.map((row) => (
              <div className="record-panel__row" key={row.id}>
                <span className="record-panel__id">{row.id}</span>
                <span className="record-panel__vals">
                  {row.vals.map((v, i) => (
                    <span key={v} style={i === 0 ? { border: "none", marginLeft: 0, paddingLeft: 0 } : undefined}>
                      {v}
                    </span>
                  ))}
                </span>
              </div>
            ))}
            <div className="record-panel__sign">
              <span>signed <span className="who">Sart</span></span>
              <span className="when">2026-11</span>
            </div>
          </aside>
        </div>

        <figure className="bench container">
          <div data-slot>
            <img
              src="./assets/bench.jpg"
              width={1920}
              height={1402}
              alt="workbench covered with spanners and tools beneath a window"
            />
          </div>
          <figcaption>
            A bench is a bench. Photo: Petar Milošević, Wikimedia Commons, CC BY-SA 4.0.
          </figcaption>
        </figure>
      </header>

      <main>
        <section className="entries container">
          <h2>Latest entries.</h2>
          <ol className="trail">
            {ENTRIES.map((e) => (
              <li className="trail__row" key={e.id}>
                <span className="trail__id">{e.id}</span>
                <span className="trail__what">{e.what}</span>
                <span className="trail__when">{e.when}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="rooms container">
          <h2>Three rooms.</h2>
          <div className="panels">
            <Link className="room" to="/projects">
              <h3>Projects</h3>
              <p>Four public tools and what they measured. Case files with live captures and real code.</p>
              <span className="room__go">Enter</span>
            </Link>
            <Link className="room" to="/lab">
              <h3>Lab</h3>
              <p>Experiments in progress. Some still classified.</p>
              <span className="room__go">Enter</span>
            </Link>
            <Link className="room" to="/about">
              <h3>About</h3>
              <p>Who keeps this bench, and why.</p>
              <span className="room__go">Enter</span>
            </Link>
          </div>
        </section>
      </main>

      <Footer variant="columns" />
    </div>
  );
}
