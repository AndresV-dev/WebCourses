import { Category, Task } from "../types";

interface TaskData {
  task: Task
}

function Task(props: TaskData) {
  const categories: Category[] = JSON.parse(sessionStorage.categories);
  return (
      <div className={"task " + props.task.status}>
        <h3 className="task-title">{props.task.title}</h3>
        <div>
          <p className="task-description">{props.task.description}</p>
          <p className="task-date">{props.task.endAt.toString()}</p>
        </div>
        <p className="task-category"> 
          {
            categories.length != undefined ? categories.find((cat) => cat.id === props.task.categoryId)?.name : "Data Not Available"
          }
        </p>
      </div>
    );
  }
  
  export default Task;
  