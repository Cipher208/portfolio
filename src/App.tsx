import { NavLink, Link, Route, Routes, BrowserRouter } from "react-router-dom";
import ConsoleDust from "./components/ConsoleDust";
import Hub from "./pages/Hub";
import Projects from "./pages/Projects";
import Lab from "./pages/Lab";
import About from "./pages/About";

type NavVariant = "slab" | "masthead" | "pill";

const ISLANDS = [
  { to: "/projects", label: "Projects" },
  { to: "/lab", label: "Lab" },
  { to: "/about", label: "About" },
];

export function Nav({ variant, tag }: { variant: NavVariant; tag: string }) {
  const wrap =
    variant === "slab" ? "nav" : variant === "masthead" ? "masthead" : "pillnav";
  const inner =
    variant === "slab" ? "nav__inner" : variant === "masthead" ? "masthead__inner" : "pillnav__inner";
  const mark =
    variant === "slab" ? "nav__mark" : variant === "masthead" ? "masthead__mark" : "pillnav__mark";
  const where =
    variant === "slab" ? "nav__tag" : variant === "masthead" ? "masthead__where" : "pillnav__where";
  const links =
    variant === "slab" ? "nav__links" : variant === "masthead" ? "masthead__links" : "pillnav__links";
  return (
    <nav className={wrap}>
      <div className={`container ${inner}`}>
        <Link className={mark} to="/">
          Sart
        </Link>
        <span className={where}>{tag}</span>
        <ul className={links}>
          {ISLANDS.map((island) => (
            <li key={island.to}>
              <NavLink to={island.to}>{island.label}</NavLink>
            </li>
          ))}
        </ul>
        <a className="btn" href="https://github.com/Cipher208">
          GitHub
        </a>
      </div>
    </nav>
  );
}

export function Footer({ variant }: { variant: "columns" | "mast" }) {
  const colophon = (
    <p className="colophon">Built by hand in static HTML. No trackers, no telemetry.</p>
  );
  if (variant === "mast") {
    return (
      <footer className="mast">
        <div className="container">
          <div className="mast__mark">Sart</div>
          <p className="mast__line">Every case file links to the work itself. The bench stays open.</p>
          <ul className="mast__links">
            <li><Link to="/">Hub</Link></li>
            {ISLANDS.map((island) => (
              <li key={island.to}><Link to={island.to}>{island.label}</Link></li>
            ))}
            <li><a href="https://github.com/Cipher208">GitHub</a></li>
          </ul>
          {colophon}
        </div>
      </footer>
    );
  }
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <div className="footer__mark">Sart</div>
            <p className="footer__line">A quiet workshop for tools that keep agents honest.</p>
          </div>
          <div>
            <h4>Rooms</h4>
            <ul>
              {ISLANDS.map((island) => (
                <li key={island.to}><Link to={island.to}>{island.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Elsewhere</h4>
            <ul>
              <li><a href="https://github.com/Cipher208">Cipher208 on GitHub</a></li>
            </ul>
          </div>
        </div>
        {colophon}
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "") || "/"}>
      <ConsoleDust />
      <Routes>
        <Route path="/" element={<Hub />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/lab" element={<Lab />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
