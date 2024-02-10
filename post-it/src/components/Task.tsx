function Task(props) {
    return (
      <div className="Task">
        <h3>Title Task {props.title}</h3>
        <div>
          <p>Description of task {props.description}</p>
          <p>End Date {props.endDate}</p>
        </div>
        <p>category {props.category}</p>
      </div>
    );
  }
  
  export default Task;
  