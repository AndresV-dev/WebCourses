import { createBrowserRouter } from "react-router-dom";

// Imports For Components/Pages
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";

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
