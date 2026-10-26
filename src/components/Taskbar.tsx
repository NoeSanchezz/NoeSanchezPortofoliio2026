import { useRef } from "react";
import { FaEnvelope } from "react-icons/fa";
import { FaFileArrowDown } from "react-icons/fa6";
import { profile, socials } from "../content";
import { useActiveSection, useClock } from "../hooks";

const tabs = [
  { id: "about", label: "about.me" },
  { id: "work", label: "work" },
  { id: "experience", label: "experience" },
  { id: "contact", label: "contact" },
];
const tabIds = tabs.map((t) => t.id);

export function Taskbar() {
  const now = useClock();
  const active = useActiveSection(tabIds);
  const startMenu = useRef<HTMLDetailsElement>(null);
  const closeMenu = () => startMenu.current?.removeAttribute("open");

  return (
    <nav className="taskbar" aria-label="Main">
      <details className="start" ref={startMenu}>
        <summary className="bevel" aria-label="Start menu">
          ✦<span className="start-label"> Start</span>
        </summary>
        <ul className="start-menu bevel" onClick={closeMenu}>
          <li><a href="#about">🏠 Home</a></li>
          {socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noreferrer">↗ {s.label}</a>
            </li>
          ))}
          <li><a href={`mailto:${profile.email}`}>✉ Email me</a></li>
          <li><a href={profile.resumeUrl} download>📄 Download resume</a></li>
        </ul>
      </details>
      <div className="tabs">
        {tabs.map((t) => (
          <a
            key={t.id}
            href={`#${t.id}`}
            className={`tab bevel ${active === t.id ? "is-active" : ""}`}
            aria-current={active === t.id ? "true" : undefined}
          >
            {t.label}
          </a>
        ))}
      </div>
      <div className="quick-links">
        {socials.map(({ label, href, icon: Icon }) => (
          <a key={label} className="quick bevel" href={href} target="_blank" rel="noreferrer" aria-label={label} title={label}>
            <Icon aria-hidden />
          </a>
        ))}
        <a className="quick bevel" href={`mailto:${profile.email}`} aria-label="Email" title={profile.email}>
          <FaEnvelope aria-hidden />
        </a>
        <a className="quick resume-btn" href={profile.resumeUrl} download title="Download resume (PDF)">
          <FaFileArrowDown aria-hidden />
          <span className="resume-label">Resume</span>
        </a>
      </div>
      <time className="clock bevel-in" dateTime={now.toISOString()}>
        {now.toLocaleDateString(undefined, { month: "2-digit", day: "2-digit", year: "numeric" })}
        <span>{now.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })}</span>
      </time>
    </nav>
  );
}
