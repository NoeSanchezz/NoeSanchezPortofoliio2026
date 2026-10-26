import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MotionConfig } from "motion/react";
import { Boot } from "./components/Boot";
import { Taskbar } from "./components/Taskbar";
import { About } from "./components/About";
import { Work } from "./components/Work";
import { Outro } from "./components/Outro";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <Boot />
      <Taskbar />
      <main>
        <About />
        <Work />
        <Outro />
      </main>
    </MotionConfig>
  </StrictMode>,
);
