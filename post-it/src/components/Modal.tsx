import Select from "./Select";

interface ModalProps {
    content: string
}

export default function Modal(props: ModalProps) {

function selectContent(content: string){

    switch(content){
        case "createTask":
            return(
                <div className="modalContainer">            
                    <button>close</button>
                    <div className="title">
                        <h3>Add New Task</h3>
                    </div>
                    <form>
                        <input type="text" name="title" id="title" placeholder="Name a Task" value={task?.title}/>
                        <input type="text" name="description" id="description" placeholder="(Optional) describe your Task" value={task?.description}/>
                        <input type="text" name="date" id="date" placeholder="Date to Finish" value={task?.endAt.toString()} onFocus={focusHandler}/>
                        <Select id={"1"} name="asd" key={1} defaultValue="option" options={JSON.stringify(sessionStorage.getItem("collections"))}/>
                    </form>
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