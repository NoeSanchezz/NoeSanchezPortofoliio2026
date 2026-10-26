import { useRef } from "react";
import { projects } from "../content";
import { Window } from "./Window";

const tilts = [-2.5, 1.5, -1, 2.5];

export function Work() {
  const bounds = useRef<HTMLElement>(null);

  return (
    <section className="work" id="work" ref={bounds}>
      <h2 className="display">
        SELECTED <span className="outline">WORK</span>
      </h2>
      <p className="hint pixel">↳ psst — grab a title bar and move things around</p>
      <div className="project-grid">
        {projects.map((p, i) => (
          <Window key={p.name} title={`${p.name}.exe`} bounds={bounds} rotate={tilts[i % tilts.length]}>
            {p.award && <span className="sticker">🏆 {p.award}</span>}
            <p className="project-blurb">{p.blurb}</p>
            <ul className="chips">
              {p.tech.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <div className="project-links">
              {p.repo && (
                <a className="bevel" href={p.repo} target="_blank" rel="noreferrer">
                  source
                </a>
              )}
              {p.live && (
                <a className="bevel" href={p.live} target="_blank" rel="noreferrer">
                  live ↗
                </a>
              )}
            </div>
          </Window>
        ))}
      </div>
    </section>
  );
}
