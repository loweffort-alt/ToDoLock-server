import User from "../models/user.model.js";
import Task from "../models/tasks.model.js";

export const getTasks = async (req, res) => {
  const allTasks = await Task.find({ user: req.user.id });
  res.json(allTasks);
};

export const createTask = async (req, res) => {
  const { title, description, date } = req.body;
  const { username } = await User.findById(req.user.id);
  const newTasks = new Task({
    title,
    description,
    date,
    username: username,
    user: req.user.id,
  });
  const savedTask = await newTasks.save();
  res.json(savedTask);
};

export const getTask = async (req, res) => {
  const oneTask = await Task.findById(req.params.id);
  if (!oneTask) return res.status(404).json({ message: "Task not found" });
  res.json(oneTask);
};

export const deleteTask = async (req, res) => {
  const oneTask = await Task.findByIdAndDelete(req.params.id);
  if (!oneTask) return res.status(404).json({ message: "Task not found" });
  res.send("Delete success");
};

export const updateTask = async (req, res) => {
  const oneTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!oneTask) return res.status(404).json({ message: "Task not found" });
  res.json(oneTask);
};
