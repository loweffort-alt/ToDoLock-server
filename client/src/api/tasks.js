import instance from "./axios.js";

export const getTasksRequest = () => instance.get(`/tasks`);

export const createTaskRequest = (task) => instance.post(`/tasks`, task);

export const updateTaskRequest = (task) =>
  instance.put(`/tasks/${task._id}`, task);

export const deleteTaskRequest = (id) => instance.delete(`/tasks/${id}`);

export const getSingleTaskRequest = (id) => instance.put(`/tasks/${id}`);
