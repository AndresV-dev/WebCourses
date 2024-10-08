import { User, UserTaskCollections } from "../types";
import { parseJsonUnd, stringifyJson } from "../util/functions";

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
    .then(async (response) => {
      if (!response.ok) throw new Error(JSON.stringify(await response.json()));
      return response.json();
    })
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
    .then(async (response) => {
      if (!response.ok) throw new Error(JSON.stringify(await response.json()));
      return response.json();
    })
    .then(() => alert("your Category has been Saved Successfully"))
    .catch((err) => alert("There was an error on Saving The Category, error:" + err));
}

// Endpoint to Delete a List of Tasks
export function deleteTasks(tasksIds: Array<Number>) {
  let body = JSON.stringify(tasksIds);

  return fetch(process.env.VITE_APIURL + "tasks/delete", {
    method: "POST",
    headers: new Headers({
      "Content-type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + (token !== undefined ? token : process.env.VITE_TOKEN),
    }),
    body,
  })
    .then(async (response) => {
      if (!response.ok) throw new Error(JSON.stringify(await response.json()));
      return response.json();
    })
    .catch((err) => sessionStorage.setItem("error", err + " from Delete Tasks Endpoint"));
}

// Endpoint to Get a TaskList with filters
export function getTasksFilters(filters: string) {
  return fetch(process.env.VITE_APIURL + "tasks/list/filtered", {
    method: "POST",
    headers: new Headers({
      "Content-type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + (token !== undefined ? token : process.env.VITE_TOKEN),
    }),
    body: filters,
  })
    .then(async (response) => {
      if (!response.ok) throw new Error(JSON.stringify(await response.json()));
      return response.json();
    })
    .catch((err) => sessionStorage.setItem("error", err + " from Task by Filters"));
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
    .then(async (response) => {
      if (!response.ok) throw new Error(JSON.stringify(await response.json()));
      return response.json();
    })
    .then((res) => {
      sessionStorage.collections = JSON.stringify(res);
    })
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
    .then(async (response) => {
      if (!response.ok) throw new Error(JSON.stringify(await response.json()));
      return response.json();
    })
    .then((res) => {
      sessionStorage.setItem("categories", JSON.stringify(res));
    })
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
    .then(async (response) => {
      if (!response.ok) throw new Error(JSON.stringify(await response.json()));
      return response.json();
    })
    .then((res) => {
      sessionStorage.setItem("priorities", JSON.stringify(res));
    })
    .catch((err) => sessionStorage.setItem("error", err.message + " from Priorities"));
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
    .then(async (response) => {
      if (!response.ok) throw new Error(JSON.stringify(await response.json()));
      return response.json();
    })
    .then((res) => {
      sessionStorage.setItem("user", JSON.stringify(res));
      let user: User = res;
      if (user.token !== null || user.token !== undefined) token = user.token;
    })
    .catch((error) => {
      sessionStorage.setItem("error", error.message);
    });
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
    .then(async (response) => {
      if (!response.ok) throw new Error(JSON.stringify(await response.json()));
      return response.json();
    })
    .then((res) => () => {
      sessionStorage.setItem("user", JSON.stringify(res));
      let user: User = res as User;

      console.log("user" + user);
      if (user.token !== undefined) sessionStorage.setItem("token", user.token);
    })
    .catch((error) => sessionStorage.setItem("error", error));
}
// delete all the user info from the session Storage
export function logout() {
  sessionStorage.removeItem("user");
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("collections");
  sessionStorage.removeItem("categories");
  sessionStorage.loggedOut = true;

  console.log("Logged Out");
}

// Endpoint to get Charts of Tasks for the taskView
export function getTasksCharts(filters: string) {
  return fetch(process.env.VITE_APIURL + "tasks/charts", {
    method: "POST",
    headers: new Headers({
      "Content-type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + (token !== undefined ? token : process.env.VITE_TOKEN),
    }),
    body: filters,
  })
    .then(async (response) => {
      if (!response.ok) throw new Error(JSON.stringify(await response.json()));
      return response.json();
    })
    .catch((err) => sessionStorage.setItem("error", err + " from Task by Filters"));
}
