import { createBrowserRouter } from "react-router-dom";

// Imports For Components/Pages
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { Category, TaskPriority, UserTaskCollections } from "../types";
import { getCategories, getCollections, getPriorities } from "../api/TaskApi";

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

export async function downloadCataloges() {
  const categories:Category[] = JSON.parse(sessionStorage.getItem("categories") || "{}");
  const priorities: TaskPriority[] = JSON.parse(sessionStorage.getItem("priorities") || "{}");
  const collections: UserTaskCollections[] = JSON.parse(sessionStorage.getItem("collections") || "{}");

  if(sessionStorage.getItem("categories") === null){
    getCategories()
    sessionStorage.setItem("categories", JSON.stringify(categories))
  }

  if(sessionStorage.getItem("collections") === null){
    getCollections()
    sessionStorage.setItem("collections", JSON.stringify(collections))
  }

  if(sessionStorage.getItem("priorities") === null){
    getPriorities()
    sessionStorage.setItem("priorities", JSON.stringify(priorities));
  }

  console.log(categories)
  console.log(priorities)
  console.log(collections)
}

await downloadCataloges()