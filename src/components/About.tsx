import { useRef, type CSSProperties } from "react";
import { currently, education, profile, skills, socials } from "../content";
import { Window } from "./Window";

export function About() {
  const bounds = useRef<HTMLElement>(null);

  return (
    <section className="about" id="about" ref={bounds}>
      <div className="about-text">
        <h2 className="about-heading">
          <span className="pixel">about</span>
          <span className="pixel big">me!</span>
        </h2>
        <p className="serif-name">{profile.name}</p>
        <p className="role-pill">{profile.role}</p>
        <p className="bio">{profile.bio}</p>

        <h3 className="serif-label">Skills</h3>
        <ul className="skills">
          {skills.map(({ name, icon: Icon, color }) => (
            <li key={name} className="skill" tabIndex={0} style={{ "--c": color } as CSSProperties}>
              <Icon aria-hidden />
              <span className="tooltip">{name}</span>
              <span className="sr-only">{name}</span>
            </li>
          ))}
        </ul>

        <h3 className="serif-label">Education</h3>
        <ul className="edu">
          {education.map((e) => (
            <li key={e.school}>
              <small>{e.years}</small>
              <strong>{e.school}</strong>
              <span>{e.detail}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="about-desk">
        <div className="paint-tools" aria-hidden>
          <img src="/paint-tools.png" alt="" />
        </div>
        <Window title={`MEET-${profile.handle.toUpperCase()}.exe`} className="photo-window" bounds={bounds} rotate={-2}>
          <figure className="selection">
            {profile.photo ? (
              <img src={profile.photo} alt={profile.name} />
            ) : (
              <div className="photo-placeholder">
                drop a photo at
                <br />
                <code>public/me.jpg</code>
              </div>
            )}
            {["tl", "tm", "tr", "ml", "mr", "bl", "bm", "br"].map((h) => (
              <i key={h} className={`handle ${h}`} aria-hidden />
            ))}
          </figure>
        </Window>

        <Window title="SOCIALS" className="socials-window" bounds={bounds} rotate={3}>
          <ul className="socials">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer">
                  <b>{s.label}</b> {s.handle}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${profile.email}`}>
                <b>Email</b> {profile.email}
              </a>
            </li>
          </ul>
        </Window>

        <Window title="currently.txt - Notepad" className="notepad-window" bounds={bounds} rotate={-1.5}>
          <ul className="notepad-menu" aria-hidden>
            {["File", "Edit", "Format", "View", "Help"].map((m) => (
              <li key={m}>
                <u>{m[0]}</u>
                {m.slice(1)}
              </li>
            ))}
          </ul>
          <div className="notepad">
            <dl>
              {currently.items.map(({ label, value }) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
            <p className="notepad-foot">
              last updated: {currently.updated}
              <span className="notepad-caret" aria-hidden />
            </p>
          </div>
        </Window>
      </div>
    </section>
  );
}
