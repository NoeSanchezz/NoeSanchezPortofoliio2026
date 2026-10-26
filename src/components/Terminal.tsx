import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { TypeAnimation } from "react-type-animation";

const PROMPT = "Computer>";
const COMMAND = "cd Noe Sanchez Resume";

/** macOS-style terminal intro: types the command, then calls onDone. Click or any key skips. */
export function Terminal({ onDone }: { onDone: () => void }) {
  const [typed, setTyped] = useState(false);

  useEffect(() => {
    window.addEventListener("keydown", onDone);
    return () => window.removeEventListener("keydown", onDone);
  }, [onDone]);

  return (
    <motion.div
      className="mac-term"
      onClick={onDone}
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, filter: "blur(6px)" }}
      transition={{ duration: 0.35 }}
      aria-label={`${PROMPT} ${COMMAND}`}
      role="img"
    >
      <div className="mac-bar">
        <span className="mac-dots" aria-hidden>
          <i /><i /><i />
        </span>
        <span>computer — zsh — 80×24</span>
      </div>
      <div className="mac-body" aria-hidden>
        <p className="mac-dim">Last login: {new Date().toDateString()} on ttys001</p>
        <p>
          <span className="mac-prompt">{PROMPT}</span>{" "}
          <TypeAnimation
            sequence={[500, COMMAND, 450, () => setTyped(true), 1100, onDone]}
            speed={45}
            cursor={false}
          />
          {!typed && <span className="mac-cursor" />}
        </p>
        {typed && (
          <p className="mac-dim">
            opening resume<span className="mac-dots-loading" />
          </p>
        )}
      </div>
      <p className="mac-skip pixel">tap, click or press any key to skip</p>
    </motion.div>
  );
}
