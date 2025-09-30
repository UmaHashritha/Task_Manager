const TaskModel = require("../models/taskModel");

module.exports = {
  getTasks: async () => await TaskModel.getAllTasks(),
  createTask: async (taskData) => await TaskModel.addTask(taskData),
  editTask: async (id, updates) => await TaskModel.updateTask(id, updates),
  removeTask: async (id) => await TaskModel.deleteTask(id),
  sortTasks: async (ids) => await TaskModel.reorderTasks(ids),
};
