import Sidebar from "../components/Sidebar";

import { Category, TaskPriority, User, UserTaskCollections } from "../types";
import { useEffect, useState } from "react";
import Task from "../components/Task";

function Dashboard() {
  const [tasks, setTask] = useState<Array<Task>>([]);
  const [user, setUser] = useState<User>();
  const [options, setOptions] = useState<Array<any>>([])
  
  function optionHandler(filter: string) {
    console.log(filter)
    switch(filter){
      case "category":
        setOptions(JSON.parse(sessionStorage.getItem("categories") || ""));
        break;
      case "priority":
        setOptions(JSON.parse(sessionStorage.getItem("priorities") || ""));
        break;
      case "collection":
        setOptions(JSON.parse(sessionStorage.getItem("collections") || ""));
        break;
    }
    console.log(options)
  }

  if (sessionStorage.getItem('error') !== null || sessionStorage.getItem('error')){
    (
      alert(sessionStorage.getItem('error'))
    )
  }

  if(sessionStorage.getItem('error') === null && sessionStorage.getItem('user') !== null){
    setUser(sessionStorage.getItem("user") as unknown as User);
  }

  useEffect(() => {
    if(tasks.length === 0){
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
        <header>
        <h1>Today</h1>
        <div className="filter"> 
          <h3>Sort By:</h3>
          <select name="sort" id="sort" defaultValue="option" onChange={(e) => optionHandler(e.target.options[e.target.selectedIndex].value)}>
            <option value="option" disabled>----- Chose Filter -----</option>
            <option value="category">Categories</option>
            <option value="priority">Priority</option>
            <option value="collection">Collections</option>
          </select>
          <select name="options" defaultValue="option" id="options">
            <option value="option" disabled>----- Chose Filter -----</option>
            {
              options.map((a, i) => {
                return <option key={i} value={a.name}>{a.name}</option>
              })
            }
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
