import { Task as TaskType } from "../types";
import Task from "./Task";
import Button from "./Button";
import { deleteTasks, getTasksFilters } from "../api/featchApi";
import Select from "./Select";

interface TaskListProps {
  options?: boolean;
  tasks: TaskType[];
  delete?: boolean;
  className?: string;
  page: number;
  size: number;
  setPage: (page: number) => void;
  setSize: (size: number) => void;
}

function TaskList(props: TaskListProps) {
  const ids: number[] = [];

  function addTaskIdDelete(id: number) {
    ids.push(id);
  }

  return (
    <div className="taskContainer">
      {props.tasks.map((task, i) => {
        return <Task key={i} task={task} delete={props.delete || false} className={props.className || ""} getTaskdeleteIds={(taskDeleteIds) => addTaskIdDelete(taskDeleteIds[0])} />;
      })}
      <div className="bottom-navigation">
        <Button label={"Delete Tasks"} type="button" key={"delTask"} name="delTask" onClick={() => deleteTasks(ids).then((data) => alert(JSON.stringify(data)))}></Button>
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

export default TaskList;
