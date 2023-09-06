import { useTask } from "../context/TaskContext";
import { useEffect } from "react";
import TaskCard from "../components/TaskCard";

const TaskFormPage = () => {
  const { getTasks, tasks } = useTask();

  useEffect(() => {
    getTasks();
  }, []);

  if (tasks.length === 0) return <h1> No Tasks </h1>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-2">
      {tasks.map((e) => (
        <TaskCard task={e} key={e._id} />
      ))}
    </div>
  );
};

export default TaskFormPage;
