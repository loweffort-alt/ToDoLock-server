import { useTask } from "../context/TaskContext";
import { useEffect } from "react";

const TaskFormPage = () => {
  const { getTasks, tasks } = useTask();

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <ul>
        {tasks.map((e) => (
          <li key={e._id}>
            <h1>{e.title}</h1>
            <p>{e.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskFormPage;
