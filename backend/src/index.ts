import express, { Request, Response } from "express";
import { tasks } from "./tasks";
import { Task } from "./models/task";
import { v4 as uuidv4 } from "uuid";

interface CreateTaskBody {
  name: string;
  description: string;
}

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/tasks", (req: Request, res: Response) => {
  res.json(tasks);
});

app.get("/task/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  return res.json(task);
});

app.post("/tasks", (req: Request, res: Response) => {
  const { name, description } = req.body;

  const invalid = [name, description].some(
    (element) => typeof element !== "string" || element.trim() === ""
  );

  if (invalid) {
    return res.status(400).json({ message: "Invalid task data" });
  }

  const duplicate = tasks.some(
    (task) =>
      task.name.toLowerCase() === name.toLowerCase() ||
      task.description.toLowerCase() === description.toLowerCase()
  );

  if (duplicate) {
    return res
      .status(409)
      .json({ message: "Task with same name or description already exists" });
  }

  const newTask: Task = {
    id: uuidv4(),
    name,
    description,
    status: "pending",
    createdAt: new Date(),
  };

  tasks.push(newTask);

  return res.status(201).json(newTask);
});

app.put("/task/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, status } = req.body;

  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  const updatedTask: Task = {
    ...tasks[taskIndex],
    name,
    description,
    status,
    updatedAt: new Date(),
  };

  tasks[taskIndex] = updatedTask;

  return res.json(updatedTask);
});

app.delete("/task/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  tasks.splice(taskIndex, 1);

  return res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
