const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware to parse JSON

// In-memory tasks array
let tasks = [
    { id: 1, name: "Learn Node.js", completed: false },
    { id: 2, name: "Build an API", completed: false }
];

// GET /api/tasks - Returns all tasks
app.get("/api/tasks", (req, res) => {
    res.status(200).json(tasks);
});

// POST /api/tasks - Adds a new task
app.post("/api/tasks", (req, res) => {
    const { name } = req.body;
    
    if (!name) {
        return res.status(400).json({ error: "Task name is required" });
    }

    const newTask = {
        id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
        name,
        completed: false
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
});

// DELETE /api/tasks/:id - Deletes a task by ID
app.delete("/api/tasks/:id", (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({ error: "Task not found" });
    }

    tasks.splice(taskIndex, 1);
    res.status(200).json({ message: "Task deleted successfully" });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
