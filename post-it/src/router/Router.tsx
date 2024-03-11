import { createBrowserRouter } from "react-router-dom";

// Imports For Components/Pages
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
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

export function downloadCataloges() {
  if(sessionStorage.getItem("categories") === null){
    getCategories()
  }

  if(sessionStorage.getItem("collections") === null){
    getCollections()
  }

  if(sessionStorage.getItem("priorities") === null){
    getPriorities()
  }
}