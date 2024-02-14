interface Task {
  tittle: String,
  description: String,
  endDate: Date,
  category: String
}

function Task(Task:Task) {
    return (
      <div className="Task">
        <h3>Title Task {Task.tittle}</h3>
        <div>
          <p>Description of task {Task.description}</p>
          <p>End Date {Task.endDate.toUTCString()}</p>
        </div>
        <p>category {Task.category}</p>
      </div>
    );
  }
  
  export default Task;
  