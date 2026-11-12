import { useEffect, useRef, useState } from "react";
import { Nav, Footer } from "../App";

type CaseSpec = { dt: string; dd: string };
type CaseItem = {
  id: string;
  when: string;
  title: string;
  lede?: string;
  artefact?: "shot" | "code" | "reading" | "statement";
  statement?: string;
  tag: string;
  spec: CaseSpec[];
  href: string;
};

const CASES: CaseItem[] = [
  {
    id: "gh-scope",
    when: "2026-11-09",
    title: "Combine filters the way GitHub never does.",
    lede: "Profiles, orgs, duels, trending and releases in one static page.",
    artefact: "shot",
    tag: "web",
    spec: [
      { dt: "Form", dd: "one static page, no backend" },
      { dt: "Covers", dd: "profiles, orgs, duels, trending, releases" },
      { dt: "Measured", dd: "no telemetry" },
    ],
    href: "https://github.com/Cipher208/gh-scope",
  },
  {
    id: "py-purr",
    when: "2026-11-09",
    title: "Redis without the infrastructure.",
    lede: "Redis semantics on one SQLite file: kv, ttl, state machines, sagas, pub/sub.",
    artefact: "code",
    tag: "engines",
    spec: [
      { dt: "Form", dd: "one file, zero infrastructure" },
      { dt: "Runtime", dd: "no daemon, no network" },
    ],
    href: "https://github.com/Cipher208/py-purr",
  },
  {
    id: "a-memory",
    when: "2026-11-04",
    title: "Four tiers of memory, in plain SQLite.",
    artefact: "statement",
    statement: "Your AI agents forget. a-memory makes them remember.",
    tag: "memory",
    spec: [
      { dt: "Tiers", dd: "4, behind 5 MCP primitives" },
      { dt: "Search", dd: "fts5 plus binary search" },
      { dt: "Sealed", dd: "envelope encryption" },
    ],
    href: "https://github.com/Cipher208/a-memory",
  },
  {
    id: "docs-haven",
    when: "2026-11-08",
    title: "Every repo, at your agent’s hand.",
    artefact: "statement",
    statement: "Add repos and they stay searchable.",
    tag: "mcp",
    spec: [
      { dt: "Form", dd: "local, zero dependencies" },
      { dt: "Search", dd: "instant" },
      { dt: "Serves", dd: "claude, cursor, gemini, codex" },
    ],
    href: "https://github.com/Cipher208/docs-haven",
  },
  {
    id: "mimocode hooks",
    when: "2026-10-07",
    title: "Hooks that keep an agent lean and safe.",
    lede: "File hooks: token saver, guards, YAGNI rules, context indexing.",
    artefact: "reading",
    tag: "hooks",
    spec: [
      { dt: "Kit", dd: "rtk hook, guards, yagni, context-mode" },
      { dt: "Guards", dd: "blocks dangerous commands" },
      { dt: "Tested", dd: "44 tests" },
    ],
    href: "https://github.com/Cipher208/mimocode-rtk-hook",
  },
];

const TAGS = ["all", "web", "engines", "memory", "mcp", "hooks"];

/** The struck reading: 200 lines resolve to 5, once, when the panel is seen. */
function Reading() {
  const ref = useRef<HTMLSpanElement>(null);
  const startedRef = useRef(false);
  const [value, setValue] = useState<number>(() =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 5 : 200,
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || startedRef.current || value === 5) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || startedRef.current) return;
        startedRef.current = true;
        io.disconnect();
        const started = performance.now();
        const duration = 900;
        const tick = (now: number) => {
          const t = Math.min(1, (now - started) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setValue(Math.round(200 + (5 - 200) * eased));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
    // one-shot by design: the reading resolves once per visit
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span className="reading__val" ref={ref}>
      {value} lines
    </span>
  );
}

function Artefact({ kind }: { kind: CaseItem["artefact"] }) {
  if (kind === "shot") {
    return (
      <figure className="product">
        <img
          src="./assets/gh-scope-live.png"
          width={1280}
          height={800}
          alt="gh-scope live: a terminal-style explorer with a login prompt and quick profile chips"
        />
        <figcaption>The live demo, captured at the bench.</figcaption>
      </figure>
    );
  }
  if (kind === "code") {
    return (
      <div className="code">
        <pre>
          <code>{`from purr import Store

store = Store("app_state.db")
store.set("user:1001", {"name": "Alice", "role": "admin"})`}</code>
        </pre>
      </div>
    );
  }
  if (kind === "reading") {
    return (
      <div className="reading">
        <s className="reading__old">200 lines per git status</s>
        <Reading />
        <p className="reading__note">
          60 to 90% fewer tokens, by the repo’s own count. Signed <span className="who">Sart</span>,{" "}
          <span className="when">2026-10-07</span>
        </p>
      </div>
    );
  }
  return null;
}

export default function Projects() {
  const [tag, setTag] = useState("all");
  const cases = tag === "all" ? CASES : CASES.filter((c) => c.tag === tag);
  return (
    <div className="theme-graphite">
      <Nav variant="masthead" tag="Projects" />

      <header className="ledge">
        <div className="container ledge__grid">
          <div>
            <h1>Case files.</h1>
            <p className="ledge__lede">Four instruments and one hook kit, each with its measurements.</p>
            <div className="ledge__actions">
              <a className="btn btn--primary" href="https://github.com/Cipher208">
                All repos on GitHub
              </a>
              <a className="btn" href="/">
                Back to the hub
              </a>
            </div>
          </div>
          <div className="ledge__meta">
            <dl className="spec">
              <div className="spec__row"><dt>Kept by</dt><dd>Sart, Cipher208</dd></div>
              <div className="spec__row"><dt>Entries</dt><dd>5 public</dd></div>
              <div className="spec__row"><dt>Range</dt><dd>engines, memory, mcp, hooks</dd></div>
              <div className="spec__row"><dt>First record</dt><dd>2026-10-07</dd></div>
            </dl>
          </div>
        </div>
      </header>

      <main className="cases container">
        <div className="filterbar" role="group" aria-label="Filter case files">
          {TAGS.map((t) => (
            <button
              key={t}
              className={`chip chip--filter${tag === t ? " chip--active" : ""}`}
              aria-pressed={tag === t}
              onClick={() => setTag(t)}
            >
              {t}
            </button>
          ))}
          <span className="filterbar__count">{cases.length} shown</span>
        </div>
        {cases.map((c) => (
          <section className="case" key={c.id}>
            <div className="case__ledge">
              <span className="case__id">{c.id}</span>
              <span className="chip chip--public">public</span>
              <span className="case__when">{c.when}</span>
            </div>
            <h2>{c.title}</h2>
            {c.lede && <p className="case__lede">{c.lede}</p>}
            <div className="case__body">
              {c.artefact === "statement" ? (
                <p className="statement">{c.statement}</p>
              ) : (
                <Artefact kind={c.artefact} />
              )}
              <div className="case__aside">
                <dl className="spec">
                  {c.spec.map((row) => (
                    <div className="spec__row" key={row.dt}>
                      <dt>{row.dt}</dt>
                      <dd>{row.dd}</dd>
                    </div>
                  ))}
                </dl>
                <a className="case__go" href={c.href}>
                  Open the case
                </a>
              </div>
            </div>
          </section>
        ))}
      </main>

      <Footer variant="mast" />
    </div>
  );
}
