# CloudTrack - AWS Deployment Learning Dashboard

CloudTrack is a modern, production-style Next.js web application built for developers learning how to deploy applications on Amazon Web Services (AWS) step by step.

It demonstrates how to configure Next.js with **Static Site Generation (`output: 'export'`)** to build a responsive, serverless dashboard that can be hosted on a private **Amazon S3 bucket** and delivered globally via **Amazon CloudFront** with **Origin Access Control (OAC)**.

---

## Key Features

- **Dashboard (`/`)**: High-level overview of AWS learning metrics, curriculum progress meter, upcoming learning tasks with add/delete functionality, and recent activities.
- **AWS Roadmap (`/roadmap`)**: Interactive roadmap covering 11 critical modules (AWS Fundamentals, IAM, EC2, S3, VPC, RDS, Lambda, CloudFront, Route 53, Amplify, Next.js Deployment). Mark modules as *Not Started*, *In Progress*, or *Completed* with instant progress calculation.
- **Deployment Projects (`/projects`)**: Detailed architectural walkthroughs for 4 deployment patterns:
  1. React SPA on S3 and CloudFront
  2. Next.js Static Export on S3 and CloudFront
  3. Next.js SSR application on AWS Amplify Hosting
  4. Dockerized Next.js on Amazon ECS (Fargate)
- **Deployment Playground (`/playground`)**: Visual and interactive pipeline detailing the path from Developer to Browser (`Developer → Next.js build → Static export (out/) → Amazon S3 → CloudFront → Browser`). Includes an interactive production checklist and copyable AWS CLI snippets.
- **AWS Concepts (`/concepts`)**: Comprehensive guides to core cloud primitives (S3, CloudFront, IAM, EC2, Lambda, Amplify) and an architecture comparison table comparing Static Hosting vs Server-Side Rendering.
- **Client-Side Persistence**: All progress, tasks, and checklist states persist locally in your browser via `LocalStorage`—preventing hydration warnings and incurring **$0.00** in database costs.
- **Light & Dark Mode**: Seamless theme switching with system preference detection and persistent preference storage.

---

## Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Static Export mode)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI & Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Storage**: Browser LocalStorage (Zero runtime server, zero database required)
- **Target Cloud**: Amazon S3 + Amazon CloudFront (Origin Access Control)

---

## Quick Start (Local Development)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Static Export Build (AWS Deployment)

To compile the application for deployment to Amazon S3:

```bash
npm run build
```

Next.js will compile the application and generate a completely self-contained static directory at:
```
./out/
```

### Previewing the Static Export Locally
You can test the static output folder before uploading to AWS using any static HTTP server:
```bash
npx serve out
```

---

## Project Structure

```
├── DEPLOYMENT.md             # Beginner-friendly AWS step-by-step deployment guide
├── README.md                 # Project documentation
├── next.config.ts            # Configured with output: 'export' & trailingSlash: true
├── package.json              # Project scripts and dependencies
├── tailwind.config.ts        # Tailwind styling & AWS custom theme colors
├── tsconfig.json             # TypeScript configuration with @/* paths
├── out/                      # Production static export directory (generated on build)
└── src/
    ├── app/                  # Next.js App Router pages
    │   ├── layout.tsx        # Root layout with Theme & Learning providers
    │   ├── page.tsx          # Dashboard (/)
    │   ├── roadmap/          # AWS Learning Roadmap (/roadmap)
    │   ├── projects/         # Deployment Projects (/projects)
    │   ├── playground/       # Deployment Playground (/playground)
    │   ├── concepts/         # AWS Concepts (/concepts)
    │   └── globals.css       # Tailwind & custom CSS variables
    ├── components/
    │   ├── layout/           # Sidebar, Header, AppShell
    │   ├── dashboard/        # MetricCard, ProgressOverview, TaskManager, RecentActivityList
    │   ├── roadmap/          # RoadmapModuleCard, RoadmapFilters
    │   ├── projects/         # ProjectCard
    │   ├── playground/       # ArchitectureDiagram, StepExplanation, DeploymentChecklist, TerminalSnippet
    │   ├── concepts/         # ConceptCard, ComparisonTable
    │   └── ui/               # Badge, Button, Card, ProgressBar, Modal
    ├── context/
    │   ├── LearningContext.tsx # LocalStorage state management (Modules, Tasks, Activities, Checklist)
    │   └── ThemeContext.tsx    # Light/Dark mode state management
    ├── data/                 # Sample datasets (Roadmap, Projects, Tasks, Concepts, Architecture)
    └── types/                # TypeScript interface definitions
```

---

## Static Export Architecture Rules

1. **Why `trailingSlash: true`?**
   Amazon S3 is a key-value object store. With `trailingSlash: true`, Next.js creates folders like `/roadmap/index.html`. CloudFront and S3 resolve this directory cleanly without needing rewrite functions.
2. **Why `images: { unoptimized: true }`?**
   Next.js's default image optimization relies on a Node.js server. For pure static export on S3, images must be served directly.
3. **Where is user data saved?**
   All learning progress and tasks are stored in the user's browser via `LocalStorage`. Zero data is sent to AWS, meaning your AWS bill remains at or near $0.00.

---

## AWS Deployment Guide

For full step-by-step instructions on setting up your private S3 bucket, configuring CloudFront with Origin Access Control (OAC), handling cache invalidations, and cleaning up resources, see [DEPLOYMENT.md](file:///home/habilelabs/Documents/AWS/Next%20JS%20Deployment/DEPLOYMENT.md).

