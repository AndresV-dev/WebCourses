import { createBrowserRouter } from "react-router-dom";

// Imports For Components/Pages
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import NotFoundPage from "../pages/NotFoundPage";
import TasksView from "../pages/TasksView";
import Perfil from "../pages/Perfil";

export default createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
  {
    path: "tasks",
    Component: TasksView,
  },
  {
    path: "tasks/:collection",
    Component: TasksView,
  },
  {
    path: "tasks/:collection/:category",
    Component: TasksView,
  },
  {
    path: "user/:username",
    Component: Perfil,
  },
  {
    path: "*",
    Component: NotFoundPage,
  },
]);
