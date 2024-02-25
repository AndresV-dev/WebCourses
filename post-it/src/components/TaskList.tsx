import { Task as TaskType } from "../types"
import Task from "../components/Task";

interface TaskListProps {
    tasks: TaskType[]
}

export default function TaskList(props: TaskListProps) {
    return(
        <div className="todayTasks">
        {
            props.tasks.map((task, i) => {
              return(
                <Task key={i} task={task} />
              )
            })
          }
        </div>
    )
}