import Sidebar from "../components/Sidebar";

import { User } from "../types";
import { useEffect, useState } from "react";
import Task from "../components/Task";
import TaskList from "../components/TaskList";
import Header from "../components/Header";

function Dashboard() {
  const [task, setTask] = useState<Array<Task>>([]);
  const [user, setUser] = useState<User>();

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
      fetch('http://localhost:8081/v1/tasks/list', {
      method: 'GET',
      headers: new Headers({
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + ( sessionStorage.getItem('token') !== null ? sessionStorage.getItem('token') : process.env.VITE_TOKEN)
      })
    })
    .then(response => response.json())
    .then(res => setTask(res));
  }}, [])

  return (
    <div className="dashboard">
      <Sidebar user={user}/>
      <main className="taskList">
        <Header getTask={(task) => {
          setTask(task)
        }}/>
        <TaskList tasks={task}/>
      </main>
    </div>
  );
}

export default Dashboard;
