import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AvailableInfoType, Task } from "../types";
import TaskList from "../components/TaskList";
import Header from "../components/Header";
import AvailableInfo from "../components/AvailableInfo";
import { MainLayout } from "../layout/MainLayout";
import { getTasksFilters, getTasksCharts } from "../api/featchApi";
import formatDate from "../util/formatter";

export default function Others() {
  let { state } = useLocation();
  let filters = {
    collection: state.collectionId || 0,
    category: state.categoryId || 0,
    createdAt: formatDate(new Date(), false),
  };

  const [task, setTask] = useState<Array<Task>>([]);
  const [infoToCards, setinfoToCards] = useState<Array<AvailableInfoType>>([]);
  useEffect(() => {
    getTasksCharts(JSON.stringify(state.categoryId != undefined ? { categories: true } : { categories: false })).then((data) => setinfoToCards(data));
    getTasksFilters(JSON.stringify(filters)).then((data) => setTask(data));
  }, [state]);

  return (
    <MainLayout>
      <div className="todayTask">
        <AvailableInfo lista={infoToCards} />
        <Header
          label="Search Tasks"
          greaterThanToday={true}
          getTask={(task) => {
            setTask(task);
          }}
          shownText={task.length == 0}
        />
        <TaskList tasks={task} />
      </div>
    </MainLayout>
  );
}
