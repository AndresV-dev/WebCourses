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

  const [task, setTask] = useState<Array<Task>>([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [infoToCards, setinfoToCards] = useState<Array<AvailableInfoType>>([]);

  let filters = {
    collection: state.collectionId || 0,
    category: state.categoryId || 0,
    page,
    size,
  };

  useEffect(() => {
    getTasksCharts(JSON.stringify(state.categoryId != undefined ? { categories: true } : { categories: false })).then((data) => setinfoToCards(data));

    if (state.searchUtilData === undefined) {
      getTasksFilters(JSON.stringify(filters)).then((data) => setTask(data));
    }
  }, [state]);

  return (
    <MainLayout>
      <div className="todayTask">
        <AvailableInfo lista={infoToCards} />
        <Header label="general" getTask={(task) => setTask(task)} page={page} size={size} shownText={task.length == 0} search={state.searchUtilData} showCombo={state.searchUtilData != undefined} />
        <TaskList tasks={task} page={page} size={size} setPage={(page) => setPage(page)} setSize={(size) => setSize(size)} />
      </div>
    </MainLayout>
  );
}
