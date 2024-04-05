import { Task, User, UserTaskCollections } from "../types";
import { parseJsonUnd, stringifyJson } from "../util/functions";
import { useNavigate } from "react-router-dom";

let token = parseJsonUnd(sessionStorage.user)?.token || sessionStorage.token;

// Endpoint to Save a Task
export function saveTask(taskData: string) {
  fetch(process.env.VITE_APIURL + "tasks/register", {
    method: "PUT",
    headers: new Headers({
      "Content-type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + (token !== undefined ? token : process.env.VITE_TOKEN),
    }),
    body: taskData,
  })
    .then((response) => response.json())
    .then(() => alert("your Task has been Saved Successfully"))
    .catch((err) => alert("There was an error on Saving The Task, error:" + err));
}

// Endpoint to Save a Collection
export function saveCollection(collectionData: string) {
  fetch(process.env.VITE_APIURL + "user/collection/register", {
    method: "PUT",
    headers: new Headers({
      "Content-type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + (token !== undefined ? token : process.env.VITE_TOKEN),
    }),
    body: collectionData,
  })
    .then((response) => response.json())
    .then((res) => {
      let collectionsJson: Array<UserTaskCollections> = JSON.parse(sessionStorage.collections);
      collectionsJson.push(res as unknown as UserTaskCollections);
      sessionStorage.collections = stringifyJson(collectionsJson as unknown as string);
      alert("your Task has been Saved Successfully");
    })
    .catch((err) => alert("There was an error on Saving The Task, error:" + err));
}

// Endpoint to Save a Collection
export function saveCategory(categoryData: string) {
  console.log(token);
  fetch(process.env.VITE_APIURL + "user/collection/category/register", {
    method: "PUT",
    headers: new Headers({
      "Content-type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + (token !== undefined ? token : process.env.VITE_TOKEN),
    }),
    body: categoryData,
  })
    .then((response) => response.json())
    .then(() => alert("your Category has been Saved Successfully"))
    .catch((err) => alert("There was an error on Saving The Category, error:" + err));
}

// Endpoint to Get a TaskList with filters
export function getTasksFilters(filters: string) {
  let tasks: Array<Task> = [];

  fetch(process.env.VITE_APIURL + "tasks/list/filtered", {
    method: "POST",
    headers: new Headers({
      "Content-type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + (token !== undefined ? token : process.env.VITE_TOKEN),
    }),
    body: filters,
  })
    .then((response) => response.json())
    .then((res) => (tasks = res))
    .catch((err) => sessionStorage.setItem("error", err + " from Task by Filters"));

  return tasks;
}
// Enpoint to get the Collections of the user
export async function getCollections() {
  return fetch(process.env.VITE_APIURL + "user/collection/list", {
    method: "GET",
    headers: new Headers({
      "Content-type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + (token !== undefined ? token : process.env.VITE_TOKEN),
    }),
  })
    .then((response) => response.json())
    .then((res) => (sessionStorage.collections = JSON.stringify(res)))
    .catch((err) => sessionStorage.setItem("error", err + " from Collections"));
}
// Endpoint to get The Catalog for Categories
export async function getCategories() {
  fetch(process.env.VITE_APIURL + "user/categories/list", {
    method: "GET",
    headers: new Headers({
      "Content-type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + (token !== undefined ? token : process.env.VITE_TOKEN),
    }),
  })
    .then((response) => response.json())
    .then((res) => sessionStorage.setItem("categories", JSON.stringify(res)))
    .catch((err) => sessionStorage.setItem("error", err + " from Categories"));
}
// Endpoint to Get The Catalog for Priorities
export async function getPriorities() {
  fetch(process.env.VITE_APIURL + "tasks/priority/list", {
    method: "GET",
    headers: new Headers({
      "Content-type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + (token !== undefined ? token : process.env.VITE_TOKEN),
    }),
  })
    .then((response) => response.json())
    .then((res) => sessionStorage.setItem("priorities", JSON.stringify(res)))
    .catch((err) => sessionStorage.setItem("error", err + " from Priorities"));
}
// Endpoint to Do the login
export async function login(loginInfo: string) {
  return fetch(process.env.VITE_APIURL + "auth/user/token", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
    body: loginInfo,
  })
    .then((response) => response.json())
    .then((res) => {
      if (res.code === 200) {
        sessionStorage.setItem("user", JSON.stringify(res));
        let user: User = res;

        if (user.token !== null || user.token !== undefined) token = user.token;
      } else sessionStorage.setItem("error", JSON.stringify(res));
    })
    .catch((error) => sessionStorage.setItem("error", error));
}

// Endpoint to Save a new User
export function register(registerInfo: string) {
  fetch(process.env.VITE_APIURL + "auth/user/register", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
    body: registerInfo,
  })
    .then((response) => response.json())
    .then((res) => () => {
      sessionStorage.setItem("user", JSON.stringify(res));
      console.log("session user" + sessionStorage.getItem("user"));
      console.log("res " + res);
      let user: User = res as User;

      console.log("user" + user);
      if (user.token !== undefined) sessionStorage.setItem("token", user.token);
    })
    .catch((error) => sessionStorage.setItem("error: ", error));
}
// delete all the user info from the session Storage
export function logout() {
  sessionStorage.removeItem("user");
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("Collections");
  sessionStorage.removeItem("Categories");
  const navigate = useNavigate();

  navigate(`/login`);
}
