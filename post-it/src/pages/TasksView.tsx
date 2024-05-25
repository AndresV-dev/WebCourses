import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AvailableInfoType, Task } from "../types";
import TaskList from "../components/TaskList";
import Header from "../components/Header";
import AvailableInfo from "../components/AvailableInfo";
import { MainLayout } from "../layout/MainLayout";
import { getTasksFilters, getTasksCharts } from "../api/featchApi";

export default function TasksView() {
  let { state } = useLocation();
  let filters = {
    collection: state.collectionId || 0,
    category: state.categoryId || 0,
  };

  const [task, setTask] = useState<Array<Task>>([]);
  const [infoToCards, setinfoToCards] = useState<Array<AvailableInfoType>>([]);
  useEffect(() => {
    getTasksCharts(JSON.stringify(state.categoryId != undefined ? { categories: true } : { categories: false })).then((data) => setinfoToCards(data));
    getTasksFilters(JSON.stringify(filters)).then((data) => setTask(data));
  }, [state]);

  console.log("category: [" + state.categoryId + "] and collection: [" + state.collectionId + "]");
  return (
    <MainLayout>
      <div className="todayTask">
        <AvailableInfo lista={infoToCards} />
        <Header
          label="general"
          getTask={(task) => {
            setTask(task);
          }}
        />
        <TaskList tasks={task} />
      </div>
    </MainLayout>
  );
}
