"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { useLearning } from "@/context/LearningContext";
import {
  Plus,
  Trash2,
  CheckCircle2,
  Circle,
  Calendar,
  Tag,
  CheckSquare,
  AlertCircle,
} from "lucide-react";
import { PriorityLevel } from "@/types";

export function TaskManager() {
  const { tasks, addTask, toggleTask, deleteTask, isHydrated } = useLearning();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskCategory, setTaskCategory] = useState("AWS Deployment");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [taskPriority, setTaskPriority] = useState<PriorityLevel>("Medium");
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    addTask({
      title: taskTitle.trim(),
      category: taskCategory || "General",
      dueDate: taskDueDate || new Date().toISOString().split("T")[0],
      priority: taskPriority,
    });

    setTaskTitle("");
    setTaskDueDate("");
    setTaskPriority("Medium");
    setIsModalOpen(false);
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === "pending") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CheckSquare className="w-5 h-5 text-amber-500" />
          <CardTitle>Upcoming Learning Tasks</CardTitle>
          <Badge variant="neutral" size="sm">
            {completedCount}/{tasks.length} Done
          </Badge>
        </div>
        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          <div className="inline-flex rounded-lg bg-slate-100 dark:bg-slate-800 p-0.5 text-xs">
            <button
              onClick={() => setFilter("all")}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                filter === "all"
                  ? "bg-white dark:bg-slate-700 font-semibold text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}>
              All
            </button>
            <button
              onClick={() => setFilter("pending")}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                filter === "pending"
                  ? "bg-white dark:bg-slate-700 font-semibold text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}>
              Pending
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                filter === "completed"
                  ? "bg-white dark:bg-slate-700 font-semibold text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}>
              Done
            </button>
          </div>

          <Button
            size="sm"
            variant="aws"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setIsModalOpen(true)}>
            Add Task
          </Button>
        </div>
      </CardHeader>

      {/* Task List Content */}
      <div className="space-y-2.5 flex-1 overflow-y-auto max-h-[380px] pr-1">
        {!isHydrated ? (
          <div className="py-8 text-center text-sm text-slate-400">
            Loading tasks...
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="py-10 text-center space-y-2">
            <AlertCircle className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto" />
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
              No tasks found in this view
            </p>
            <p className="text-xs text-slate-400">
              Click &quot;Add Task&quot; above to create a personal deployment
              milestone!
            </p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`group flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                task.completed
                  ? "bg-slate-50/60 dark:bg-slate-900/40 border-slate-200/50 dark:border-slate-800/50 opacity-75"
                  : "bg-white dark:bg-slate-800/60 border-slate-200/80 dark:border-slate-700/60 hover:border-amber-300 dark:hover:border-amber-700/60"
              }`}>
              <div className="flex items-start gap-3 min-w-0">
                <button
                  onClick={() => toggleTask(task.id)}
                  className="mt-0.5 text-slate-400 hover:text-amber-500 dark:text-slate-500 dark:hover:text-amber-400 transition-colors shrink-0"
                  aria-label={
                    task.completed
                      ? "Mark task as incomplete"
                      : "Mark task as completed"
                  }>
                  {task.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                </button>
                <div className="min-w-0">
                  <p
                    className={`text-sm font-medium text-slate-900 dark:text-slate-100 truncate ${
                      task.completed
                        ? "line-through text-slate-400 dark:text-slate-500"
                        : ""
                    }`}>
                    {task.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-xs text-slate-500 dark:text-slate-400 flex-wrap">
                    <span className="flex items-center gap-1">
                      <Tag className="w-3 h-3 text-slate-400" />
                      {task.category}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      Due {task.dueDate}
                    </span>
                    <Badge
                      size="sm"
                      variant={
                        task.priority === "High"
                          ? "danger"
                          : task.priority === "Medium"
                            ? "warning"
                            : "neutral"
                      }>
                      {task.priority}
                    </Badge>
                  </div>
                </div>
              </div>

              <button
                onClick={() => deleteTask(task.id)}
                className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-all shrink-0 ml-2"
                aria-label="Delete task">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Add Task Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Personal Learning Task">
        <form onSubmit={handleCreateTask} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
              Task Title *
            </label>
            <input
              type="text"
              required
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="e.g. Set up Route 53 alias record to CloudFront"
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                Category
              </label>
              <input
                type="text"
                value={taskCategory}
                onChange={(e) => setTaskCategory(e.target.value)}
                placeholder="e.g. S3 Storage"
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                Due Date
              </label>
              <input
                type="date"
                value={taskDueDate}
                onChange={(e) => setTaskDueDate(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
              Priority
            </label>
            <div className="flex gap-2">
              {(["Low", "Medium", "High"] as PriorityLevel[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setTaskPriority(p)}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                    taskPriority === p
                      ? p === "High"
                        ? "bg-rose-500 text-white border-rose-500"
                        : p === "Medium"
                          ? "bg-amber-500 text-slate-950 border-amber-500"
                          : "bg-slate-700 text-white border-slate-700"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700"
                  }`}>
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="aws" size="sm">
              Save Task
            </Button>
          </div>
        </form>
      </Modal>
    </Card>
  );
}
