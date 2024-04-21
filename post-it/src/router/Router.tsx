import { createBrowserRouter } from "react-router-dom";

// Imports For Components/Pages
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import NotFoundPage from "../pages/NotFoundPage";
import TasksView from "../pages/TasksView";

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
    path: "my-collections/:collection",
    Component: TasksView,
  },
  {
    path: "*",
    Component: NotFoundPage,
  },
]);
