import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Task } from "../types";
import TaskList from "../components/TaskList";
import Header from "../components/Header";
import { MainLayout } from "../layout/MainLayout";
import { getTasksFilters } from "../api/featchApi";

export default function TasksView() {
  let { state } = useLocation();
  let filters = {
    collection: state.collectionId || 0,
    category: state.categoryId || 0,
  };

  const [task, setTask] = useState<Array<Task>>([]);

  useEffect(() => {
    getTasksFilters(JSON.stringify(filters)).then((data) => setTask(data));
  }, []);
  return (
    <MainLayout>
      <div>
        {task.length == 0 ? (
          <div className="todayTask">
            <Header label="general" getTask={() => {}} />
            <TaskList tasks={task} />
          </div>
        ) : undefined}
      </div>
    </MainLayout>
  );
}
