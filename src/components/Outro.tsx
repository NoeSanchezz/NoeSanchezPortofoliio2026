import { useRef } from "react";
import { motion } from "motion/react";
import { experience, profile, socials } from "../content";
import { Sparkle } from "./Sparkle";
import { Stickers, type Sticker } from "./Stickers";

// White halftone stickers in the open space to the right of the timeline.
const EXPERIENCE_STICKERS: Sticker[] = [
  { shape: "sphere", size: 320, pos: { right: "-4%", top: "2%" }, cell: 8, desktopOnly: true },
  { shape: "star", size: 90, pos: { right: "24%", top: "2%" }, cell: 5, square: true, crosshair: true, soft: 1 },
  { shape: "bang", size: 130, pos: { right: "22%", top: "30%" }, cell: 6, soft: 6, desktopOnly: true },
  { shape: "star", size: 260, pos: { right: "4%", top: "40%" }, cell: 7, square: true, crosshair: true, soft: 2, desktopOnly: true },
  { shape: "star", size: 60, pos: { right: "30%", top: "58%" }, cell: 5, square: true, soft: 1, desktopOnly: true },
  { shape: "flower", size: 160, pos: { right: "24%", bottom: "4%" }, cell: 7, soft: 7, desktopOnly: true },
  { shape: "bolt", size: 200, pos: { right: "0%", bottom: "0%" }, cell: 7, soft: 4, desktopOnly: true },
];

export function Outro() {
  const experienceRef = useRef<HTMLElement>(null);

  return (
    <div className="outro">
      <div className="torn" aria-hidden />
      <section id="experience" className="experience" ref={experienceRef}>
        <Stickers items={EXPERIENCE_STICKERS} color="#f2f2ee" bounds={experienceRef} />
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
