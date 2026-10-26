import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Terminal } from "./Terminal";

/** Full-screen terminal "boot" that fades away to reveal the page underneath. */
export function Boot() {
  const reduceMotion = useReducedMotion();
  const [booted, setBooted] = useState(!!reduceMotion);
  const boot = useCallback(() => setBooted(true), []);

  // No scrolling the page underneath while the terminal is up.
  useEffect(() => {
    document.documentElement.classList.toggle("booting", !booted);
  }, [booted]);

  return (
    <AnimatePresence>
      {!booted && (
        <motion.div className="boot" exit={{ opacity: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <Terminal onDone={boot} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
