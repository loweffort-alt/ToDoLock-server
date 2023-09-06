import { createContext, useContext, useState } from "react";
import {
  createTaskRequest,
  deleteTaskRequest,
  getSingleTaskRequest,
  getTasksRequest,
  updateTaskRequest,
} from "../api/tasks";

const TaskContext = createContext();

export const useTask = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTask must be used within a TaskProvider");
  }

  return context;
};

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    try {
      const res = await getTasksRequest();
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSingleTask = async (id) => {
    try {
      const res = await getSingleTaskRequest(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const createTask = async (task) => {
    try {
      await createTaskRequest(task);
      const res = await getTasksRequest();
      setTasks(res.data);
    } catch (error) {
      console.log("wea", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      console.log("ptmrr", id);
      await deleteTaskRequest(id);
      const res = await getTasksRequest();
      setTasks(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const editTask = async (id, newTask) => {
    try {
      const res = await updateTaskRequest(id, newTask);
      console.log(res);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        getTasks,
        createTask,
        deleteTask,
        editTask,
        getSingleTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
