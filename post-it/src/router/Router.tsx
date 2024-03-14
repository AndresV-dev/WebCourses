import { createBrowserRouter } from "react-router-dom";

// Imports For Components/Pages
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import { getCategories, getCollections, getPriorities } from "../api/featchApi";
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

export async function downloadCataloges() {
  if (sessionStorage.getItem("categories") === null) {
    await getCategories();
  }

  if (sessionStorage.getItem("collections") === null) {
    await getCollections();
  }

  if (sessionStorage.getItem("priorities") === null) {
    await getPriorities();
  }
}
