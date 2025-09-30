// backend/src/models/taskModel.js
const pool = require('../db');

const Task = {
  async getAll() {
    const result = await pool.query('SELECT * FROM tasks ORDER BY due_date ASC');
    return result.rows;
  },

  async create({ title, description, due_date }) {
    const result = await pool.query(
      'INSERT INTO tasks (title, description, due_date) VALUES ($1, $2, $3) RETURNING *',
      [title, description, due_date]
    );
    return result.rows[0];
  },

  async update(id, { title, description, due_date, status }) {
    const result = await pool.query(
      'UPDATE tasks SET title = $1, description = $2, due_date = $3, status = $4 WHERE id = $5 RETURNING *',
      [title, description, due_date, status, id]
    );
    return result.rows[0];
  },

  async delete(id) {
    await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
    return { message: 'Task deleted successfully' };
  },
};

module.exports = Task;
