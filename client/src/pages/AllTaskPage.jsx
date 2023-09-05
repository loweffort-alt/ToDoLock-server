import { useTask } from "../context/TaskContext";
import { useEffect } from "react";
import TaskCard from "../components/TaskCard";

const TaskFormPage = () => {
  const { getTasks, tasks } = useTask();

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <ul>
        {tasks.map((e) => (
          <TaskCard task={e} key={e._id} />
        ))}
      </ul>
    </div>
  );
};

export default TaskFormPage;
