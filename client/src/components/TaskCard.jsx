import { useTask } from "../context/TaskContext";

const TaskCard = ({ task }) => {
  const { editTask, deleteTask } = useTask();

  return (
    <li className="bg-zinc-800 max-w-md w-full p-5 my-5 rounded-md">
      <header className="flex justify-between">
        <h1 className="text-xl font-bold">{task.title}</h1>
        <div className="flex gap-4">
          <button
            onClick={() => deleteTask(task._id)}
            className="bg-red-500 text-xs rounded-md px-2"
          >
            Delete
          </button>
          <button
            onClick={() => editTask(task)}
            className="bg-blue-500 text-xs rounded-md px-2"
          >
            Edit
          </button>
        </div>
      </header>
      <p className="text-slate-300">{task.description}</p>
      <div className="flex justify-between">
        <p className="text-xs text-slate-50">
          {new Date(task.date).toLocaleDateString()}
        </p>
        <p className="text-xs text-slate-50">
          {new Date(task.date).toLocaleTimeString()}
        </p>
      </div>
    </li>
  );
};

export default TaskCard;
