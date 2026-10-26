"use client";
import { useEffect, useRef } from "react";

const INK = "#580454";
const GOLD = "#d1a64c";
const FIELD_ALPHA = 0.08;
const SETTLE = 0.55;

type Props = {
  readonly word: string;
  readonly mobileLines?: readonly string[];
  readonly className?: string;
  readonly onStart?: () => void;
};

export default function BitWordmark({
  word,
  mobileLines,
  className,
  onStart,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onStartRef = useRef(onStart);
  useEffect(() => {
    onStartRef.current = onStart;
  }, [onStart]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !ctx) {
      onStartRef.current?.();
      return;
    }

    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = matchMedia("(pointer: fine)").matches;

    let cols = 0;
    let rows = 0;
    let cell = 0;
    let dpr = 1;
    let inside = new Uint8Array(0);
    let bits = new Uint8Array(0);
    let heat = new Float32Array(0);
    let delay = new Float32Array(0);
    let vignette = new Float32Array(0);
    let sprites: Record<string, HTMLCanvasElement> = {};
    let family = "sans-serif";
    let startAt = 0;
    let animating = false;
    let raf = 0;
    let started = false;
    let disposed = false;

    const makeSprite = (digit: string, color: string, weight: number) => {
      const s = document.createElement("canvas");
      s.width = s.height = Math.ceil(cell * dpr);
      const c = s.getContext("2d")!;
      c.scale(dpr, dpr);
      c.fillStyle = color;
      c.font = `${weight} ${cell * 1.02}px ${family}`;
      c.textAlign = "center";
      c.textBaseline = "middle";
      c.fillText(digit, cell / 2, cell / 2 + cell * 0.04);
      return s;
    };

    const build = (animate: boolean) => {
      const width = wrap.clientWidth;
      if (!width) return;
      const stacked = width < 640 && !!mobileLines?.length;
      const lines = stacked ? mobileLines! : [word];

      cell = width < 420 ? 7 : width < 768 ? 8 : width < 1280 ? 10 : 11;
      cols = Math.floor(width / cell);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const m = document.createElement("canvas").getContext("2d")!;
      m.font = `700 100px ${family}`;
      const gap = 6;
      const laid = lines.map((line) => {
        const chars = [...line];
        const advances = chars.map((ch) => m.measureText(ch).width);
        const lineWidth =
          advances.reduce((a, b) => a + b, 0) + gap * (chars.length - 1);
        return { chars, advances, lineWidth };
      });
      const probeWidth = Math.max(...laid.map((l) => l.lineWidth));
      const scale = (cols * 0.94) / probeWidth;
      const fontSize = 100 * scale;
      const ascent =
        m.measureText(lines.join("")).actualBoundingBoxAscent * scale;
      const descent =
        m.measureText(lines[lines.length - 1]).actualBoundingBoxDescent * scale;
      const leading = fontSize * 0.9;
      const pad = 3;
      rows =
        Math.ceil(ascent + leading * (lines.length - 1) + descent) + pad * 2;

      const mask = document.createElement("canvas");
      mask.width = cols;
      mask.height = rows;
      const mc = mask.getContext("2d")!;
      mc.font = `700 ${fontSize}px ${family}`;
      mc.fillStyle = "#000";
      mc.textBaseline = "alphabetic";
      const left = stacked ? 0 : (cols - probeWidth * scale) / 2;
      laid.forEach(({ chars, advances }, li) => {
        let x = left;
        const baseline = pad + ascent + leading * li;
        chars.forEach((ch, i) => {
          mc.fillText(ch, x, baseline);
          x += (advances[i] + gap) * scale;
        });
      });
      const data = mc.getImageData(0, 0, cols, rows).data;

      const n = cols * rows;
      inside = new Uint8Array(n);
      bits = new Uint8Array(n);
      heat = new Float32Array(n);
      delay = new Float32Array(n);
      vignette = new Float32Array(n);
      for (let i = 0; i < n; i++) {
        inside[i] = data[i * 4 + 3] > 110 ? 1 : 0;
        bits[i] = Math.random() > 0.5 ? 1 : 0;
        const cx = (i % cols) / cols - 0.5;
        const cy = Math.floor(i / cols) / rows - 0.5;
        vignette[i] = Math.max(0, 1 - Math.hypot(cx * 1.3, cy * 1.6) * 1.5);
        delay[i] = Math.random() * 0.75 + (0.5 - Math.abs(cx)) * 0.5;
      }

      canvas.width = Math.ceil(cols * cell * dpr);
      canvas.height = Math.ceil(rows * cell * dpr);
      canvas.style.width = `${cols * cell}px`;
      canvas.style.height = `${rows * cell}px`;

      sprites = {
        ink0: makeSprite("0", INK, 600),
        ink1: makeSprite("1", INK, 600),
        field0: makeSprite("0", INK, 400),
        field1: makeSprite("1", INK, 400),
        gold0: makeSprite("0", GOLD, 600),
        gold1: makeSprite("1", GOLD, 600),
      };

      animating = animate && !reduceMotion;
      startAt = performance.now();
      kick();
    };

    const draw = (now: number) => {
      const t = (now - startAt) / 1000;
      const size = cell * dpr;
      let warm = false;
      let decoding = false;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const fieldIn = animating ? Math.min(1, t / 0.6) : 1;

      for (let i = 0; i < bits.length; i++) {
        const h = heat[i];
        if (h > 0.01) {
          heat[i] = h * 0.93;
          warm = true;
        } else heat[i] = 0;

        let alpha: number;
        let gold = heat[i];
        let base: "ink" | "field";

        if (inside[i]) {
          const p = animating
            ? Math.min(1, Math.max(0, (t - delay[i]) / SETTLE))
            : 1;
          if (p < 1) {
            decoding = true;
            if (Math.random() < 0.35) bits[i] ^= 1;
            gold = Math.max(gold, p > 0 ? 1 - p * p : 0);
          }
          const e = 1 - Math.pow(1 - p, 3);
          alpha = FIELD_ALPHA + (1 - FIELD_ALPHA) * e;
          base = p > 0 ? "ink" : "field";
        } else {
          alpha = (FIELD_ALPHA * vignette[i] + heat[i] * 0.55) * fieldIn;
          base = "field";
        }
        if (alpha < 0.005) continue;

        const dx = (i % cols) * size;
        const dy = Math.floor(i / cols) * size;
        const bit = bits[i];

        if (gold < 1) {
          ctx.globalAlpha = alpha * (1 - gold);
          ctx.drawImage(sprites[`${base}${bit}`], dx, dy);
        }
        if (gold > 0) {
          ctx.globalAlpha = alpha * gold;
          ctx.drawImage(sprites[`gold${bit}`], dx, dy);
        }
      }
      ctx.globalAlpha = 1;

      if (animating && !decoding && t > 0.6) animating = false;
      return animating || warm;
    };

    const frame = (now: number) => {
      raf = 0;
      if (disposed) return;
      if (draw(now)) kick();
    };

    function kick() {
      if (!raf) raf = requestAnimationFrame(frame);
    }

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const px = (e.clientX - r.left) / cell;
      const py = (e.clientY - r.top) / cell;
      const radius = cols < 90 ? 3.5 : 5;
      const x0 = Math.max(0, Math.floor(px - radius));
      const x1 = Math.min(cols - 1, Math.ceil(px + radius));
      const y0 = Math.max(0, Math.floor(py - radius));
      const y1 = Math.min(rows - 1, Math.ceil(py + radius));
      for (let y = y0; y <= y1; y++) {
        for (let x = x0; x <= x1; x++) {
          const d = Math.hypot(x + 0.5 - px, y + 0.5 - py) / radius;
          if (d > 1) continue;
          const i = y * cols + x;
          heat[i] = Math.max(heat[i], 1 - d);
          if (Math.random() < 0.3 * (1 - d)) bits[i] ^= 1;
        }
      }
      kick();
    };

    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    let lastWidth = 0;
    const ro = new ResizeObserver(() => {
      const w = wrap.clientWidth;
      if (!started || w === lastWidth) return;
      lastWidth = w;
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => build(false), 150);
    });

    document.fonts.ready
      .then(() => {
        family = getComputedStyle(wrap).fontFamily || family;
        return Promise.all([
          document.fonts.load(`700 100px ${family}`),
          document.fonts.load(`600 16px ${family}`),
          document.fonts.load(`400 16px ${family}`),
        ]).catch(() => undefined);
      })
      .then(() => {
        if (disposed) return;
        lastWidth = wrap.clientWidth;
        build(true);
        started = true;
        onStartRef.current?.();
        ro.observe(wrap);
        if (finePointer) wrap.addEventListener("pointermove", onMove);
      });

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      ro.disconnect();
      wrap.removeEventListener("pointermove", onMove);
    };
  }, [word, mobileLines]);

  return (
    <div ref={wrapRef} className={`flex justify-center ${className ?? ""}`}>
      <canvas ref={canvasRef} aria-hidden className="block select-none" />
    </div>
  );
}
