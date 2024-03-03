import { useState } from "react";
import { saveTask } from "../api/TaskApi";
import formatDate from "../util/formatter";

import Select from "./Select";
import Button from "./Button";

interface ModalProps {
    content: string,
    className?: String,
    isShown: boolean,
    handleClose: () => void
}

export default function Modal(props: ModalProps) {
    let priorities = JSON.parse(sessionStorage.getItem("priorities") || "{}") ;
    let myCollCategories = JSON.parse(sessionStorage.getItem("categories")  || "{}");
    let myCollections = JSON.parse(sessionStorage.getItem("collections")  || "{}");
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

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        await saveTask(JSON.stringify(taskData));
      }
    
function selectContent(content: string){
    switch(content){
        case "createTask":
            return(
                <div className="modalContainer">   
                    <Button label={"X"} type="button" onClick={props.handleClose}/>
                    <div className="title">
                        <h3>Add New Task</h3>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="field">
                            <label htmlFor="title">Title:</label>
                            <input type="text" name="title" id="title" placeholder="Name your New Task" onChange={e => taskData.title = e.target.value}/>
                        </div>
                        <div className="field">
                            <label htmlFor="description">Description:</label>
                            <input type="text" name="description" id="description" placeholder="(Optional) describe your Task" onChange={e => taskData.description = e.target.value}/>
                        </div>
                        <div className="field">
                            <label htmlFor="endAt">Finishes At:</label>
                            <input type="datetime-local" name="date" id="date" placeholder="Date to Finish" onChange={e => taskData.endAt = formatDate(new Date(e.target.value), true)} value={taskData.endAt}/>
                        </div>
                        <div className="relations">
                            <div className="collections">
                                <label htmlFor="collections">Collection</label>
                                <Select id={"1"} name="collections" key={1} defaultValue="option" options={myCollections} onChange={(e) => setTaskData({...taskData, collectionId: Number(e.target.options[e.target.selectedIndex].value)})}/>
                            </div>
                            <div className="categories">
                                <label htmlFor="categories">Categories</label>
                                <Select id={"2"} name="categories" key={2} defaultValue="option" options={myCollCategories} onChange={(e) => setTaskData({...taskData, categoryId: Number(e.target.options[e.target.selectedIndex].value)})}/>
                            </div>
                            <div className="priorities">
                                <label htmlFor="priotities">Priority</label>
                                <Select id={"3"} name="priorities" key={3} defaultValue="option" options={priorities} onChange={(e) => setTaskData({...taskData, priorityId: Number(e.target.options[e.target.selectedIndex].value)})}/>
                            </div>
                        </div>
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
    <div className={`modalBackground ${props.className} ${props.isShown ? "" : "isHidden"}`}>
        {selectContent(props.content)}
    </div>
  )  
}