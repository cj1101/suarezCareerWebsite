export interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  demoPath: string;
  icon: string;
}

export const projects: Project[] = [
  {
    id: "crows-eye",
    name: "Crow's Eye Marketing Suite",
    description:
      "AI-powered social media management platform with content generation, scheduling, and analytics",
    techStack: ["Next.js", "TypeScript", "Firebase", "Gemini AI", "Stripe"],
    githubUrl: "https://github.com/cj1101/CrowsEyeWebsite.git",
    demoPath: "/projects/crows-eye",
    icon: "🦅",
  },
  {
    id: "game-worker",
    name: "Game Worker Info Gatherer",
    description:
      "Web scraping tool to track and analyze video game industry labor movements worldwide using AI",
    techStack: ["Python", "Playwright", "OpenAI GPT-4", "Tkinter"],
    demoPath: "/projects/game-worker",
    icon: "🎮",
  },
  {
    id: "cascade",
    name: "Cascade Game Simulation",
    description:
      "Modular game simulation system that generates match results and posts them to Instagram",
    techStack: ["Python", "PIL", "Selenium", "AWS"],
    githubUrl: "https://github.com/cj1101/cascade",
    demoPath: "/projects/cascade",
    icon: "🏆",
  },
  {
    id: "minecraft-schem",
    name: "Minecraft Schematic Builder",
    description:
      "Code-driven tool for creating Minecraft schematics with real-time 3D preview and export",
    techStack: ["Python", "Flask", "Three.js", "nbtlib"],
    githubUrl: "https://github.com/cj1101/minecraftSchemMaker",
    demoPath: "/projects/minecraft-schem",
    icon: "🎮",
  },
  {
    id: "moody-nick",
    name: "moodyNick Design Studio",
    description:
      "Custom design interface with product mockup functionality for creating branded merchandise",
    techStack: ["Next.js", "React", "Node.js", "MongoDB"],
    githubUrl: "https://github.com/cj1101/moodyNick",
    demoPath: "/projects/moody-nick",
    icon: "🎨",
  },
  {
    id: "french-conjugation",
    name: "French Verb Conjugator",
    description:
      "Interactive tool for conjugating French verbs and identifying conjugated forms",
    techStack: ["Python", "PyQt6"],
    demoPath: "/projects/french-conjugation",
    icon: "🇫🇷",
  },
  {
    id: "net-zero",
    name: "Net Zero Analyzer",
    description:
      "Analysis engine for emissions data and net zero progress tracking with visualizations",
    techStack: ["Python", "Tkinter", "Matplotlib", "Pandas", "scikit-learn"],
    demoPath: "/projects/net-zero",
    icon: "🌱",
  },
];


