import { motion } from "motion/react";
import { experience, profile, socials } from "../content";
import { Sparkle } from "./Sparkle";

export function Outro() {
  return (
    <div className="outro">
      <div className="torn" aria-hidden />
      <section id="experience" className="experience">
        <h2 className="display light">EXPERIENCE</h2>
        <ol className="timeline">
          {experience.map((x, i) => (
            <motion.li
              key={x.years + x.org}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <span className="pixel when">{x.years}</span>
              <h3>
                {x.title} <em>@ {x.org}</em>
              </h3>
              <ul>
                {x.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ol>
      </section>

      <section id="contact" className="contact">
        <p className="pixel">new message (1)</p>
        <a className="say-hi" href={`mailto:${profile.email}`}>
          SAY HI <Sparkle />
        </a>
        <ul className="contact-links">
          {socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noreferrer">{s.label}</a>
            </li>
          ))}
        </ul>
        <footer>
          © {new Date().getFullYear()} {profile.name} · built with React, TypeScript & too many draggable windows
        </footer>
      </section>
    </div>
  );
}
