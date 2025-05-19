import { Task } from "./models/task";

export const tasks: Task[] = [
  {
    id: "1",
    name: "Task 1",
    description: "Description for Task 1",
    status: "pending",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "Task 2",
    description: "Description for Task 2",
    status: "in-progress",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    name: "Task 3",
    description: "Description for Task 3",
    status: "completed",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
