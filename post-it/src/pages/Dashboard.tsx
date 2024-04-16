import Sidebar from "../components/Sidebar";

import { useState, useEffect } from "react";
import Task from "../components/Task";
import TaskList from "../components/TaskList";
import Header from "../components/Header";
import { getCategories, getCollections, getPriorities } from "../api/featchApi";

function Dashboard() {
  const [task, setTask] = useState<Array<Task>>([]);
  const [task2, setTask2] = useState<Array<Task>>([]);

  if (sessionStorage.error !== null && sessionStorage.error !== undefined) {
    sessionStorage.removeItem("error");
  }

  useEffect(() => {
    console.log(sessionStorage.user);
    if (sessionStorage.user != undefined) {
      if (sessionStorage.categories) getCategories();
      if (sessionStorage.collections) getCollections();
      if (sessionStorage.priorities) getPriorities();
    }
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />
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
