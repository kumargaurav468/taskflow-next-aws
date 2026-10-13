# AWS Deployment Guide: CloudTrack Next.js Application

Welcome to the beginner-friendly, production-grade guide for deploying Next.js applications to Amazon Web Services (AWS). This guide acts as your step-by-step mentor, taking you from your local terminal to a globally distributed, secure, and cost-effective static website.

---

## Architecture Overview

```
[ Developer Terminal ]
         │
         │  npm run build (output: 'export')
         ▼
[ out/ Directory ] (Pure static HTML, CSS, JS)
         │
         │  aws s3 sync out/ s3://your-bucket-name --delete
         ▼
[ Amazon S3 Private Bucket ] (Encrypted & Block Public Access ON)
         │
         │  Origin Access Control (OAC) with S3 Bucket Policy
         ▼
[ Amazon CloudFront CDN ] (600+ Global Edge Locations + HTTPS/TLS)
         │
         │  Edge Caching + Default Root Object: index.html
         ▼
[ End-User Web Browser ] (Sub-100ms load time + LocalStorage persistence)
```

---

## Step 1: Running the Application Locally

Before deploying to the cloud, always verify that your application runs smoothly in your local environment.

1. Clone or navigate to the project directory:
   ```bash
   cd "Next JS Deployment"
   ```

2. Start the local Next.js development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

4. Verify that:
   - Navigation between `/`, `/roadmap`, `/projects`, `/playground`, and `/concepts` works.
   - You can toggle roadmap statuses, add a personal learning task, and toggle dark/light mode.

---

## Step 2: Installing Dependencies

If you are setting this up on a new machine or continuous integration (CI) environment, install the exact dependencies:

```bash
npm install
```

### Dependencies Breakdown:
- **`next`**: Framework for React applications (using App Router and Static Export).
- **`react` & `react-dom`**: UI rendering engine.
- **`tailwindcss`**: Utility-first CSS styling for modern SaaS dashboard design.
- **`lucide-react`**: Clean, lightweight SVG icons.
- **`typescript`**: Compile-time type safety.

---

## Step 3: Building the Static Export

CloudTrack is designed for zero-server static hosting. To compile the application into static files, run:

```bash
npm run build
```

### How `next.config.ts` Configures the Export:
```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 1. Tells Next.js to generate pure HTML/CSS/JS files into the 'out/' folder
  output: 'export',

  // 2. Generates folder-based HTML (e.g. out/roadmap/index.html)
  // This is vital for static web hosting without requiring URL rewrite servers
  trailingSlash: true,

  // 3. Disables Next.js Node.js runtime image optimization server
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

---

## Step 4: Understanding the Generated `out/` Directory

When `npm run build` finishes, Next.js generates an `out/` folder in your project root.

### Directory Structure:
```
out/
├── 404.html                     <-- Global error page
├── index.html                   <-- Dashboard (/)
├── concepts/
│   └── index.html               <-- AWS Concepts (/concepts/)
├── playground/
│   └── index.html               <-- Deployment Playground (/playground/)
├── projects/
│   └── index.html               <-- Deployment Projects (/projects/)
├── roadmap/
│   └── index.html               <-- AWS Roadmap (/roadmap/)
└── _next/
    └── static/                  <-- Bundled, minified JavaScript and CSS
```

### Key Concept: Why `trailingSlash: true` Matters
Without `trailingSlash: true`, Next.js would generate `out/roadmap.html`. When an S3 origin receives a request for `/roadmap/`, it looks for a directory key named `roadmap/` and returns `403 AccessDenied` or `404 NotFound`. 

With `trailingSlash: true`, Next.js creates `out/roadmap/index.html`. S3 and CloudFront find the `index.html` inside the `roadmap` prefix cleanly!

---

## Step 5: Creating the Private S3 Bucket and Uploading `out/`

### 5.1 Create the S3 Bucket (AWS Console or AWS CLI)

#### Via AWS Management Console:
1. Open the [Amazon S3 Console](https://s3.console.aws.amazon.com/).
2. Click **Create bucket**.
3. **Bucket name**: Enter a globally unique name (e.g., `cloudtrack-dashboard-prod-YOURNAME`).
4. **AWS Region**: Choose your preferred region (e.g., `us-east-1` or `eu-west-1`).
5. **Block Public Access settings for this bucket**:
   - Keep **"Block all public access"** **CHECKED (ENABLED)**.
   - *Security Rule:* Never make your bucket public! CloudFront will access it privately via Origin Access Control (OAC).
6. **Bucket Versioning**: Optional (recommended for production rollbacks).
7. **Encryption**: Amazon S3-managed keys (SSE-S3).
8. Click **Create bucket**.

#### Via AWS CLI:
```bash
# Replace 'your-unique-bucket-name' and 'us-east-1' with your values
aws s3 mb s3://your-unique-bucket-name --region us-east-1
```

---

### 5.2 Upload the Contents of `out/` to S3

Upload **only the contents** of the `out/` directory, **not** the `out` folder itself:

```bash
aws s3 sync out/ s3://your-unique-bucket-name --delete
```

> **Why `--delete`?**
> The `--delete` flag removes old, orphaned files from S3 that no longer exist in your latest local build. This ensures your bucket stays clean and saves storage costs.

---

## Step 6: Configuring S3 and CloudFront with Origin Access Control (OAC)

Origin Access Control (OAC) is AWS's modern, recommended standard to secure Amazon S3 origins. It ensures that **only requests coming through your CloudFront distribution are permitted to read files from your bucket**.

### 6.1 Create the CloudFront Distribution:
1. Open the [Amazon CloudFront Console](https://console.aws.amazon.com/cloudfront/v4/home).
2. Click **Create distribution**.
3. **Origin domain**: Click the field and select your S3 bucket from the dropdown list (e.g., `your-unique-bucket-name.s3.us-east-1.amazonaws.com`).
4. **Origin access**:
   - Select **Origin access control settings (recommended)**.
   - Click **Create new OAC**.
   - Keep default name and Signing behavior (`Sign requests (recommended)`), and click **Create**.
5. **Viewer protocol policy**:
   - Select **Redirect HTTP to HTTPS** (ensures all web traffic is encrypted).
6. **Allowed HTTP methods**:
   - Select `GET, HEAD`.
7. **Web Application Firewall (WAF)**:
   - For a learning project, select "Do not enable security protections" to stay strictly within Free Tier.
8. **Default root object**:
   - Enter: `index.html` (Crucial! See Step 7).
9. Click **Create distribution**.

---

### 6.2 Attach the OAC Bucket Policy to S3

Once the CloudFront distribution is created, a blue banner will appear in the CloudFront console stating:
> *"The S3 bucket policy needs to be updated. Copy policy."*

1. Click **Copy policy**.
2. Open your S3 bucket in the S3 Console.
3. Click the **Permissions** tab.
4. Scroll down to **Bucket policy** and click **Edit**.
5. Paste the policy:

```json
{
  "Version": "2012-10-17",
  "Statement": {
    "Sid": "AllowCloudFrontServicePrincipalReadOnly",
    "Effect": "Allow",
    "Principal": {
      "Service": "cloudfront.amazonaws.com"
    },
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*",
    "Condition": {
      "StringEquals": {
        "AWS:SourceArn": "arn:aws:cloudfront::YOUR-ACCOUNT-ID:distribution/YOUR-DISTRIBUTION-ID"
      }
    }
  }
}
```

6. Click **Save changes**.

Your S3 bucket is now locked down. Nobody can access your S3 files directly over the public internet, but CloudFront can securely fetch and cache them worldwide!

---

## Step 7: Setting the CloudFront Default Root Object

When a visitor opens `https://d1234567890.cloudfront.net/`, CloudFront needs to know which file to serve.

1. In the CloudFront console, select your distribution.
2. In the **General** tab, scroll to **Settings** and click **Edit**.
3. Scroll down to **Default root object**.
4. Enter:
   ```
   index.html
   ```
5. Click **Save changes**.

---

## Step 8: Handling 403/404 Errors and Client-Side Routing

Because S3 is an object store and not an active web server, requesting a path that doesn't exist directly on disk can result in S3 returning `403 Access Denied` (when using OAC) or `404 Not Found`.

CloudTrack solves this at two levels:
1. **`trailingSlash: true`**: Creates real files for every route (e.g. `/roadmap/index.html`, `/projects/index.html`).
2. **CloudFront Custom Error Responses**: Handles deep links and 404 fallbacks gracefully.

### Configuring Custom Error Responses:
1. In CloudFront, select your distribution.
2. Click the **Error pages** tab.
3. Click **Create custom error response**.
4. Configure Error #1 (HTTP 403):
   - **HTTP error code**: `403: Forbidden`
   - **Customize error response**: Yes
   - **Response page path**: `/index.html`
   - **HTTP Response code**: `200: OK`
   - Click **Create error response**.
5. Repeat for Error #2 (HTTP 404):
   - **HTTP error code**: `404: Not Found`
   - **Customize error response**: Yes
   - **Response page path**: `/index.html`
   - **HTTP Response code**: `200: OK`

---

## Step 9: Invalidating CloudFront Cache After Updates

CloudFront caches your files at global Edge Locations for hours or days. When you make code changes, re-build, and upload new files to S3, visitors may still see the cached older version until the cache expires or is invalidated.

### Purging Cache with AWS CLI:
Whenever you deploy an update:

```bash
# 1. Re-build static output
npm run build

# 2. Sync files to S3
aws s3 sync out/ s3://your-unique-bucket-name --delete

# 3. Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

> **Note on Invalidation Costs:**
> AWS CloudFront includes **1,000 free invalidation paths per month**. Invalidation with `"/*"` counts as 1 single path and purges all files across all edge locations in minutes!

---

## Step 10: Keeping the S3 Bucket Private (Security Best Practices)

Never use the legacy "Static Website Hosting" feature on S3 for production applications because it requires disabling Block Public Access and making the entire bucket publicly readable.

### Security Checklist:
- [x] **Block All Public Access**: MUST remain **ON** on the S3 bucket.
- [x] **Bucket ACLs**: Disabled (Bucket owner enforced).
- [x] **Bucket Policy**: Restrict `s3:GetObject` strictly to `Service: cloudfront.amazonaws.com` with a condition matching your specific `AWS:SourceArn`.
- [x] **HTTPS Only**: Viewer Protocol Policy set to `Redirect HTTP to HTTPS`.

---

## Step 11: Understanding AWS Costs & Cleaning Up Resources

### Free Tier Generosity:
- **Amazon S3**: 5 GB standard storage, 20,000 GET requests, 2,000 PUT requests/month (Free for 12 months).
- **Amazon CloudFront**: 1 TB data transfer out, 10,000,000 HTTP/HTTPS requests/month (Always free).
- **Client LocalStorage**: Stored locally in the visitor's browser. **Costs $0.00** on AWS!

### Cleaning Up After Practice:
When you are done testing and want to ensure zero recurring charges:

1. **Empty and delete the S3 Bucket**:
   ```bash
   # Empty bucket contents
   aws s3 rm s3://your-unique-bucket-name --recursive

   # Delete bucket
   aws s3 rb s3://your-unique-bucket-name
   ```

2. **Disable and delete the CloudFront Distribution**:
   - In CloudFront Console, select your distribution and click **Disable**.
   - Wait 3–5 minutes until the status becomes "Disabled".
   - Select the distribution and click **Delete**.

---

## Alternative Approach: Deploying Next.js SSR with AWS Amplify Hosting

If your Next.js application requires:
- Dynamic Server-Side Rendering (SSR)
- Next.js Server Actions (`'use server'`)
- Dynamic API routes (`/api/*`)
- Dynamic request headers or cookies (`cookies()`, `headers()`)

Static export (`output: 'export'`) cannot be used. Instead, deploy using **AWS Amplify Hosting**.

### Steps to Deploy with AWS Amplify:

1. **Configure for Standard Next.js**:
   Remove `output: 'export'` from `next.config.ts`.

2. **Push to a Git Repository**:
   Push your project to GitHub, GitLab, or Bitbucket.

3. **Connect to AWS Amplify**:
   - Open the [AWS Amplify Console](https://console.aws.amazon.com/amplify/home).
   - Click **Deploy an app** (or **Host web app**).
   - Select your Git provider (e.g. GitHub) and authorize AWS.
   - Choose your repository and the `main` branch.

4. **Automatic Build Detection**:
   Amplify automatically detects Next.js SSR and provides the build specification (`amplify.yml`):
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - .next/cache/**/*
         - node_modules/**/*
   ```

5. **Deploy**:
   Click **Save and deploy**. Amplify provisions compute containers, manages CloudFront distribution, and sets up automated continuous deployment (CI/CD) on every Git push.

---

## Summary Checklist for CloudTrack Deployment

| Step | Action | Command / Location |
|---|---|---|
| 1 | Test Locally | `npm run dev` |
| 2 | Compile Static Export | `npm run build` |
| 3 | Create Private S3 Bucket | `aws s3 mb s3://<bucket-name>` |
| 4 | Upload Static Files | `aws s3 sync out/ s3://<bucket-name> --delete` |
| 5 | Create CloudFront Distribution | Select S3 Origin, Enable OAC, Default Root: `index.html` |
| 6 | Apply S3 Bucket Policy | Add OAC statement in S3 Bucket Permissions |
| 7 | Invalidate Cache on Updates | `aws cloudfront create-invalidation --distribution-id <ID> --paths "/*"` |

