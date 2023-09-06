import { useForm } from "react-hook-form";
import { useTask } from "../context/TaskContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

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
      }
    }

    loadTask();
  }, []);

  const onSubmit = handleSubmit((data) => {
    if (params.id) {
      editTask(params.id, data);
    } else {
      createTask(data);
    }
    getTasks();
    navigate("/tasks");
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md text-center">
        <h1 className="text-2xl font-bold text-center mb-4">Create new task</h1>
        <form action="" onSubmit={() => onSubmit()}>
          <div className="flex-col gap-3">
            <input
              type="text"
              placeholder="Title"
              {...register("title")}
              autoFocus
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
            />
            <textarea
              id=""
              name=""
              placeholder="Description"
              {...register("description")}
              className="w-full bg-zinc-700 text-white px-4 py-2 mt-2 rounded-md"
              rows="3"
            ></textarea>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
