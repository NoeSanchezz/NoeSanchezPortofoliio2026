import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { STAR_PATH } from "./Sparkle";

export type HalftoneShape = "sphere" | "star" | "flower" | "bolt" | "bang";

const N = 160; // resolution of the soft "ink density" mask each shape is sampled from

// Shapes in a 100×100 box.
const PATHS: Record<Exclude<HalftoneShape, "sphere">, string> = {
  star: STAR_PATH,
  flower: flowerPath(6),
  bolt: "M60 0 L20 54 L46 54 L30 100 L82 36 L55 36 L72 0 Z",
  bang: "M36 0 H64 L58 66 H42 Z M50 76 A12 12 0 1 1 49.9 76 Z",
};

function flowerPath(petals: number) {
  const pts: string[] = [];
  for (let i = 0; i <= 120; i++) {
    const t = (i / 120) * Math.PI * 2;
    const r = 34 + 16 * Math.cos(petals * t);
    pts.push(`${(50 + r * Math.cos(t)).toFixed(2)},${(50 + r * Math.sin(t)).toFixed(2)}`);
  }
  return `M${pts.join(" L")}Z`;
}

/** Separable box blur, run three times ≈ gaussian. Softens shape edges so dots taper off. */
function blur(src: Float32Array, radius: number) {
  const tmp = new Float32Array(src.length);
  const pass = (from: Float32Array, to: Float32Array, horizontal: boolean) => {
    for (let a = 0; a < N; a++) {
      let sum = 0;
      for (let b = -radius; b <= radius; b++) {
        const k = Math.min(N - 1, Math.max(0, b));
        sum += horizontal ? from[a * N + k] : from[k * N + a];
      }
      for (let b = 0; b < N; b++) {
        const i = horizontal ? a * N + b : b * N + a;
        to[i] = sum / (radius * 2 + 1);
        const add = Math.min(N - 1, b + radius + 1);
        const sub = Math.max(0, b - radius);
        sum += horizontal ? from[a * N + add] - from[a * N + sub] : from[add * N + a] - from[sub * N + a];
      }
    }
  };
  for (let i = 0; i < 3; i++) {
    pass(src, tmp, true);
    pass(tmp, src, false);
  }
  return src;
}

const masks = new Map<string, Float32Array>();

function getMask(shape: HalftoneShape, soft: number) {
  const key = `${shape}:${soft}`;
  const cached = masks.get(key);
  if (cached) return cached;

  const mask = new Float32Array(N * N);
  if (shape === "sphere") {
    for (let y = 0; y < N; y++)
      for (let x = 0; x < N; x++) {
        const d = Math.hypot(x / N - 0.5, y / N - 0.5) / 0.5;
        mask[y * N + x] = Math.max(0, 1 - d) ** 0.6;
      }
  } else {
    // Draw the crisp shape (inset so the blur has room), then soften it.
    const c = document.createElement("canvas");
    c.width = c.height = N;
    const ctx = c.getContext("2d")!;
    ctx.scale(N / 100, N / 100);
    ctx.translate(7, 7);
    ctx.scale(0.86, 0.86);
    ctx.fill(new Path2D(PATHS[shape]));
    const { data } = ctx.getImageData(0, 0, N, N);
    for (let i = 0; i < mask.length; i++) mask[i] = data[i * 4 + 3] / 255;
    blur(mask, soft);
  }
  masks.set(key, mask);
  return mask;
}

type Props = {
  shape: HalftoneShape;
  /** Dot spacing in CSS pixels when drawn at `baseSize`. */
  cell?: number;
  /** Width the `cell` spacing is tuned for; smaller renders get proportionally finer dots. */
  baseSize?: number;
  /** Square "pixel" dots instead of round ones. */
  square?: boolean;
  /** Dotted crosshair through the center, like a lens flare. */
  crosshair?: boolean;
  /** Edge softness in mask pixels. */
  soft?: number;
  /** Ink color. */
  color?: string;
  className?: string;
};

/** A shape printed as halftone dots that "develop" in the first time it scrolls into view. */
export function Halftone({
  shape,
  cell = 8,
  baseSize,
  square = false,
  crosshair = false,
  soft = 5,
  color = "#141414",
  className,
}: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const mask = getMask(shape, soft);
    let progress = reduceMotion ? 1 : 0;
    let raf = 0;

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      const dpr = window.devicePixelRatio || 1;
      // Shrink dots with the square root of the scale so small stickers stay legible, not mushy.
      const scale = baseSize ? Math.sqrt(Math.min(1, w / dpr / baseSize)) : 1;
      const g = cell * scale * dpr;
      const rowH = square ? g : g * 0.866;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = color;

      for (let row = 0, y = g / 2; y < h; row++, y += rowH) {
        const shift = !square && row % 2 ? g / 2 : 0;
        for (let x = g / 2 + shift; x < w; x += g) {
          const v = mask[Math.floor((y / h) * N) * N + Math.floor((x / w) * N)];
          // Dense ink prints first, the fringe last.
          const t = Math.min(1, Math.max(0, progress * 1.6 - (1 - v) * 0.6));
          const size = Math.sqrt(v) * t;
          if (size < 0.08) continue;
          if (square) {
            const s = g * size * 1.02;
            ctx.fillRect(x - s / 2, y - s / 2, s, s);
          } else {
            ctx.beginPath();
            ctx.arc(x, y, (g / 2) * size * 1.18, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      if (crosshair && progress > 0.5) {
        const s = g * 0.3;
        for (let k = 0; k * g < w; k += 2) {
          const p = k * g + g / 2;
          ctx.fillRect(p - s / 2, h / 2 - s / 2, s, s);
          ctx.fillRect(w / 2 - s / 2, p - s / 2, s, s);
        }
      }
    };

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      draw();
    };

    let start = 0;
    const tick = (now: number) => {
      start ||= now;
      progress = Math.min(1, (now - start) / 1100);
      draw();
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      raf = requestAnimationFrame(tick);
    });
    if (!reduceMotion) io.observe(canvas);
    return () => {
      ro.disconnect();
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [shape, cell, baseSize, square, crosshair, soft, color, reduceMotion]);

  return <canvas ref={ref} className={className} aria-hidden />;
}
