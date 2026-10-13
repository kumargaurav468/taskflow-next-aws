export type ModuleStatus = "not-started" | "in-progress" | "completed";

export type DifficultyLevel = "Beginner" | "Intermediate" | "Advanced";

export type PriorityLevel = "Low" | "Medium" | "High";

export interface RoadmapModule {
  id: string;
  title: string;
  category: string;
  description: string;
  duration: string;
  difficulty: DifficultyLevel;
  topics: string[];
  status: ModuleStatus;
  awsServices: string[];
  keyCommands?: string[];
  docLink?: string;
}

export interface DeploymentProject {
  id: string;
  title: string;
  category: string;
  description: string;
  architecture: string;
  difficulty: DifficultyLevel;
  estimatedTime: string;
  learningObjectives: string[];
  tags: string[];
  steps: string[];
  pros: string[];
  cons: string[];
  awsServices: string[];
}

export interface LearningTask {
  id: string;
  title: string;
  category: string;
  dueDate: string;
  completed: boolean;
  priority: PriorityLevel;
  createdAt: string;
}

export interface ActivityItem {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  type: "module" | "project" | "task" | "system";
}

export interface AWSConcept {
  id: string;
  name: string;
  fullName: string;
  category:
    | "Storage"
    | "CDN"
    | "Compute"
    | "Security"
    | "Hosting"
    | "Networking";
  summary: string;
  keyFeatures: string[];
  practicalExample: string;
  awsConsolePath: string;
  costNotes: string;
  idealFor: string;
}

export interface DeploymentStep {
  stepNumber: number;
  id: string;
  title: string;
  subtitle: string;
  description: string;
  role: string;
  keyArtifacts: string[];
  terminalCommands?: string[];
  awsConsoleAction?: string;
  bestPractices: string[];
}

export interface ChecklistItem {
  id: string;
  category:
    | "Preparation"
    | "Build"
    | "S3 Bucket"
    | "CloudFront"
    | "Testing & Maintenance";
  title: string;
  description: string;
  completed: boolean;
  critical: boolean;
}
