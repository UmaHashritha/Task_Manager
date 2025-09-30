import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { BACKEND_URL } from "./api";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(false);

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/tasks`);
      setTasks(response.data);
    } catch (err) {
      console.error("Error fetching tasks:", err.response || err);
    }
  };

  // Refresh tasks & notifications
  const refreshTasks = () => setRefreshFlag(!refreshFlag);

  useEffect(() => {
    fetchTasks();
  }, [refreshFlag]);

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Header with gradient */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-lavender-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          Task Manager
        </h1>
        <p className="text-lavender-500 text-lg">Organize your tasks with style</p>
      </div>

      {/* Main content with glass morphism container */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/20 backdrop-blur-lg rounded-3xl border border-white/30 shadow-2xl p-6 md:p-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left column: Add Task  */}
            <div>
              <TaskForm onTaskAdded={refreshTasks} />
            </div>

            {/* Right column: Task List */}
            <div>
              <TaskList tasks={tasks} onTaskUpdated={refreshTasks} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
