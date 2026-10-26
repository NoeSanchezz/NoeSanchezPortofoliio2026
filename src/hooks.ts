import { useEffect, useState, useSyncExternalStore } from "react";

const finePointer = typeof window !== "undefined" ? window.matchMedia("(pointer: fine)") : null;

/** True on mouse/trackpad devices — drag is disabled on touch so it can't fight scrolling. */
export function useFinePointer() {
  return useSyncExternalStore(
    (cb) => {
      finePointer?.addEventListener("change", cb);
      return () => finePointer?.removeEventListener("change", cb);
    },
    () => finePointer?.matches ?? false,
  );
}

export function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 15_000);
    return () => clearInterval(id);
  }, []);
  return now;
}

/** Id of the section currently in the middle of the viewport. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [ids]);
  return active;
}
