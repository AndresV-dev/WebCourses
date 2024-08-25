import { Task as TaskType } from "../types";
import Task from "./Task";
import Button from "./Button";

interface TaskListProps {
  tasks: TaskType[];
  page: number;
  size: number;
  setPage: (page: number) => void;
  setSize: (size: number) => void;
}

export default function TaskList(props: TaskListProps) {
  return (
    <div className="taskContainer">
      {props.tasks.map((task, i) => {
        return <Task key={i} task={task} />;
      })}
      <div>
        <Button label={"<"} type="button" onClick={() => props.setPage(props.page - 1)} />
        <label htmlFor="size">page {props.page}</label>
        <Button label={">"} type="button" onClick={() => props.setPage(props.page + 1)} />
      </div>
    </div>
  );
}
