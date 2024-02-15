import Sidebar from "../components/Sidebar";

import '../assets/css/sidebar.css';
import { User } from "../types";
import { useEffect, useState } from "react";
import Task from "../components/Task";

function Dashboard() {
  const [tasks, setTask] = useState<Array<Task>>();
  const [user, setUser] = useState<User>();

  if (sessionStorage.getItem('error') !== null || sessionStorage.getItem('error')){
    (
      alert(sessionStorage.getItem('error'))
    )
  }

  if(sessionStorage.getItem('error') === null && sessionStorage.getItem('user') !== null){
  
    console.log(sessionStorage.getItem('user') as unknown as User);
  }

  useEffect(() => {
    fetch('http://localhost:8081/v1/tasks/list', {
      method: 'GET',
      headers: new Headers({
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + ( sessionStorage.getItem('token') !== null ? sessionStorage.getItem('token') : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0IiwiZXhwIjoxNzA4MDYwNDg4LCJpYXQiOjE3MDc5NzQwODh9.gY8t5GIb1uj-pgJCUfQSCJBkN0y5XX07EI5pLE2kNqk')
      })
    })
    .then(response => response.json())
    .then(res => setTask(res));
  
  }, [])

  return (
    <div className="Dashboard">
      <Sidebar user={user}/>
    </div>
  );
}

export default Dashboard;
