"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import {
  RoadmapModule,
  LearningTask,
  ActivityItem,
  ChecklistItem,
  ModuleStatus,
} from "@/types";
import { INITIAL_ROADMAP } from "@/data/initialRoadmap";
import { INITIAL_TASKS } from "@/data/initialTasks";
import { INITIAL_CHECKLIST } from "@/data/architectureSteps";

interface LearningContextType {
  modules: RoadmapModule[];
  tasks: LearningTask[];
  activities: ActivityItem[];
  checklist: ChecklistItem[];
  isHydrated: boolean;

  // Roadmap actions
  updateModuleStatus: (id: string, status: ModuleStatus) => void;

  // Task actions
  addTask: (task: {
    title: string;
    category: string;
    dueDate: string;
    priority: "Low" | "Medium" | "High";
  }) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;

  // Checklist actions
  toggleChecklistItem: (id: string) => void;

  // Stats
  totalModules: number;
  completedModules: number;
  inProgressModules: number;
  notStartedModules: number;
  progressPercentage: number;
  totalTopics: number;
  completedTopicsEstimated: number;

  // Reset
  resetToSampleData: () => void;
}

const LearningContext = createContext<LearningContextType | undefined>(
  undefined,
);

const INITIAL_ACTIVITIES: ActivityItem[] = [
  {
    id: "act-1",
    timestamp: "2 hours ago",
    title: "Completed: AWS Fundamentals",
    description:
      "Mastered global regions, availability zones, and billing setup.",
    type: "module",
  },
  {
    id: "act-2",
    timestamp: "Yesterday",
    title: "Completed: IAM Security",
    description: "Created least-privilege IAM policies and configured MFA.",
    type: "module",
  },
  {
    id: "act-3",
    timestamp: "2 days ago",
    title: "Project Started",
    description: "Explored Next.js Static Export on S3 & CloudFront.",
    type: "project",
  },
];

export function LearningProvider({ children }: { children: React.ReactNode }) {
  const [modules, setModules] = useState<RoadmapModule[]>(INITIAL_ROADMAP);
  const [tasks, setTasks] = useState<LearningTask[]>(INITIAL_TASKS);
  const [activities, setActivities] =
    useState<ActivityItem[]>(INITIAL_ACTIVITIES);
  const [checklist, setChecklist] =
    useState<ChecklistItem[]>(INITIAL_CHECKLIST);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount (hydration safe)
  useEffect(() => {
    try {
      const savedModules = localStorage.getItem("cloudtrack_roadmap");
      if (savedModules) {
        setModules(JSON.parse(savedModules));
      }

      const savedTasks = localStorage.getItem("cloudtrack_tasks");
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }

      const savedActivities = localStorage.getItem("cloudtrack_activities");
      if (savedActivities) {
        setActivities(JSON.parse(savedActivities));
      }

      const savedChecklist = localStorage.getItem("cloudtrack_checklist");
      if (savedChecklist) {
        setChecklist(JSON.parse(savedChecklist));
      }
    } catch (e) {
      console.error("Failed to load CloudTrack data from localStorage:", e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Save modules
  const updateModuleStatus = (id: string, status: ModuleStatus) => {
    setModules((prev) => {
      const target = prev.find((m) => m.id === id);
      const updated = prev.map((m) => (m.id === id ? { ...m, status } : m));
      localStorage.setItem("cloudtrack_roadmap", JSON.stringify(updated));

      if (target && target.status !== status) {
        const statusLabel =
          status === "completed"
            ? "Completed"
            : status === "in-progress"
              ? "In Progress"
              : "Not Started";

        const newActivity: ActivityItem = {
          id: `act-${Date.now()}`,
          timestamp: "Just now",
          title: `Roadmap: ${target.title}`,
          description: `Status changed to ${statusLabel}`,
          type: "module",
        };

        setActivities((prevAct) => {
          const updatedAct = [newActivity, ...prevAct.slice(0, 9)];
          localStorage.setItem(
            "cloudtrack_activities",
            JSON.stringify(updatedAct),
          );
          return updatedAct;
        });
      }

      return updated;
    });
  };

  // Add Task
  const addTask = (newTaskData: {
    title: string;
    category: string;
    dueDate: string;
    priority: "Low" | "Medium" | "High";
  }) => {
    const newTask: LearningTask = {
      id: `task-${Date.now()}`,
      ...newTaskData,
      completed: false,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setTasks((prev) => {
      const updated = [newTask, ...prev];
      localStorage.setItem("cloudtrack_tasks", JSON.stringify(updated));
      return updated;
    });

    const newActivity: ActivityItem = {
      id: `act-${Date.now()}`,
      timestamp: "Just now",
      title: "Added New Task",
      description: newTaskData.title,
      type: "task",
    };

    setActivities((prevAct) => {
      const updatedAct = [newActivity, ...prevAct.slice(0, 9)];
      localStorage.setItem("cloudtrack_activities", JSON.stringify(updatedAct));
      return updatedAct;
    });
  };

  // Toggle Task
  const toggleTask = (id: string) => {
    setTasks((prev) => {
      const updated = prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t,
      );
      localStorage.setItem("cloudtrack_tasks", JSON.stringify(updated));
      return updated;
    });
  };

  // Delete Task
  const deleteTask = (id: string) => {
    setTasks((prev) => {
      const updated = prev.filter((t) => t.id !== id);
      localStorage.setItem("cloudtrack_tasks", JSON.stringify(updated));
      return updated;
    });
  };

  // Toggle Checklist
  const toggleChecklistItem = (id: string) => {
    setChecklist((prev) => {
      const updated = prev.map((c) =>
        c.id === id ? { ...c, completed: !c.completed } : c,
      );
      localStorage.setItem("cloudtrack_checklist", JSON.stringify(updated));
      return updated;
    });
  };

  // Reset to default sample data
  const resetToSampleData = () => {
    localStorage.removeItem("cloudtrack_roadmap");
    localStorage.removeItem("cloudtrack_tasks");
    localStorage.removeItem("cloudtrack_activities");
    localStorage.removeItem("cloudtrack_checklist");
    setModules(INITIAL_ROADMAP);
    setTasks(INITIAL_TASKS);
    setActivities(INITIAL_ACTIVITIES);
    setChecklist(INITIAL_CHECKLIST);
  };

  // Computed statistics
  const totalModules = modules.length;
  const completedModules = useMemo(
    () => modules.filter((m) => m.status === "completed").length,
    [modules],
  );
  const inProgressModules = useMemo(
    () => modules.filter((m) => m.status === "in-progress").length,
    [modules],
  );
  const notStartedModules = useMemo(
    () => modules.filter((m) => m.status === "not-started").length,
    [modules],
  );

  const totalTopics = useMemo(
    () => modules.reduce((acc, m) => acc + m.topics.length, 0),
    [modules],
  );

  const completedTopicsEstimated = useMemo(() => {
    return modules.reduce((acc, m) => {
      if (m.status === "completed") return acc + m.topics.length;
      if (m.status === "in-progress")
        return acc + Math.round(m.topics.length * 0.5);
      return acc;
    }, 0);
  }, [modules]);

  const progressPercentage = useMemo(() => {
    if (totalModules === 0) return 0;
    // Weighted progress: completed is 100%, in-progress is 40%
    const score = modules.reduce((acc, m) => {
      if (m.status === "completed") return acc + 1;
      if (m.status === "in-progress") return acc + 0.4;
      return acc;
    }, 0);
    return Math.min(100, Math.round((score / totalModules) * 100));
  }, [modules, totalModules]);

  return (
    <LearningContext.Provider
      value={{
        modules,
        tasks,
        activities,
        checklist,
        isHydrated,
        updateModuleStatus,
        addTask,
        toggleTask,
        deleteTask,
        toggleChecklistItem,
        totalModules,
        completedModules,
        inProgressModules,
        notStartedModules,
        progressPercentage,
        totalTopics,
        completedTopicsEstimated,
        resetToSampleData,
      }}>
      {children}
    </LearningContext.Provider>
  );
}

export function useLearning() {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error("useLearning must be used within a LearningProvider");
  }
  return context;
}
