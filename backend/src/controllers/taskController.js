const taskService = require("../services/taskService");

module.exports = {
  getTasks: async (req, res) => {
    try {
      const tasks = await taskService.getTasks();
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  createTask: async (req, res) => {
    try {
      const newTask = await taskService.createTask(req.body);
      res.status(201).json(newTask);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  updateTask: async (req, res) => {
    try {
      const updated = await taskService.editTask(req.params.id, req.body);
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  deleteTask: async (req, res) => {
    try {
      const deleted = await taskService.removeTask(req.params.id);
      res.json({ success: deleted });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  reorderTasks: async (req, res) => {
    try {
      const success = await taskService.sortTasks(req.body.orderedIds);
      res.json({ success });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
