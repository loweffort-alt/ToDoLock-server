import { useForm } from "react-hook-form";
import { useTask } from "../context/TaskContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

// Formateo date a uno válido por mi backend
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

const TaskFormPage = () => {
  const { register, handleSubmit, setValue } = useForm();
  const { createTask, getTasks, getSingleTask, editTask } = useTask();

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const res = await getSingleTask(params.id);
        setValue("title", res.title);
        setValue("description", res.description);
        setValue("date", dayjs(res.date).utc().format("YYYY-MM-DD"));
      }
    }

    loadTask();
  }, []);

  const onSubmit = handleSubmit((data) => {
    const dataValid = {
      ...data,
      date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format(),
    };
    if (params.id) {
      editTask(params.id, dataValid);
    } else {
      createTask(dataValid);
    }
    getTasks();
    navigate("/tasks");
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md text-center">
        <h1 className="text-2xl font-bold text-center mb-4">Create new task</h1>
        <form action="" onSubmit={() => onSubmit()}>
          <div className="flex flex-col text-left">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              placeholder="Title"
              {...register("title")}
              autoFocus
              className="w-full bg-zinc-700 text-white px-4 py-2 mb-4 mt-2 rounded-md"
            />
            <label htmlFor="description">Description</label>
            <textarea
              placeholder="Description"
              {...register("description")}
              className="w-full bg-zinc-700 text-white px-4 py-2 mb-4 mt-2 rounded-md"
              rows="3"
            ></textarea>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              {...register("date")}
              className="w-full bg-zinc-700 text-white px-4 py-2 mb-4 mt-2 rounded-md"
            />
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 mt-5 rounded"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskFormPage;
