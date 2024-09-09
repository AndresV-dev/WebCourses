import { Task as TaskType } from "../types";
import Task from "./Task";
import Button from "./Button";

interface TaskListProps {
  options?: boolean;
  tasks: TaskType[];
  page: number;
  size: number;
  setPage: (page: number) => void;
  setSize: (size: number) => void;
}

export default function TaskList(props: TaskListProps) {
  const taskDeleteId: string | number[] = [];

  return (
    <div className="taskContainer">
      {props.tasks.map((task, i) => {
        props.options ? (
          <Button
            label={""}
            type="checkbox"
            key={i}
            onClick={() => {
              taskDeleteId.push(task.id);
            }}
          />
        ) : undefined;
        return <Task key={i} task={task} />;
      })}
      <div>
        <Button label={"<"} type="button" onClick={() => props.setPage(props.page - 1)} />
        <label htmlFor="size">page {props.page}</label>
        <Button label={">"} type="button" onClick={() => props.setPage(props.page + 1)} />
      </div>
      <Button label={"Delete Tasks"} type="button" key={"delTask"} name="delTask" onClick={() => alert("this is the list for the ids" + taskDeleteId)}></Button>
    </div>
  );
}
