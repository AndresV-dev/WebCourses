import { createBrowserRouter } from "react-router-dom";

// Imports For Components/Pages
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import NotFoundPage from "../pages/NotFoundPage";

export default createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
  {
    path: "*",
    Component: NotFoundPage,
  },
]);
