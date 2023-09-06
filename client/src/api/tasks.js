import instance from "./axios.js";

export const getTasksRequest = () => instance.get(`/tasks`);

export const createTaskRequest = (task) => instance.post(`/tasks`, task);

export const updateTaskRequest = (id, newTask) =>
  instance.put(`/tasks/${id}`, newTask);

export const deleteTaskRequest = (id) => instance.delete(`/tasks/${id}`);

export const getSingleTaskRequest = (id) => instance.get(`/tasks/${id}`);
