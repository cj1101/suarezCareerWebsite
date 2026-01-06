# Charles Suarez Career Website

A professional portfolio website showcasing work experience and interactive project demos.

## Features

- **Interactive Work Experience**: Click on any job description bullet point to see detailed information in a side panel
- **Project Demos**: 7 fully interactive project demonstrations:
  - Crow's Eye Marketing Suite
  - Game Worker Info Gatherer
  - Cascade Game Simulation
  - Minecraft Schematic Builder
  - moodyNick Design Studio
  - French Verb Conjugator
  - Net Zero Analyzer
- **Modern Design**: Sleek, professional design with smooth animations and glassmorphism effects
- **Responsive**: Works perfectly on mobile, tablet, and desktop

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── about/              # About Me page
│   ├── experience/         # Work experience page
│   ├── projects/           # Project demo pages
│   └── page.tsx            # Home page
├── components/             # React components
│   ├── JobCard.tsx         # Interactive job card
│   ├── JobDetailPanel.tsx  # Side panel for job details
│   ├── Navigation.tsx      # Main navigation
│   └── ProjectCard.tsx     # Project showcase card
├── data/                   # Data files
│   ├── projects.ts         # Project metadata
│   └── resume.ts          # Resume/work experience data
└── public/                 # Static assets
```

## Customization

### Adding Resume Data

Edit `data/resume.ts` to add your work experience, education, and skills. The structure includes:

- Job positions with company, role, dates, and bullet points
- Each bullet point can have detailed content (provided later)
- Education and skills sections

### Adding Project Details

Edit `data/projects.ts` to update project information, including:
- Project name and description
- Tech stack
- GitHub repository links
- Demo paths

## Building for Production

```bash
npm run build
npm start
```

## Technologies Used

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons

## License

Private project - All rights reserved


