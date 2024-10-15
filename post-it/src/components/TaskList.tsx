import { Task as TaskType } from "../types";
import Task from "./Task";
import Button from "./Button";
import { getTasksFilters } from "../api/featchApi";
import Select from "./Select";

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
      <div className="bottom-navigation">
        <Button label={"Delete Tasks"} type="button" key={"delTask"} name="delTask" onClick={() => alert("this is the list for the ids" + taskDeleteId)}></Button>
        <div className="navigation">
          <Select
            name="sort"
            id={"filterOptions"}
            defaultValue={"5"}
            onChange={(e) => {
              props.setSize(e.target.options[e.target.selectedIndex].value);
            }}
            options={[
              { id: 5, name: 5 },
              { id: 10, name: 10 },
              { id: 15, name: 15 },
            ]}
            className="combo-size"
          />
          <Button
            label={"<"}
            type="button"
            onClick={() => {
              props.setPage(props.page - 1);
              getTasksFilters(JSON.stringify({ size: props.size, page: props.page })).then((data) => (props.tasks = data));
            }}
          />
          <label htmlFor="size">page {props.page + 1}</label>
          <Button
            label={">"}
            type="button"
            onClick={() => {
              props.setPage(props.page + 1);
              getTasksFilters(JSON.stringify({ size: props.size, page: props.page })).then((data) => (props.tasks = data));
            }}
          />
        </div>
      </div>
    </div>
  );
}
