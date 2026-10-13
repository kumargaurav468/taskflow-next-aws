import { DeploymentStep, ChecklistItem } from "@/types";

export const ARCHITECTURE_STEPS: DeploymentStep[] = [
  {
    stepNumber: 1,
    id: "developer",
    title: "Developer Workstation",
    subtitle: "Local Development & Configuration",
    role: "You write Next.js code using App Router, React, and Tailwind CSS. You test the application locally with `npm run dev`.",
    description:
      'During development, your app uses client-side state (LocalStorage) and standard web APIs. To prepare for AWS S3 static hosting, configure `next.config.ts` with `output: "export"`, `trailingSlash: true`, and `images: { unoptimized: true }`.',
    keyArtifacts: ["src/app/page.tsx", "next.config.ts", "package.json"],
    terminalCommands: ["npm run dev", "npm test"],
    bestPractices: [
      "Do not rely on server-only Node.js modules (fs, path) in client components",
      "Use LocalStorage or client-side fetch for dynamic user data",
      "Test your production static build locally before uploading to AWS",
    ],
  },
  {
    stepNumber: 2,
    id: "nextjs-build",
    title: "Next.js Build Process",
    subtitle: "Compilation & Pre-rendering",
    role: "Next.js analyzes your application routes, bundles JavaScript and CSS, and pre-renders pages into static HTML files.",
    description:
      'When you execute `npm run build`, Next.js invokes its compiler. Because `output: "export"` is enabled, Next.js executes Static Site Generation (SSG) for all routes (`/`, `/roadmap`, `/projects`, `/playground`, `/concepts`).',
    keyArtifacts: [".next/static/", "Chunks", "Minified CSS"],
    terminalCommands: ["npm run build"],
    bestPractices: [
      "Resolve all TypeScript type errors and ESLint warnings before building",
      "Ensure no components attempt to read request headers or cookies during static generation",
      "Verify that all images use standard HTML <img> or have unoptimized: true set",
    ],
  },
  {
    stepNumber: 3,
    id: "static-export",
    title: "Static Export (`out/`)",
    subtitle: "Pure Static Assets on Disk",
    role: "Next.js creates an independent `out/` directory containing purely static HTML, CSS, JavaScript, and asset files.",
    description:
      "With `trailingSlash: true`, Next.js creates organized folders such as `out/roadmap/index.html`. This means a web server or S3 can serve the page directly without requiring complex URL rewriting rules. The `out/` folder requires zero Node.js server to run!",
    keyArtifacts: [
      "out/index.html",
      "out/roadmap/index.html",
      "out/_next/static/",
    ],
    terminalCommands: ["npx serve out", "ls -la out"],
    bestPractices: [
      "Always test the exported `out/` folder locally with a local static server like `npx serve out`",
      "Check that sub-pages can be refreshed directly without throwing 404 errors",
      "Confirm the total bundle size and asset paths are relative or root-relative",
    ],
  },
  {
    stepNumber: 4,
    id: "amazon-s3",
    title: "Amazon S3 Bucket",
    subtitle: "Secure Origin Storage",
    role: "Amazon S3 acts as the durable storage locker for your static build files.",
    description:
      "We create a dedicated private S3 bucket (e.g. `cloudtrack-dashboard-prod`). All public access is BLOCKED. S3 does not serve web traffic directly to end users; instead, only Amazon CloudFront is granted read access using an Origin Access Control (OAC) bucket policy.",
    keyArtifacts: ["S3 Bucket", "Bucket Policy (OAC)", "Uploaded Assets"],
    terminalCommands: [
      "aws s3 mb s3://my-cloudtrack-bucket --region us-east-1",
      "aws s3 sync out/ s3://my-cloudtrack-bucket --delete",
    ],
    awsConsoleAction:
      "S3 -> Create Bucket -> Block all public access: ON -> Upload out/ files",
    bestPractices: [
      "Never enable public website hosting or disable Block Public Access on your S3 bucket",
      "Always use Origin Access Control (OAC) instead of legacy Origin Access Identity (OAI)",
      "Use the `--delete` flag with `aws s3 sync` so obsolete build files are cleaned up",
    ],
  },
  {
    stepNumber: 5,
    id: "cloudfront-cdn",
    title: "Amazon CloudFront",
    subtitle: "Global Edge Caching & HTTPS",
    role: "CloudFront is the Content Delivery Network (CDN) that fetches files from S3 and delivers them worldwide with sub-second latency.",
    description:
      "CloudFront caches files across 600+ edge locations globally. It provides automatic HTTPS/TLS, prevents DDoS attacks, enforces HTTPS redirection, and signs requests to your private S3 bucket using OAC.",
    keyArtifacts: [
      "Distribution ID",
      "Default Root Object: index.html",
      "SSL Certificate",
    ],
    terminalCommands: [
      'aws cloudfront create-invalidation --distribution-id E1234567890 --paths "/*"',
    ],
    awsConsoleAction:
      "CloudFront -> Create Distribution -> Origin: S3 -> OAC: Enabled -> Root Object: index.html",
    bestPractices: [
      'Always set "Default Root Object" to index.html in the CloudFront distribution settings',
      'Set "Viewer Protocol Policy" to "Redirect HTTP to HTTPS"',
      'After uploading new files to S3, run a CloudFront Invalidation for "/*" to purge edge cache',
    ],
  },
  {
    stepNumber: 6,
    id: "browser",
    title: "User Web Browser",
    subtitle: "Lightning-Fast Client Execution",
    role: "The user opens their web browser (desktop, tablet, or mobile) and accesses your application via the CloudFront domain.",
    description:
      "The browser receives static HTML, downloads compiled CSS and JS chunks from the nearest CloudFront edge location, and hydrates React. LocalStorage data (such as roadmap progress and tasks) is persisted locally in the user browser—fast, private, and costing zero AWS database charges!",
    keyArtifacts: ["DOM Rendering", "Client-side LocalStorage", "Fast TTFB"],
    terminalCommands: ["curl -I https://d111111abcdef8.cloudfront.net"],
    bestPractices: [
      "LocalStorage data lives exclusively on the user device and is not sent to AWS",
      "Client-side state persists across page refreshes and browser restarts",
      "Zero ongoing database or EC2 computing costs while delivering sub-100ms response times",
    ],
  },
];

export const INITIAL_CHECKLIST: ChecklistItem[] = [
  {
    id: "chk-1",
    category: "Preparation",
    title: "Configure Next.js for Static Export",
    description:
      'Ensure next.config.ts has output: "export", trailingSlash: true, and images: { unoptimized: true } set.',
    completed: true,
    critical: true,
  },
  {
    id: "chk-2",
    category: "Preparation",
    title: "Verify LocalStorage Client Hydration Safety",
    description:
      "Ensure client-side data hooks avoid SSR hydration mismatch warnings using isHydrated guards.",
    completed: true,
    critical: true,
  },
  {
    id: "chk-3",
    category: "Build",
    title: "Execute Static Build",
    description:
      "Run `npm run build` and verify that the `out/` directory is generated with index.html in all route subfolders.",
    completed: true,
    critical: true,
  },
  {
    id: "chk-4",
    category: "Build",
    title: "Test Static Output Locally",
    description:
      "Run `npx serve out` and navigate through all routes to verify links and assets resolve without 404s.",
    completed: false,
    critical: false,
  },
  {
    id: "chk-5",
    category: "S3 Bucket",
    title: "Create Private S3 Bucket",
    description:
      'Create an S3 bucket in your chosen region with "Block all public access" turned ON.',
    completed: false,
    critical: true,
  },
  {
    id: "chk-6",
    category: "S3 Bucket",
    title: "Upload Static Files to S3",
    description:
      "Use `aws s3 sync out/ s3://your-bucket-name --delete` to upload all static assets.",
    completed: false,
    critical: true,
  },
  {
    id: "chk-7",
    category: "CloudFront",
    title: "Create CloudFront Distribution with OAC",
    description:
      "Set your S3 bucket as origin, enable Origin Access Control (OAC), and redirect HTTP to HTTPS.",
    completed: false,
    critical: true,
  },
  {
    id: "chk-8",
    category: "CloudFront",
    title: "Set Default Root Object to index.html",
    description:
      "In CloudFront General settings, configure Default Root Object to `index.html`.",
    completed: false,
    critical: true,
  },
  {
    id: "chk-9",
    category: "CloudFront",
    title: "Apply OAC Policy to S3 Bucket",
    description:
      "Copy the CloudFront-generated JSON policy and paste it into your S3 bucket Permissions tab.",
    completed: false,
    critical: true,
  },
  {
    id: "chk-10",
    category: "Testing & Maintenance",
    title: "Verify Live CloudFront Domain",
    description:
      "Open the CloudFront domain URL (https://xyz.cloudfront.net) in your browser and check all pages.",
    completed: false,
    critical: true,
  },
  {
    id: "chk-11",
    category: "Testing & Maintenance",
    title: "Invalidate Cache on Future Updates",
    description:
      'Whenever you re-upload files, run `aws cloudfront create-invalidation --paths "/*"` to refresh CDN caches.',
    completed: false,
    critical: false,
  },
];
