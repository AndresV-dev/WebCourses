import { useState, useEffect } from "react";
import TaskList from "../components/TaskList";
import Header from "../components/Header";
import { MainLayout } from "../layout/MainLayout";
import { getCategories, getCollections, getPriorities, getTasksCharts, getTasksFilters } from "../api/featchApi";
import AvailableInfo from "../components/AvailableInfo";
import { AvailableInfoType, Task as TaskType } from "../types";

function DeleteTask() {
  const [task, setTask] = useState<Array<TaskType>>([]);
  const [infoToCards, setinfoToCards] = useState<Array<AvailableInfoType>>([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);

  //Welcome Notification Variables
  if (sessionStorage.error !== null && sessionStorage.error !== undefined) {
    sessionStorage.removeItem("error");
  }

  useEffect(() => {
    getTasksCharts(JSON.stringify({ categories: false })).then((data) => setinfoToCards(data));
    getTasksFilters(JSON.stringify({ page, size })).then((data) => setTask(data));
    if (sessionStorage.user != undefined) {
      if (sessionStorage.categories === undefined) getCategories();
      if (sessionStorage.collections === undefined) getCollections();
      if (sessionStorage.priorities === undefined) getPriorities();
    }
  }, []);

  return (
    <MainLayout>
      <main className="taskList">
        <AvailableInfo lista={infoToCards} />
        {task.length != 0 ? (
          <div className="todayTask">
            <Header label="Today" getTask={(task) => setTask(task)} page={page} size={size} />
            <TaskList options={true} delete={true} className={"deleteTask"} tasks={task} page={page} size={size} setPage={(page) => setPage(page)} setSize={(size) => setSize(size)} />
          </div>
        ) : undefined}
      </main>
    </MainLayout>
  );
}

export default DeleteTask;
