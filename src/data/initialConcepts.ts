import { AWSConcept } from '@/types';

export const AWS_CONCEPTS: AWSConcept[] = [
  {
    id: 's3',
    name: 'Amazon S3',
    fullName: 'Simple Storage Service',
    category: 'Storage',
    summary: 'Highly scalable, durable (99.999999999%) object storage designed for storing files, media assets, backups, and static website files (HTML, JS, CSS, images).',
    keyFeatures: [
      'Unlimited storage capacity with automatic scaling and zero capacity planning',
      'Bucket policies and IAM policies for granular access control',
      'Block Public Access setting keeps data secure from accidental public exposure',
      'Seamless integration with CloudFront CDN via Origin Access Control (OAC)',
    ],
    practicalExample: 'In CloudTrack, Next.js generates static production files into the `out/` folder (`index.html`, CSS, JS bundles). These files are uploaded directly to an S3 bucket which acts as our origin storehouse.',
    awsConsolePath: 'AWS Console -> Search "S3" -> Create bucket -> Enter bucket name -> Keep Block Public Access ON',
    costNotes: 'Free Tier includes 5 GB standard storage, 20,000 GET requests, and 2,000 PUT requests per month for 12 months.',
    idealFor: 'Static web hosting, media storage, document archives, data lake backups.',
  },
  {
    id: 'cloudfront',
    name: 'Amazon CloudFront',
    fullName: 'Content Delivery Network (CDN)',
    category: 'CDN',
    summary: 'A fast, secure Content Delivery Network that caches and serves static and dynamic web content from over 600 Edge Locations worldwide with low latency.',
    keyFeatures: [
      'Caches static files close to users geographically for millisecond load times',
      'Free SSL/TLS encryption certificates using AWS Certificate Manager (ACM)',
      'Origin Access Control (OAC) lets CloudFront access private S3 buckets without making the bucket public',
      'Custom Error Responses (403/404 -> /index.html) to support client-side routing',
      'DDoS mitigation built-in via integration with AWS Shield Standard',
    ],
    practicalExample: 'When a user visits your CloudTrack dashboard from London, CloudFront serves the cached HTML/JS from the London edge location instead of fetching it from an S3 bucket in us-east-1 (Virginia).',
    awsConsolePath: 'AWS Console -> CloudFront -> Create distribution -> Select S3 origin -> Enable Origin Access Control (OAC)',
    costNotes: 'Free Tier includes 1 TB of data transfer out per month and 10,000,000 HTTP/HTTPS requests perpetually.',
    idealFor: 'Global web delivery, SSL termination, DDoS protection, edge caching.',
  },
  {
    id: 'iam',
    name: 'AWS IAM',
    fullName: 'Identity & Access Management',
    category: 'Security',
    summary: 'The security backbone of AWS that controls who (authentication) can do what (authorization) across your AWS resources.',
    keyFeatures: [
      'IAM Users: Individual credentials for team members with password or access keys',
      'IAM Roles: Temporary credentials for AWS services (e.g. EC2, Lambda) or federated users',
      'JSON Policies: Documents defining permissions using Effect, Action, Resource, and Conditions',
      'Principle of Least Privilege: Grant only the minimal permissions required to accomplish a task',
    ],
    practicalExample: 'Instead of using your AWS Root account for deploying Next.js, you create a dedicated IAM user with permissions limited to `s3:PutObject`, `s3:ListBucket`, and `cloudfront:CreateInvalidation`.',
    awsConsolePath: 'AWS Console -> IAM -> Users -> Create user -> Attach policies directly',
    costNotes: 'IAM is a core security feature and is completely free of charge.',
    idealFor: 'User access control, service authentication, least-privilege security policies.',
  },
  {
    id: 'ec2',
    name: 'Amazon EC2',
    fullName: 'Elastic Compute Cloud',
    category: 'Compute',
    summary: 'On-demand, resizable virtual servers (instances) in the cloud where you have full root/administrator operating system access.',
    keyFeatures: [
      'Choice of OS: Amazon Linux 2023, Ubuntu, Debian, Red Hat, Windows Server',
      'Instance types optimized for compute, memory, storage, or general purpose',
      'Security Groups act as virtual firewalls controlling inbound and outbound network traffic',
      'Persistent block storage volumes via Amazon Elastic Block Store (EBS)',
    ],
    practicalExample: 'If your Next.js app needs a long-running Node.js server with WebSockets, background cron jobs, or custom system packages, you can run `npm start` on an EC2 instance behind an Nginx reverse proxy.',
    awsConsolePath: 'AWS Console -> EC2 -> Launch Instance -> Select Ubuntu -> Choose t2.micro / t3.micro',
    costNotes: 'Free Tier includes 750 hours/month of t2.micro or t3.micro instances for 12 months.',
    idealFor: 'Legacy applications, monolithic backends, custom Linux daemons, microservices.',
  },
  {
    id: 'lambda',
    name: 'AWS Lambda',
    fullName: 'Serverless Compute Service',
    category: 'Compute',
    summary: 'Run code without provisioning or managing servers. Code executes in response to events and charges strictly for execution time measured in milliseconds.',
    keyFeatures: [
      'Zero server administration or OS patching',
      'Automatic horizontal scaling from 0 to thousands of concurrent executions',
      'Integrates seamlessly with S3 (file triggers), API Gateway (HTTP APIs), and SQS queues',
      'Supports Node.js, Python, Go, Java, and custom container images',
    ],
    practicalExample: 'When a user uploads an image to your S3 bucket, an S3 event automatically triggers a Lambda function that resizes the image and generates thumbnails.',
    awsConsolePath: 'AWS Console -> Lambda -> Create function -> Author from scratch -> Choose Node.js 20.x',
    costNotes: 'Free Tier provides 1,000,000 free requests and 3.2 million seconds of compute time per month permanently.',
    idealFor: 'Serverless APIs, background data processing, webhooks, event automation.',
  },
  {
    id: 'amplify',
    name: 'AWS Amplify Hosting',
    fullName: 'Managed Web App Hosting & CI/CD',
    category: 'Hosting',
    summary: 'A fully managed service specifically designed for hosting dynamic and fullstack web applications like Next.js, with automated Git deployments and built-in SSR support.',
    keyFeatures: [
      'Native support for Next.js App Router, Server-Side Rendering, and Server Actions',
      'Continuous deployment automatically builds and deploys on every Git push (`git push origin main`)',
      'Instant preview branches for Pull Requests and feature testing',
      'Automated global CDN distribution and SSL certificate generation',
    ],
    practicalExample: 'When your Next.js application needs dynamic database queries at request time or server-only authentication secrets, AWS Amplify manages the compute layer without requiring Docker or manual server setup.',
    awsConsolePath: 'AWS Console -> AWS Amplify -> Host web app -> Connect GitHub repository',
    costNotes: 'Free Tier includes 1,000 build minutes/month, 5 GB stored, and 15 GB served for 12 months.',
    idealFor: 'Fullstack Next.js SSR apps, team Git workflows, rapid frontend prototyping.',
  },
];

export interface ArchitectureComparison {
  feature: string;
  staticHosting: string;
  serverSideRendering: string;
  verdict: string;
}

export const ARCHITECTURE_COMPARISONS: ArchitectureComparison[] = [
  {
    feature: 'Infrastructure Required',
    staticHosting: 'S3 Bucket + CloudFront CDN (Zero servers, zero containers)',
    serverSideRendering: 'Node.js server running in AWS Amplify, ECS Fargate, or Lambda',
    verdict: 'Static Hosting is simpler and requires zero runtime maintenance',
  },
  {
    feature: 'Monthly Cost',
    staticHosting: 'Extremely low (pennies per month, largely covered by Free Tier)',
    serverSideRendering: 'Moderate to high ($15 - $60+/month for container/server uptime)',
    verdict: 'Static hosting is 10x - 50x cheaper for low to moderate traffic',
  },
  {
    feature: 'Scalability & Traffic Spikes',
    staticHosting: 'Near-infinite instant scaling handled natively by CloudFront edge servers',
    serverSideRendering: 'Requires autoscaling policies, container spin-up, or Lambda concurrency limits',
    verdict: 'Static files handle sudden viral traffic spikes effortlessly without cold starts',
  },
  {
    feature: 'Dynamic Data & APIs',
    staticHosting: 'Fetched client-side using `useEffect`/`fetch()` or client state (LocalStorage)',
    serverSideRendering: 'Fetched on the server at request time before rendering HTML',
    verdict: 'SSR is better when dynamic content must be rendered before HTML reaches browser',
  },
  {
    feature: 'Next.js Feature Support',
    staticHosting: 'Pre-rendered pages, client components, SSG. (No Server Actions, no API routes)',
    serverSideRendering: 'Full Next.js power: Server Actions, dynamic `cookies()`, SSR, ISR, API routes',
    verdict: 'SSR is necessary if you require server-only logic, secrets, or Server Actions',
  },
  {
    feature: 'Security Surface Area',
    staticHosting: 'Virtually zero attack surface. S3 bucket is private; no executable server code',
    serverSideRendering: 'Node.js server can have runtime vulnerabilities, memory leaks, or DDoS risks',
    verdict: 'Static files are immune to server-side code execution vulnerabilities',
  },
  {
    feature: 'CloudFront Configuration',
    staticHosting: 'Default Root Object `index.html`, `trailingSlash: true`, or 403/404 error redirect',
    serverSideRendering: 'CloudFront automatically routes requests to Node.js compute origin',
    verdict: 'Static hosting requires proper trailing slash or error page routing setup',
  },
];

