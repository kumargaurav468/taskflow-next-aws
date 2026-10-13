import { LearningTask } from "@/types";

export const INITIAL_TASKS: LearningTask[] = [
  {
    id: "task-1",
    title: "Set up AWS Free Tier Account & enable MFA on Root User",
    category: "AWS Account Setup",
    dueDate: "2026-10-15",
    completed: true,
    priority: "High",
    createdAt: "2026-10-10",
  },
  {
    id: "task-2",
    title: "Install AWS CLI v2 and verify with `aws sts get-caller-identity`",
    category: "Tooling",
    dueDate: "2026-10-16",
    completed: true,
    priority: "High",
    createdAt: "2026-10-11",
  },
  {
    id: "task-3",
    title: 'Configure Next.js `output: "export"` and run local static build',
    category: "Next.js Build",
    dueDate: "2026-10-18",
    completed: false,
    priority: "High",
    createdAt: "2026-10-12",
  },
  {
    id: "task-4",
    title:
      "Create private S3 bucket and attach CloudFront Origin Access Control (OAC)",
    category: "AWS S3 & CloudFront",
    dueDate: "2026-10-20",
    completed: false,
    priority: "High",
    createdAt: "2026-10-12",
  },
  {
    id: "task-5",
    title: "Upload `out/` directory using AWS CLI sync and test CloudFront URL",
    category: "Deployment",
    dueDate: "2026-10-22",
    completed: false,
    priority: "Medium",
    createdAt: "2026-10-13",
  },
  {
    id: "task-6",
    title: "Set up CloudWatch Billing Alarm for $5 Free Tier budget threshold",
    category: "Cost Control",
    dueDate: "2026-10-25",
    completed: false,
    priority: "Medium",
    createdAt: "2026-10-13",
  },
];
