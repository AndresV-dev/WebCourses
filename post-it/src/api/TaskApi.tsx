export function saveTask(taskData: string){
    fetch('http://localhost:8081/v1/tasks/register', {
      method: 'PUT',
      headers: new Headers({
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + ( sessionStorage.getItem('token') !== null ? sessionStorage.getItem('token') : process.env.VITE_TOKEN)
      }),
      body: taskData
    })
    .then(response => response.json())
    .then(() => alert("your Task has been Saved Successfully"))
    .catch((err) => alert("There was an error on Saving The Task, error:" + err));
}