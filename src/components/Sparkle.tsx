/** Four-pointed star with concave sides (100×100 box) — the site's signature mark. */
export const STAR_PATH = "M50 0 C54 36 64 46 100 50 C64 54 54 64 50 100 C46 64 36 54 0 50 C36 46 46 36 50 0 Z";

export function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg className={`sparkle ${className}`} viewBox="0 0 100 100" aria-hidden>
      <path d={STAR_PATH} fill="currentColor" />
    </svg>
  );
}
