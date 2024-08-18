import { Category, Task as TaskType } from "../types";

interface TaskData {
  task: TaskType;
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
      <p className="task-category">{categories.length != undefined ? categories.find((cat) => cat.id === props.task.categoryId)?.name || "General" : "Data Not Available"}</p>
    </div>
  );
}

export default Task;
