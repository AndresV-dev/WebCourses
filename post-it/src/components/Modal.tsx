import { useState } from "react";
import { saveTask } from "../api/TaskApi";
import formatDate from "../util/formatter";

import Select from "./Select";
import Button from "./Button";

interface ModalProps {
    content: string
}

export default function Modal(props: ModalProps) {

function selectContent(content: string){
    let priorities = JSON.parse(sessionStorage.getItem("priorities") || "{}") ;
    let myCollCategories = JSON.parse(sessionStorage.getItem("categories")  || "{}");
    let myCollections = JSON.parse(sessionStorage.getItem("collections")  || "{}");
    const [inputType, setInputType] = useState("text")
    const [taskData, setTaskData] = useState({
        status: "Nueva",
        title: "",
        description: "",
        endAt: "",
        collectionId: 1,
        categoryId: 1,
        priorityId: 3,
        userId: 2 // id from the default user (Test User)
    })

    function focusHandler(){
        if(inputType === "text")
            setInputType("datetime-local")
        else
            setInputType("text")
        
            console.log(taskData);
    }

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        await saveTask(JSON.stringify(taskData));
      }
    
    switch(content){
        case "createTask":
            return(
                <div className="modalContainer">            
                    <button>close</button>
                    <div className="title">
                        <h3>Add New Task</h3>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="title" id="title" placeholder="Name a Task" onChange={e => taskData.title = e.target.value}/>
                        <input type="text" name="description" id="description" placeholder="(Optional) describe your Task" onChange={e => taskData.description = e.target.value}/>
                        <input type={inputType} name="date" id="date" placeholder="Date to Finish" onChange={e => taskData.endAt = formatDate(new Date(e.target.value), true)} onFocus={focusHandler}  value={taskData.endAt}/>
                        <Select id={"1"} name="collections" key={1} defaultValue="option" options={myCollections} onChange={(e) => setTaskData({...taskData, collectionId: Number(e.target.options[e.target.selectedIndex].value)})}/>
                        <Select id={"2"} name="categories" key={2} defaultValue="option" options={myCollCategories} onChange={(e) => setTaskData({...taskData, categoryId: Number(e.target.options[e.target.selectedIndex].value)})}/>
                        <Select id={"3"} name="priorities" key={3} defaultValue="option" options={priorities} onChange={(e) => setTaskData({...taskData, priorityId: Number(e.target.options[e.target.selectedIndex].value)})}/>
                        <Button type="submit" label={"Save"}/>
                    </form>
                </div>
            )
            default:
                return(
                    <div>
                        There Is Not a Modal For This Required Content
                    </div>
                )
    }
}
 return(
    <div className="modalBackground">
        {selectContent(props.content)}
    </div>
  )  
}