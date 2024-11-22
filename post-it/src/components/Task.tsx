import { Category, Task as TaskType } from "../types";
import Button from "./Button";

interface TaskData {
  task: TaskType;
  className?: string;
  delete?: Boolean;
  getTaskdeleteIds: (ids: number[]) => void;
}

function Task(props: TaskData) {
  const categories: Category[] = JSON.parse(sessionStorage.categories);
  const taskIds: number[] = [];

  return (
    <div className={"task " + props.task.status + " " + props.className}>
      <div>
        {props.delete ? (
          <Button
            label={""}
            type="checkbox"
            key={props.task.id}
            onClick={() => {
              taskIds.push(props.task.id);
              props.getTaskdeleteIds(taskIds);
            }}
          />
        ) : undefined}
      </div>
      <div>
        <h3 className="task-title">{props.task.title}</h3>
        <div>
          <p className="task-description">{props.task.description}</p>
          <p className="task-date">{props.task.endAt.toString()}</p>
        </div>
        <p className="task-category">{categories.length != undefined ? categories.find((cat) => cat.id === props.task.categoryId)?.name || "General" : "Data Not Available"}</p>
      </div>
    </div>
  );
}

export default Task;
