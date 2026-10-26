// Everything personal lives here — edit this file to update the site.
import type { IconType } from "react-icons";
import { FaAws, FaGithub, FaLinkedin } from "react-icons/fa";
import {
  SiTypescript,
  SiReact,
  SiNodedotjs,
  SiGo,
  SiPython,
  SiSwift,
  SiTailwindcss,
  SiPostgresql,
  SiFirebase,
  SiGooglecloud,
  SiDocker,
  SiTerraform,
} from "react-icons/si";

export const profile = {
  name: "Noe Sanchez",
  handle: "noe",
  role: "AI & Software Engineer",
  // Who you are and how you work. Facts like stack and focus live in `currently` below.
  bio: "Hi! I'm Noe, an AI & software engineer at PMG and a cum laude CS grad from UT Arlington. I like owning things end to end, from the infrastructure to the last pixel, and I care about the small details that make software feel good to use.",
  // Drop a photo at public/me.jpg and set this to "/me.jpg". Leave empty for a placeholder.
  photo: "/me.jpg",
  email: "noesanchez00000@gmail.com",
  resumeUrl: "/Noe-Sanchez-Resume.pdf", // file lives in public/
};

export const socials: { label: string; handle: string; href: string; icon: IconType }[] = [
  { label: "GitHub", handle: "@NoeSanchezz", href: "https://github.com/NoeSanchezz", icon: FaGithub },
  { label: "LinkedIn", handle: "in/noe-sanchez0", href: "https://www.linkedin.com/in/noe-sanchez0", icon: FaLinkedin },
];

export const skills: { name: string; icon: IconType; color: string }[] = [
  { name: "TypeScript", icon: SiTypescript, color: "#3178c6" },
  { name: "React", icon: SiReact, color: "#149eca" },
  { name: "Node.js", icon: SiNodedotjs, color: "#5fa04e" },
  { name: "Go", icon: SiGo, color: "#00add8" },
  { name: "Python", icon: SiPython, color: "#3776ab" },
  { name: "Swift", icon: SiSwift, color: "#f05138" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06b6d4" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169e1" },
  { name: "Firebase", icon: SiFirebase, color: "#dd2c00" },
  { name: "AWS", icon: FaAws, color: "#ff9900" },
  { name: "Google Cloud", icon: SiGooglecloud, color: "#4285f4" },
  { name: "Docker", icon: SiDocker, color: "#2496ed" },
  { name: "Terraform", icon: SiTerraform, color: "#844fba" },
];

// The currently.txt window — keep it short and update it whenever things change.
export const currently = {
  updated: "Oct 2026",
  items: [
    { label: "focus", value: "agentic engineering" },
    { label: "building", value: "AI agents & full-stack apps" },
    { label: "stack", value: "TypeScript · Node.js · Python · Terraform" },
    { label: "mentoring", value: "4 engineers in an AI & SWE program" },
    { label: "languages", value: "English · Español" },
  ],
};

export const education: { years: string; school: string; detail: string }[] = [
  { years: "Dec 2025", school: "University of Texas at Arlington", detail: "B.S. Computer Science, Cum Laude" },
  { years: "2022 – 2023", school: "Tarrant County College", detail: "Associate of Arts · Associate of Science" },
];

export const experience: { years: string; title: string; org: string; highlights: string[] }[] = [
  {
    years: "Jan 2026 – Present",
    title: "AI & Software Engineer",
    org: "PMG",
    highlights: [
      "Helping architect an agentic platform from the ground up on the open-source Pi agent framework, building agent-driven frontends across the full product lifecycle.",
      "Alli Workflows: migrated 20+ UI components across 3 core screens to a new design system in a Go / TypeScript / Terraform microservice.",
      "Mentor 4 engineers in PMG's AI & Software Engineering program and speak on its panels and workshops.",
    ],
  },
  {
    years: "Jun 2025 – Jul 2025",
    title: "AI & Software Engineering Intern",
    org: "PMG",
    highlights: [
      "Project Pulse: defined 18+ SLOs across 11 platforms, raising visibility across Alli services by 30%.",
      "Built 2 real-time Looker dashboards with 40+ KPIs from Datadog, AWS, GitHub, Jira & Workday, used weekly by 100+ engineers and execs.",
      "Surfaced $24K–$60K/yr in potential AWS savings by detecting unused services and idle ECS containers.",
    ],
  },
];

export type Project = {
  name: string;
  blurb: string;
  tech: string[];
  award?: string;
  repo?: string;
  live?: string;
};

export const projects: Project[] = [
  {
    name: "forecast-tx",
    blurb: "Predicts the frequency and severity of hail, wind and rain across Texas 5–10 years out from historical NOAA data. Linear Regression + LSTM models at 80% accuracy. Built for State Farm.",
    tech: ["Python", "LSTM", "GCP", "Firebase", "PostgreSQL"],
  },
  {
    name: "fixr",
    blurb: "Check-engine-light diagnostics on your phone: talks to a car's OBD2 port over Bluetooth using SAE J1850 PWM, with a cross-platform mobile app.",
    tech: ["React Native", "Swift", "SwiftUI", "TypeScript"],
    award: "HackUTA '23 winner",
  },
  {
    name: "project-pulse",
    blurb: "Operations dashboard for PMG's Alli platform: SLOs, 40+ auto-refreshing KPIs and an idle-infrastructure finder that flagged real AWS savings.",
    tech: ["Looker", "Datadog", "AWS", "Python"],
  },
  {
    name: "this-portfolio",
    blurb: "The site you're on. Draggable windows on crumpled graph paper.",
    tech: ["React", "TypeScript", "Motion"],
    repo: "https://github.com/NoeSanchezz",
  },
];
