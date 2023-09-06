import { useNavigate } from "react-router-dom";
import { useTask } from "../context/TaskContext";

import days from "dayjs";
import utc from "dayjs/plugin/utc";
days.extend(utc);

const TaskCard = ({ task }) => {
  const { deleteTask } = useTask();
  const navigate = useNavigate();

  return (
    <div className="bg-zinc-800 max-w-md w-full p-5 my-5 rounded-md">
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
            onClick={() => navigate(`/tasks/${task._id}`)}
            className="bg-blue-500 text-xs rounded-md px-2"
          >
            Edit
          </button>
        </div>
      </header>
      <p className="text-slate-300">{task.description}</p>
      <div className="flex justify-between">
        <p className="text-xs text-slate-50">
          {days(task.date).utc().format("DD/MM/YYYY")}
        </p>
        <p className="text-xs text-slate-50">
          {days(task.date).utc().local().format("HH:mm")}
        </p>
      </div>
    </div>
  );
};

export default TaskCard;
