import { createBrowserRouter } from "react-router-dom";

// Imports For Components/Pages
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { useEffect, useState} from "react";
import { Category, TaskPriority } from "../types";

export default createBrowserRouter([
  {
    path: "/",
    Component: Dashboard
  },{
    path: "/login",
    Component: Login
  },{
    path: "/register",
    Component: Register
  }
]);

export function downloadCataloges() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [priorities, setPriorities] = useState<TaskPriority[]>([]);
  useEffect(() => {
    if(sessionStorage.getItem("categories") === null){
      fetch('http://localhost:8081/v1/category/list', {
        method: 'GET',
        headers: new Headers({
          'Content-type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + ( sessionStorage.getItem('token') !== null ? sessionStorage.getItem('token') : process.env.VITE_TOKEN)
          })
        })
      .then(response => response.json())
      .then(res => setCategories(res))

      if(categories.length !== 0){
        sessionStorage.setItem("categories", JSON.stringify(categories))
      }
    }
  
    if(sessionStorage.getItem("priorities") === null){
      fetch('http://localhost:8081/v1/tasks/priority/list', {
        method: 'GET',
        headers: new Headers({
          'Content-type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + ( sessionStorage.getItem('token') !== null ? sessionStorage.getItem('token') : process.env.VITE_TOKEN)
        })
      })
      .then(response => response.json())
      .then(res => setPriorities(res));

      if(priorities.length !== 0){
        sessionStorage.setItem("priorities", JSON.stringify(priorities));
      }
    }
  });
}