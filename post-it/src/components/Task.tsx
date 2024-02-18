import { Category } from "../types";

interface Task {
  id: number,
  title: String,
  description: String,
  endAt: Date,
  category: Category
}

function Task(task:Task) {
  console.log(task)
    return (
      <div className="Task">
        <h3>Title Task {task.title}</h3>
        <div>
          <p>Description of task {task.description}</p>
          <p>End Date {new Date(task.endAt).toUTCString()}</p>
        </div>
        <p>category {task.category.name}</p>
      </div>
    );
  }
  
  export default Task;
  