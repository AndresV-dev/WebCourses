import { Task, User } from "../types";

let token = sessionStorage.getItem("token");

export function saveTask(taskData: string) {
  fetch(process.env.VITE_APIURL + "tasks/register", {
    method: "PUT",
    headers: new Headers({
      "Content-type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + (token !== null ? token : process.env.VITE_TOKEN),
    }),
    body: taskData,
  })
    .then((response) => response.json())
    .then(() => alert("your Task has been Saved Successfully"))
    .catch((err) => alert("There was an error on Saving The Task, error:" + err));
}

export function getTasksFilters(filters: string) {
  let tasks: Array<Task> = [];

  fetch(process.env.VITE_APIURL + "tasks/list/filtered", {
    method: "POST",
    headers: new Headers({
      "Content-type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + (token !== null ? token : process.env.VITE_TOKEN),
    }),
    body: filters,
  })
    .then((response) => response.json())
    .then((res) => (tasks = res))
    .catch((err) => sessionStorage.setItem("error", err + " from Task by Filters"));

  return tasks;
}

export function getCollections() {
  fetch(process.env.VITE_APIURL + "user/collection/list", {
    method: "GET",
    headers: new Headers({
      "Content-type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + (token !== null ? token : process.env.VITE_TOKEN),
    }),
  })
    .then((response) => response.json())
    .then((res) => sessionStorage.setItem("collections", JSON.stringify(res)))
    .catch((err) => sessionStorage.setItem("error", err + " from Collections"));
}

export function getCategories() {
  fetch(process.env.VITE_APIURL + "category/list", {
    method: "GET",
    headers: new Headers({
      "Content-type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + (token !== null ? token : process.env.VITE_TOKEN),
    }),
  })
    .then((response) => response.json())
    .then((res) => sessionStorage.setItem("categories", JSON.stringify(res)))
    .catch((err) => sessionStorage.setItem("error", err + " from Categories"));
}

export function getPriorities() {
  fetch(process.env.VITE_APIURL + "tasks/priority/list", {
    method: "GET",
    headers: new Headers({
      "Content-type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + (token !== null ? token : process.env.VITE_TOKEN),
    }),
  })
    .then((response) => response.json())
    .then((res) => sessionStorage.setItem("priorities", JSON.stringify(res)))
    .catch((err) => sessionStorage.setItem("error", err + " from Priorities"));
}

export function login(loginInfo: string) {
  fetch("http://localhost:8081/v1/auth/user/token", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
    body: loginInfo,
  })
    .then((response) => response.json())
    .then((res) => () => {
      sessionStorage.setItem("user", JSON.stringify(res));

      let user: User = res as User;

      if (user.token !== undefined) sessionStorage.setItem("token", user.token);
    })
    .catch((error) => sessionStorage.setItem("error: ", error));
}

export function register(registerInfo: string) {
  fetch("http://localhost:8081/v1/auth/user/register", {
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

      let user: User = res as User;

      if (user.token !== undefined) sessionStorage.setItem("token", user.token);
    })
    .catch((error) => sessionStorage.setItem("error: ", error));
}
