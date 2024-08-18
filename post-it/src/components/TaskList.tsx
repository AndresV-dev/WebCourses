import { Task as TaskType } from "../types";
import Task from "./Task";
import Button from "./Button";

interface TaskListProps {
  tasks: TaskType[];
  setPage: (page: number) => void;
  setSize: (size: number) => void;
}

export default function TaskList(props: TaskListProps) {
  return (
    <div className="taskContainer">
      {props.tasks.map((task, i) => {
        return <Task key={i} task={task} />;
      })}
      <Button label={"<"} type="button" />
    </div>
  );
}
