import Sidebar from "../components/Sidebar";

import { User } from "../types";
import { useEffect, useState } from "react";
import formatDate from "../util/formatter";
import Task from "../components/Task";
import TaskList from "../components/TaskList";
import Header from "../components/Header";
import Modal from "../components/Modal";

function Dashboard() {
  const [task, setTask] = useState<Array<Task>>([]);
  const [task2, setTask2] = useState<Array<Task>>([]);
  const [user, setUser] = useState<User>();
  const [isShown, setIsShown] = useState(false);

  if (sessionStorage.getItem('error') !== null || sessionStorage.getItem('error')){
    (
      alert(sessionStorage.getItem('error'))
    )
  }

  if(sessionStorage.getItem('error') === null && sessionStorage.getItem('user') !== null){
    setUser(sessionStorage.getItem("user") as unknown as User);
  }

  useEffect(() => {
    if(task.length === 0){
      fetch('http://localhost:8081/v1/tasks/list/filtered', {
      method: 'POST',
      headers: new Headers({
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + ( sessionStorage.getItem('token') !== null ? sessionStorage.getItem('token') : process.env.VITE_TOKEN)
      }),
      body: JSON.stringify({ "endAt": formatDate(new Date(), false)})
    })
    .then(response => response.json())
    .then(res => setTask(res));
  }}, [])

  return (
    <div className="dashboard">
      <Modal content="createTask" isShown={isShown} handleClose={() => setIsShown(!isShown)}/>
      <Sidebar user={user} handleModal={() => setIsShown(!isShown)}/>
      <main className="taskList">
        {
          task.length != 0 ? 
          <div className="todayTask">
            <Header label="Today" getTask={(task) => {
              setTask(task)
              }}/>
            <TaskList tasks={task}/>
          </div> : undefined
        }
        {
          task2.length != 0 ? 
            <div className="tomorrowTask">
              <Header label="Tomorrow" getTask={(task2) => {
                setTask2(task2)
                }}/>
              <TaskList tasks={task2}/>
            </div>
           : undefined
        }
        {
          task.length == 0 && task2.length == 0 ? 
          <div className="noTasks">
            Great!! You Dont Have Any Task For Today Or Tomorrow
          </div> : undefined
        }
      </main>
    </div>
  );
}

export default Dashboard;
