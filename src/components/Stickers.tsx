import type { CSSProperties, RefObject } from "react";
import { motion } from "motion/react";
import { useFinePointer } from "../hooks";
import { Halftone, type HalftoneShape } from "./Halftone";

export type Sticker = {
  shape: HalftoneShape;
  size: number; // px on desktop; scaled down on small screens via --k
  pos: CSSProperties;
  cell?: number;
  square?: boolean;
  crosshair?: boolean;
  soft?: number;
  /** Hide on small screens where it would sit on top of text. */
  desktopOnly?: boolean;
};

type Props = {
  items: Sticker[];
  color?: string;
  bounds: RefObject<HTMLElement | null>;
};

/** A layer of floating halftone stickers; draggable with a mouse. */
export function Stickers({ items, color, bounds }: Props) {
  const draggable = useFinePointer();

  return (
    <div className="stickers" aria-hidden>
      {items.map(({ shape, size, pos, desktopOnly, ...art }, i) => (
        <motion.div
          key={i}
          className={`ht-sticker ${desktopOnly ? "desktop-only" : ""}`}
          style={{ ...pos, "--s": size } as CSSProperties}
          drag={draggable}
          dragConstraints={bounds}
          dragElastic={0.2}
          whileDrag={{ scale: 1.08 }}
          initial={{ scale: 0.6, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 + i * 0.12, type: "spring", stiffness: 220, damping: 16 }}
        >
          <div className="ht-float" style={{ animationDelay: `${i * -0.7}s` }}>
            <Halftone shape={shape} baseSize={size} color={color} {...art} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
