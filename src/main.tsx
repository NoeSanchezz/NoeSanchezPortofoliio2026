import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MotionConfig } from "motion/react";
import { Taskbar } from "./components/Taskbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Work } from "./components/Work";
import { Outro } from "./components/Outro";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <Taskbar />
      <main>
        <Hero />
        <About />
        <Work />
        <Outro />
      </main>
    </MotionConfig>
  </StrictMode>,
);
