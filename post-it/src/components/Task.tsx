import { useState } from "react";
import { Category } from "../types";

interface Task {
  id: number,
  title: String,
  description: String,
  endAt: Date,
  categoryId: number
}

function Task(task:Task) {
  const categories: Category[] = JSON.parse(sessionStorage.getItem("categories") as string);
  console.log(task)
  return (
      <div className="task">
        <h3>Title Task {task.title}</h3>
        <div>
          <p>Description of task {task.description}</p>
          <p>End Date {new Date(task.endAt).toUTCString()}</p>
        </div>
        <p>category 
          {
            categories.find((cat) => cat.id === task.categoryId)?.name
          }
        </p>
      </div>
    );
  }
  
  export default Task;
  