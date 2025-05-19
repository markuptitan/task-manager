import express, { Request, Response } from "express";
import { tasks } from "./tasks";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/tasks", (req: Request, res: Response) => {
  res.json(tasks);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
