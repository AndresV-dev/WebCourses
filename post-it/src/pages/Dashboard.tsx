import Sidebar from "../components/Sidebar";

import { User } from "../types";
import { useEffect, useState } from "react";
import Task from "../components/Task";
import Button from "../components/Button";

function Dashboard() {
  const [tasks, setTask] = useState<Array<Task>>([]);
  const [user, setUser] = useState<User>();
  const [options, setOptions] = useState<Array<any>>([]);

  const [filter, setFilter] = useState({
    sortBy: "",
    value: ""
  });
  
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

  function searchTask(){
    let body = {
      [filter.sortBy] : filter.value
    }

    fetch('http://localhost:8081/v1/tasks/list/filtered', {
      method: 'POST',
      headers: new Headers({
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + ( sessionStorage.getItem('token') !== null ? sessionStorage.getItem('token') : process.env.VITE_TOKEN)
      }),
      body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(res => setTask(res))
    .catch(error => alert(error));
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
        <header className="header-dashboard">
        <h1>Today</h1>
        <div className="filter"> 
          <h2>Sort By:</h2>
          <div>
            <select name="sort" id="sort" defaultValue="option" onChange={(e) => {optionHandler(e.target.options[e.target.selectedIndex].value); setFilter({...filter, sortBy:e.target.options[e.target.selectedIndex].value})
            }}>
              <option value="option" disabled hidden>----- Chose Filter -----</option>
              <option value="category">Categories</option>
              <option value="priority">Priority</option>
              <option value="collection">Collections</option>
            </select>
            <select name="options" defaultValue="option" id="options" onChange={(e) => {setFilter({...filter, value:e.target.options[e.target.selectedIndex].value})
            }}>
              <option value="option" disabled hidden>----- Chose Filter -----</option>
              {
                options.map((value, i) => {
                  return <option key={i} value={value.id}>{value.name}</option>
                })
              }
            </select>
            <Button label={"Search"} type="button" className={"search-button"} onClick={() => searchTask()}/>
          </div>
        </div>
        </header>
        <div className="todayTasks">
        {
            tasks.map((task, i) => {
              return(
                <Task key={i} task={task} />
              )
            })
          }
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
