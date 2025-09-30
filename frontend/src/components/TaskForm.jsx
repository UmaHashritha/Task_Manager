import React, { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../api";

const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("Title is required");
    if (!description.trim()) return alert("Description is required");

    const dueDateTime = dueDate
      ? dueTime
        ? `${dueDate}T${dueTime}`
        : `${dueDate}T00:00`
      : null;

    try {
      await axios.post(`${BACKEND_URL}/api/tasks`, {
        title,
        description,
        priority,
        due_date: dueDateTime,
      });
      onTaskAdded();
      setTitle("");
      setDescription("");
      setPriority("medium");
      setDueDate("");
      setDueTime("");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Failed to add task");
    }
  };

  return (
    <div className="bg-white/30 backdrop-blur-md rounded-2xl border border-white/40 shadow-xl p-6">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-lavender-600 to-purple-600 bg-clip-text text-transparent mb-6">
        ✨ Add New Task
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <input
            type="text"
            placeholder="Task title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-white/50 backdrop-blur-sm border border-lavender-200 rounded-xl p-4 focus:ring-2 focus:ring-lavender-400 focus:border-transparent transition-all placeholder-lavender-400"
          />
        </div>
        
        <div>
          <textarea
            placeholder="Task description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
            className="w-full bg-white/50 backdrop-blur-sm border border-lavender-200 rounded-xl p-4 focus:ring-2 focus:ring-lavender-400 focus:border-transparent transition-all placeholder-lavender-400 resize-none"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="bg-white/50 backdrop-blur-sm border border-lavender-200 rounded-xl p-4 focus:ring-2 focus:ring-lavender-400 focus:border-transparent transition-all"
          >
            <option value="high">🔴 High Priority</option>
            <option value="medium">🟡 Medium Priority</option>
            <option value="low">🟢 Low Priority</option>
          </select>
          
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="bg-white/50 backdrop-blur-sm border border-lavender-200 rounded-xl p-4 focus:ring-2 focus:ring-lavender-400 focus:border-transparent transition-all"
          />
          
          <input
            type="time"
            value={dueTime}
            onChange={(e) => setDueTime(e.target.value)}
            className="bg-white/50 backdrop-blur-sm border border-lavender-200 rounded-xl p-4 focus:ring-2 focus:ring-lavender-400 focus:border-transparent transition-all"
          />
        </div>
        
        <button className="w-full bg-gradient-to-r from-lavender-500 to-purple-600 hover:from-lavender-600 hover:to-purple-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl">
          Add Task ✨
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
