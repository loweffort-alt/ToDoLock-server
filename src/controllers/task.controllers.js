import User from "../models/user.model.js";
import Task from "../models/tasks.model.js";

//TODO: Terminar el manejo de errores, enviarlo en un array para hacer un map desde el frontend

export const getTasks = async (req, res) => {
  try {
    const allTasks = await Task.find({ user: req.user.id });
    res.json(allTasks);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const createTask = async (req, res) => {
  try {
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
  } catch (error) {
    return res.status(404).send(error.message);
  }
};

export const getTask = async (req, res) => {
  try {
    const oneTask = await Task.findById(req.params.id);
    if (!oneTask) return res.status(404).json({ message: "Task not found" });
    res.json(oneTask);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const deleteTask = async (req, res) => {
  try {
    const oneTask = await Task.findByIdAndDelete(req.params.id);
    if (!oneTask) return res.status(404).json({ message: "Task not found" });
    res.send("Delete success");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const updateTask = async (req, res) => {
  try {
    const oneTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!oneTask) return res.status(404).json({ message: "Task not found" });
    res.json(oneTask);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
