import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Task } from "../types";
import TaskList from "../components/TaskList";
import Header from "../components/Header";

export default function TasksView() {
  let { state } = useLocation();
  let filters = {
    collection: state.collectionId || 0,
    category: state.categoryId || 0,
  };

  const [task, setTask] = useState<Array<Task>>([]);
  return (
    <div>
      {task.length == 0 ? (
        <div className="todayTask">
          <Header
            label="general"
            getTask={(task) => {
              setTask(task);
            }}
          />
          <TaskList tasks={task} />
        </div>
      ) : undefined}
    </div>
  );
}
