import Sidebar from "../components/Sidebar";

import { User } from "../types";
import { useEffect, useState } from "react";
import Task from "../components/Task";

function Dashboard() {
  const [tasks, setTask] = useState<Array<Task>>([]);
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
  }, [])

  return (
    <div className="dashboard">
      <Sidebar user={user}/>
      <main className="taskList">
        <header>
        <h1>Today</h1>
        <div className="filter"> 
          <h3>Sort By:</h3>
          <select name="sort" id="sort">
            <option value=""></option>
          </select>
        </div>
        </header>
        <div className="todayTasks">
        {
            tasks.map((task, i) => {
              return(
                <Task id={i} title={task.title} description={task.description} endAt={task.endAt} categoryId={task.categoryId} />
              )
            })
          }
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
