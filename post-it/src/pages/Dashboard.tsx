import Sidebar from "../components/Sidebar";

import '../assets/css/sidebar.css';
import { User } from "../types";
import { useEffect, useState } from "react";
import Task from "../components/Task";

function Dashboard() {
  const [tasks, setTask] = useState<Array<Task>>();

  const user: User = {
    id: 1,
    uuid: "UD25F-6DH21-1JNHD-143H",
    role: 'ADMIN',
    name: "Andres",
    lastname: "Vargas",
    age: 26,
    email: "avargas@gmail.com",
    username: "AndresVargas",
    password: "hjsdgfhjsdj32476jknsadbf",
    created_at: new Date(),
    userImage: "https://cdn-icons-png.flaticon.com/512/6326/6326055.png"
  } 

  useEffect(() => {
    fetch('http://localhost:8081/v1/tasks/list', {
      method: 'GET',
      headers: new Headers({
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0IiwiZXhwIjoxNzA3OTY2NjI0LCJpYXQiOjE3MDc4ODAyMjR9.Go5rBTs_c2nSj7dSDeRSJCK3CwzzcQSr21GdpgSss68'
      })
    })
    .then(response => response.json())
    .then(res => setTask(res));
  
  }, [])

  console.log(tasks);

  return (
    <div className="Dashboard">
      <Sidebar user={user} />
      <div>
        <img src="%PUBLIC%" alt="Background" />
      </div>
    </div>
  );
}

export default Dashboard;
