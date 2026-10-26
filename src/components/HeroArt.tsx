import type { CSSProperties, RefObject } from "react";
import { motion } from "motion/react";
import { useFinePointer } from "../hooks";
import { Halftone, type HalftoneShape } from "./Halftone";

type Sticker = {
  shape: HalftoneShape;
  size: number; // px on desktop; scaled down on small screens via --k
  pos: CSSProperties;
  cell?: number;
  square?: boolean;
  crosshair?: boolean;
  soft?: number;
};

// Laid out around the name like a sticker sheet.
const STICKERS: Sticker[] = [
  { shape: "sphere", size: 380, pos: { left: "0%", top: "2%" }, cell: 8 },
  { shape: "star", size: 300, pos: { right: "2%", top: "-4%" }, cell: 7, square: true, crosshair: true, soft: 2 },
  { shape: "star", size: 96, pos: { right: "30%", top: "6%" }, cell: 5, square: true, crosshair: true, soft: 1 },
  { shape: "star", size: 70, pos: { left: "38%", top: "-2%" }, cell: 5, square: true, soft: 1 },
  { shape: "flower", size: 190, pos: { left: "6%", bottom: "-2%" }, cell: 7, soft: 7 },
  { shape: "bolt", size: 230, pos: { right: "4%", bottom: "-6%" }, cell: 7, soft: 4 },
  { shape: "bang", size: 160, pos: { right: "27%", bottom: "-4%" }, cell: 7, soft: 6 },
];

/** Halftone stickers scattered around the hero name; draggable with a mouse. */
export function HeroArt({ bounds }: { bounds: RefObject<HTMLElement | null> }) {
  const draggable = useFinePointer();

  return (
    <div className="hero-art" aria-hidden>
      {STICKERS.map(({ shape, size, pos, ...art }, i) => (
        <motion.div
          key={i}
          className="ht-sticker"
          style={{ ...pos, "--s": size } as CSSProperties}
          drag={draggable}
          dragConstraints={bounds}
          dragElastic={0.2}
          whileDrag={{ scale: 1.08 }}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15 + i * 0.12, type: "spring", stiffness: 220, damping: 16 }}
        >
          <div className="ht-float" style={{ animationDelay: `${i * -0.7}s` }}>
            <Halftone shape={shape} baseSize={size} {...art} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
