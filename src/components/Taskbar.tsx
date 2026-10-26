import { useRef } from "react";
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
          <li><a href="#top">🏠 Home</a></li>
          {socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noreferrer">↗ {s.label}</a>
            </li>
          ))}
          <li><a href={`mailto:${profile.email}`}>✉ Email me</a></li>
          {profile.resumeUrl && (
            <li><a href={profile.resumeUrl} target="_blank" rel="noreferrer">📄 Resume</a></li>
          )}
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
      <time className="clock bevel-in" dateTime={now.toISOString()}>
        {now.toLocaleDateString(undefined, { month: "2-digit", day: "2-digit", year: "numeric" })}
        <span>{now.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })}</span>
      </time>
    </nav>
  );
}
