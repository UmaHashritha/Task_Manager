const express = require("express");
const router = express.Router();
const pool = require("../db");

// Add new task
router.post("/", async (req, res) => {
  try {
    const { title, description, due_date, due_time, priority } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: "Title and description are required" });
    }

    const result = await pool.query(
      `INSERT INTO tasks (title, description, due_date, due_time, priority, is_completed, task_order)
       VALUES ($1, $2, $3, $4, $5, false, (SELECT COALESCE(MAX(task_order),0)+1 FROM tasks))
       RETURNING *`,
      [title, description, due_date || null, due_time || null, priority || "Low"]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all tasks
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM tasks ORDER BY is_completed, task_order`
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete task
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
    res.json({ message: "Task deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update completion status
router.put("/:id/complete", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "UPDATE tasks SET is_completed = true WHERE id = $1 RETURNING *",
      [id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update task order after drag-drop
router.put("/reorder", async (req, res) => {
  try {
    const { orderedIds } = req.body; // array of task IDs in new order
    for (let i = 0; i < orderedIds.length; i++) {
      await pool.query("UPDATE tasks SET task_order = $1 WHERE id = $2", [i + 1, orderedIds[i]]);
    }
    res.json({ message: "Order updated" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;