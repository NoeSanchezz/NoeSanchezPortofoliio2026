import { useState, type ReactNode, type RefObject } from "react";
import { motion, useDragControls } from "motion/react";
import { useFinePointer } from "../hooks";

let topZ = 10;

type Props = {
  title: string;
  children: ReactNode;
  className?: string;
  bounds?: RefObject<HTMLElement | null>;
  rotate?: number;
};

export function Window({ title, children, className = "", bounds, rotate = 0 }: Props) {
  const controls = useDragControls();
  const draggable = useFinePointer();
  const [z, setZ] = useState(1);
  const [open, setOpen] = useState(true);

  return (
    <motion.section
      className={`window ${className}`}
      style={{ zIndex: z, rotate }}
      drag={draggable}
      dragControls={controls}
      dragListener={false}
      dragConstraints={bounds}
      dragMomentum={false}
      onPointerDown={() => setZ(++topZ)}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      aria-label={title}
    >
      <header
        className={`window-bar ${draggable ? "is-draggable" : ""}`}
        onPointerDown={(e) => draggable && controls.start(e)}
      >
        <span className="window-title">{title}</span>
        <button
          type="button"
          className="window-btn"
          aria-expanded={open}
          aria-label={open ? `Minimize ${title}` : `Restore ${title}`}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "–" : "□"}
        </button>
      </header>
      {open && <div className="window-body">{children}</div>}
    </motion.section>
  );
}
