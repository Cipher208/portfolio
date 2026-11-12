import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

type Mote = { x: number; y: number; vx: number; vy: number; r: number; a: number; phase: number };

/**
 * ConsoleDust — the dynamic background.
 * The page sits on a living instrument surface: a faint grid of dots, slow
 * signal waves drifting across it like a scope readout that never settles,
 * dust motes drifting in the beam, and a long, smooth phosphor trace where
 * the pointer has been. All of it quiet, all in the island's own colours.
 * prefers-reduced-motion renders nothing.
 */
export default function ConsoleDust() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const location = useLocation();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // --- theme colours from the active island scope ---
    const scope =
      document.querySelector<HTMLElement>(".theme-graphite, .theme-amber-room, .theme-paper") ??
      document.body;
    const cs = getComputedStyle(scope);
    const ink = cs.getPropertyValue("--color-ink").trim() || "#eee";
    const cool = cs.getPropertyValue("--color-cool").trim() || "#8ab";
    const rule = cs.getPropertyValue("--color-rule-2").trim() || "#555";

    // --- sizing ---
    let width = 0;
    let height = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // --- dust motes ---
    const count = Math.min(90, Math.round((width * height) / 18000));
    const motes: Mote[] = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 3,
      vy: -(1.5 + Math.random() * 3.5),
      r: 1.2 + Math.random() * 2.2,
      a: 0.16 + Math.random() * 0.16,
      phase: Math.random() * Math.PI * 2,
    }));

    // --- pointer trace: a slow phosphor memory, kept short ---
    const trace: { x: number; y: number; t: number }[] = [];
    const TRACE_MS = 1400;
    const onMove = (e: PointerEvent) => {
      trace.push({ x: e.clientX, y: e.clientY, t: performance.now() });
      if (trace.length > 40) trace.shift();
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    // --- the living grid and signal waves ---
    const GRID = 64;
    const waves = [
      { y: 0.22, amp: 26, len: 0.0016, speed: 0.055, alpha: 0.13 },
      { y: 0.52, amp: 40, len: 0.0011, speed: -0.038, alpha: 0.11 },
      { y: 0.79, amp: 20, len: 0.0021, speed: 0.07, alpha: 0.09 },
    ];

    let raf = 0;
    let last = performance.now();
    let t = 0;
    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      t += dt;
      ctx.clearRect(0, 0, width, height);

      // instrument grid of dots
      ctx.fillStyle = rule;
      ctx.globalAlpha = 0.15;
      for (let x = GRID / 2; x < width; x += GRID) {
        for (let y = GRID / 2; y < height; y += GRID) {
          ctx.fillRect(x, y, 1.5, 1.5);
        }
      }

      // slow signal waves
      for (const w of waves) {
        ctx.globalAlpha = w.alpha;
        ctx.strokeStyle = cool;
        ctx.lineWidth = 1.25;
        ctx.beginPath();
        const baseY = w.y * height;
        for (let x = 0; x <= width; x += 8) {
          const y =
            baseY +
            Math.sin(x * w.len + t * w.speed * 6) * w.amp +
            Math.sin(x * w.len * 2.7 + t * w.speed * 2.4) * (w.amp * 0.28);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // dust
      for (const m of motes) {
        m.x += (m.vx + Math.sin(t * 0.4 + m.phase) * 1.4) * dt;
        m.y += m.vy * dt;
        if (m.y < -4) {
          m.y = height + 4;
          m.x = Math.random() * width;
        }
        if (m.x < -4) m.x = width + 4;
        if (m.x > width + 4) m.x = -4;
        ctx.globalAlpha = m.a;
        ctx.fillStyle = m.r > 1.6 ? ink : rule;
        ctx.fillRect(m.x, m.y, m.r, m.r);
      }

      // phosphor trace: one continuous smooth path per layer, no joints
      if (trace.length > 3) {
        while (trace.length && now - trace[0].t > TRACE_MS) trace.shift();
        const from = trace.length > 3 ? trace.slice() : null;
        if (from) {
          const drawPath = (points: { x: number; y: number }[]) => {
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);
            for (let i = 1; i < points.length - 1; i++) {
              const p = points[i];
              const next = points[i + 1];
              ctx.quadraticCurveTo(p.x, p.y, (p.x + next.x) / 2, (p.y + next.y) / 2);
            }
            const lastPoint = points[points.length - 1];
            ctx.lineTo(lastPoint.x, lastPoint.y);
            ctx.stroke();
          };
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.strokeStyle = cool;
          const cut1 = Math.max(0, Math.floor(from.length * 0.6));
          const cut2 = Math.max(0, Math.floor(from.length * 0.85));
          const headAge = (now - from[from.length - 1].t) / TRACE_MS;
          const live = Math.pow(1 - Math.min(1, headAge), 1.2);
          ctx.globalAlpha = 0.08 * live; ctx.lineWidth = 4.5; drawPath(from);
          ctx.globalAlpha = 0.16 * live; ctx.lineWidth = 2.2; drawPath(from.slice(cut1));
          ctx.globalAlpha = 0.26 * live; ctx.lineWidth = 1.2; drawPath(from.slice(cut2));
        }
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [location.pathname]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        pointerEvents: "none",
      }}
    />
  );
}
