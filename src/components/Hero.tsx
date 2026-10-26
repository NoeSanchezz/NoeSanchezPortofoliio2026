import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { profile } from "../content";
import { HeroArt } from "./HeroArt";
import { Terminal } from "./Terminal";

export function Hero() {
  const reduceMotion = useReducedMotion();
  const [booted, setBooted] = useState(!!reduceMotion);
  const boot = useCallback(() => setBooted(true), []);

  return (
    <header className="hero" id="top">
      <AnimatePresence mode="wait">
        {booted ? <Name key="name" /> : <Terminal key="terminal" onDone={boot} />}
      </AnimatePresence>
    </header>
  );
}

function Name() {
  const stage = useRef<HTMLDivElement>(null);
  let i = 0;
  return (
    <motion.div className="hero-inner" ref={stage} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <HeroArt bounds={stage} />
      <h1 className="hero-title" aria-label={profile.name}>
        {profile.name
          .toUpperCase()
          .split(" ")
          .map((word) => (
            <span key={word} className="hero-word" aria-hidden>
              {word.split("").map((l) => {
                const n = i++;
                return (
                  <motion.span
                    key={n}
                    initial={{ y: 80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 + n * 0.05, type: "spring", stiffness: 300, damping: 20 }}
                    whileHover={{ y: -12, rotate: n % 2 ? 6 : -6 }}
                  >
                    {l}
                  </motion.span>
                );
              })}
            </span>
          ))}
      </h1>
      <p className="hero-meta">{profile.role}</p>
    </motion.div>
  );
}
