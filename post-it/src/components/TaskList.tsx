import { Task as TaskType } from "../types";
import Task from "../components/Task";

interface TaskListProps {
  tasks: TaskType[];
}

export default function TaskList(props: TaskListProps) {
  console.log(props.tasks);
  return (
    <div className="taskContainer">
      {props.tasks.map((task, i) => {
        return <Task key={i} task={task} />;
      })}
    </div>
  );
}
