import Sidebar from "../components/Sidebar";

import { User } from "../types";
import { useEffect, useState } from "react";
import { getTasksFilters } from "../api/featchApi";
import Task from "../components/Task";
import TaskList from "../components/TaskList";
import Header from "../components/Header";
import Modal from "../components/Modal";
import formatDate from "../util/formatter";

function Dashboard() {
  const [task, setTask] = useState<Array<Task>>([]);
  const [task2, setTask2] = useState<Array<Task>>([]);
  const [user, setUser] = useState<User>();
  const [isShown, setIsShown] = useState(false);

  if (sessionStorage.error !== null && sessionStorage.error !== undefined) {
    alert(sessionStorage.error);
    sessionStorage.removeItem("error");
  }

  if (sessionStorage.error === null && sessionStorage.user !== null) {
    setUser(sessionStorage.user as User);
  }

  useEffect(() => {
    console.log(history.state);
    if (task.length === 0) {
      let tasks = getTasksFilters(JSON.stringify({ endAt: formatDate(new Date(), false) }));
      setTask(tasks);
    }
  }, []);

  return (
    <div className="dashboard">
      <Modal content="createTask" isShown={isShown} handleClose={() => setIsShown(!isShown)} />
      <Sidebar user={user} handleModal={() => setIsShown(!isShown)} />
      <main className="taskList">
        {task.length != 0 ? (
          <div className="todayTask">
            <Header
              label="Today"
              getTask={(task) => {
                setTask(task);
              }}
            />
            <TaskList tasks={task} />
          </div>
        ) : undefined}
        {task2.length != 0 ? (
          <div className="tomorrowTask">
            <Header
              label="Tomorrow"
              getTask={(task2) => {
                setTask2(task2);
              }}
            />
            <TaskList tasks={task2} />
          </div>
        ) : undefined}
        {task.length == 0 && task2.length == 0 ? <div className="noTasks">Great!! You Dont Have Any Task For Today Or Tomorrow</div> : undefined}
      </main>
    </div>
  );
}

export default Dashboard;
