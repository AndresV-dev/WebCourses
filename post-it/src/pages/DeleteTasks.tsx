import { useState, useEffect } from "react";
import TaskList from "../components/TaskList";
import Header from "../components/Header";
import { MainLayout } from "../layout/MainLayout";
import { getCategories, getCollections, getPriorities, getTasksCharts } from "../api/featchApi";
import AvailableInfo from "../components/AvailableInfo";
import Notification from "../components/Notification";
import { AvailableInfoType, User, Task as TaskType } from "../types";
import { parseJson } from "../util/functions";

function DeleteTask() {
  const [task, setTask] = useState<Array<TaskType>>([]);
  const [infoToCards, setinfoToCards] = useState<Array<AvailableInfoType>>([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  //Welcome Notification Variables
  const [isVisible, setIsVisible] = useState(false);
  const [user] = useState<User>(parseJson(sessionStorage.user) as User);
  const [infoNoti] = useState('{ "username": "' + user.username + '"}');
  const [template] = useState("welcome");

  if (sessionStorage.error !== null && sessionStorage.error !== undefined) {
    sessionStorage.removeItem("error");
  }

  useEffect(() => {
    getTasksCharts(JSON.stringify({ categories: false })).then((data) => setinfoToCards(data));
    // show the welcome Notification
    setTimeout(() => {
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    }, 300);

    if (sessionStorage.user != undefined) {
      if (sessionStorage.categories === undefined) getCategories();
      if (sessionStorage.collections === undefined) getCollections();
      if (sessionStorage.priorities === undefined) getPriorities();
    }
  }, []);

  return (
    <MainLayout>
      <Notification template={template} isVisible={isVisible} json={infoNoti} classNames="welcomeMessage" />
      <main className="taskList">
        <AvailableInfo lista={infoToCards} />
        {task.length != 0 ? (
          <div className="todayTask">
            <Header label="Today" getTask={(task) => setTask(task)} page={page} size={size} />
            <TaskList options={true} tasks={task} page={page} size={size} setPage={(page) => setPage(page)} setSize={(size) => setSize(size)} />
          </div>
        ) : undefined}
      </main>
    </MainLayout>
  );
}

export default DeleteTask;
