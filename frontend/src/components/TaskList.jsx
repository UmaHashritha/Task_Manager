import React, { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../api";

const TaskList = ({ tasks, onTaskUpdated }) => {
  const [sortBy, setSortBy] = useState("due_date");

  const completeTask = async (id) => {
    try {
      await axios.put(`${BACKEND_URL}/api/tasks/${id}/complete`);
      onTaskUpdated();
    } catch (err) {
      console.error("Error completing task:", err.response || err);
      alert("Failed to complete task. Please try again.");
    }
  };

  const deleteTask = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await axios.delete(`${BACKEND_URL}/api/tasks/${id}`);
      onTaskUpdated();
    } catch (err) {
      console.error("Error deleting task:", err.response || err);
      alert("Failed to delete task");
    }
  };

  // Separate incomplete and completed tasks
  const incompleteTasks = tasks.filter((task) => !task.is_completed);
  const completedTasks = tasks.filter((task) => task.is_completed);

  // Sort incomplete tasks
  let sortedIncomplete = [...incompleteTasks];
  if (sortBy === "due_date") {
    sortedIncomplete.sort(
      (a, b) => new Date(a.due_date) - new Date(b.due_date)
    );
  } else if (sortBy === "priority") {
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    sortedIncomplete.sort(
      (a, b) => (priorityOrder[a.priority] || 4) - (priorityOrder[b.priority] || 4)
    );
  }

  const sortedTasks = [...sortedIncomplete, ...completedTasks];

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "high":
        return "bg-gradient-to-r from-red-400 to-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md";
      case "medium":
        return "bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md";
      case "low":
        return "bg-gradient-to-r from-green-400 to-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md";
      default:
        return "bg-gradient-to-r from-gray-400 to-gray-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md";
    }
  };

  const formatLocalDate = (isoString) => {
    if (!isoString) return "No due date";
    const date = new Date(isoString);
    return date.toLocaleString();
  };

  const getDueDateBadge = (task) => {
    if (!task.due_date) return "bg-gradient-to-r from-gray-300 to-gray-400 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold";
    const date = new Date(task.due_date);
    const now = new Date();
    const isOverdue = date < now && !task.is_completed;
    return `px-3 py-1 rounded-full text-xs font-semibold shadow-md ${
      isOverdue 
        ? "bg-gradient-to-r from-red-500 to-red-600 text-white animate-pulse" 
        : "bg-gradient-to-r from-blue-400 to-blue-500 text-white"
    }`;
  };

  return (
    <div className="bg-white/30 backdrop-blur-md rounded-2xl border border-white/40 shadow-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-lavender-600 to-purple-600 bg-clip-text text-transparent">
          📋 Your Tasks
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-lavender-600 font-medium">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white/50 backdrop-blur-sm border border-lavender-200 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-lavender-400 focus:border-transparent"
          >
            <option value="due_date">Due Date</option>
            <option value="priority">Priority</option>
          </select>
        </div>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {sortedTasks.map((task) => (
          <div
            key={task.id}
            className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:scale-[1.02] ${
              task.is_completed
                ? "bg-white/20 border-gray-300/50 opacity-60"
                : "bg-gradient-to-br from-white/60 to-lavender-50/60 border-lavender-200/50 shadow-lg hover:shadow-xl"
            }`}
          >
            <div className="p-5">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className={`text-lg font-semibold mb-2 ${
                    task.is_completed ? "text-gray-500 line-through" : "text-gray-800"
                  }`}>
                    {task.title}
                  </h3>
                  <p className={`text-sm mb-3 ${
                    task.is_completed ? "text-gray-400" : "text-gray-600"
                  }`}>
                    {task.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className={getDueDateBadge(task)}>
                      📅 {formatLocalDate(task.due_date)}
                    </span>
                    <span className={getPriorityBadge(task.priority)}>
                      {task.priority === 'high' ? '🔴' : task.priority === 'medium' ? '🟡' : '🟢'} {task.priority || "medium"}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 shrink-0">
                  {!task.is_completed && (
                    <button
                      onClick={() => completeTask(task.id)}
                      className="bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                    >
                      ✓ Complete
                    </button>
                  )}
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {sortedTasks.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <p className="text-lavender-500 text-lg font-medium">No tasks yet!</p>
            <p className="text-lavender-400 text-sm">Create your first task to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;
