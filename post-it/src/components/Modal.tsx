import { useEffect, useState } from "react";
import { saveTask, saveCollection, saveCategory } from "../api/featchApi";
import { parseJson } from "../util/functions";

import Select from "./Select";
import Button from "./Button";
import { Category, TaskPriority, User, UserTaskCollections } from "../types";

interface ModalProps {
  content: string;
  className?: String;
  isShown?: boolean;
  handleClose: () => void;
}

export default function Modal(props: ModalProps) {
  const [priorities, setPriorities] = useState<Array<TaskPriority>>([]);
  const [myCollections, setMyCollections] = useState<Array<UserTaskCollections>>([]);
  const [myCollCategories, setMyCollCategories] = useState<Array<Category>>([]);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    if (sessionStorage.user) {
      setPriorities(parseJson(sessionStorage.priorities));
      setMyCollections(parseJson(sessionStorage.collections));
      setMyCollCategories(parseJson(sessionStorage.collections?.categories));
      setUser(parseJson(sessionStorage.user));
    }
  }, [sessionStorage.user]);

  const [taskData, setTaskData] = useState({
    status: "Nueva",
    title: "",
    description: "",
    endAt: "",
    collectionId: 1,
    categoryId: 1,
    priorityId: 3,
    userId: user?.id || 2, // id from the default user (Test User)
  });

  const [collectionData, setCollectionData] = useState({
    name: "",
    description: "",
    userId: user?.id,
  });

  const [categoryData, setCategoryData] = useState({
    name: "",
    description: "",
    collection_id: 0,
  });

  const handleSubmitTask = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    saveTask(JSON.stringify(taskData));
    props.handleClose();
  };
  const handleSubmitCollection = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    saveCollection(JSON.stringify(collectionData));
    props.handleClose();
  };
  const handleSubmitCategory = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    saveCategory(JSON.stringify(categoryData));
    props.handleClose();
  };

  const handleChangeTaskData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskData({
      ...taskData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeCollectionData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCollectionData({
      ...collectionData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeCategoryData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryData({
      ...categoryData,
      [e.target.name]: e.target.value,
    });
  };

  function selectContent(content: string) {
    switch (content) {
      case "createTask":
      case "StaticModal":
        return (
          <div className="modalContainer">
            <div className="modal-header">
              <div className="title">
                <h3>Add New Task</h3>
              </div>
              <div className="modal-button">
                <Button label={"X"} type="button" onClick={props.handleClose} />
              </div>
            </div>
            <form onSubmit={handleSubmitTask}>
              <div className="field">
                <label htmlFor="title">Title:</label>
                <input type="text" name="title" id="title" placeholder="Name your New Task" onChange={handleChangeTaskData} />
              </div>
              <div className="field">
                <label htmlFor="description">Description:</label>
                <input type="text" name="description" id="description" placeholder="(Optional) describe your Task" onChange={handleChangeTaskData} />
              </div>
              <div className="field">
                <label htmlFor="endAt">Finishes At:</label>
                <input type="datetime-local" name="date" id="date" placeholder="Date to Finish" onChange={handleChangeTaskData} />
              </div>
              <div className="relations">
                <div className="collections">
                  <label htmlFor="collections">Collection</label>
                  <Select id={"1"} name="collections" key={1} defaultValue="option" options={myCollections} onChange={handleChangeTaskData} />
                </div>
                <div className="categories">
                  <label htmlFor="categories">Categories</label>
                  <Select id={"2"} name="categories" key={2} defaultValue="option" options={myCollCategories} onChange={handleChangeTaskData} />
                </div>
                <div className="priorities">
                  <label htmlFor="priotities">Priority</label>
                  <Select id={"3"} name="priorities" key={3} defaultValue="option" options={priorities} onChange={handleChangeTaskData} />
                </div>
              </div>
              <Button type="submit" label={"Save"} />
            </form>
          </div>
        );
      case "createCollection":
        return (
          <div className="modalContainer">
            <div className="modal-button">
              <Button label={"X"} type="button" onClick={props.handleClose} />
            </div>
            <div className="title">
              <h3>Add New Collection</h3>
            </div>
            <form onSubmit={handleSubmitCollection}>
              <div className="field">
                <label htmlFor="name">Title:</label>
                <input type="text" name="name" id="name" placeholder="Name your New Collection" onChange={handleChangeCollectionData} />
              </div>
              <div className="field">
                <label htmlFor="description">Description:</label>
                <input type="text" name="description" id="description" placeholder="(Optional) describe your Collection" onChange={handleChangeCollectionData} />
              </div>
              <Button type="submit" label={"Save"} />
            </form>
          </div>
        );
      case "createCategory":
        return (
          <div className="modalContainer">
            <div className="modal-button">
              <Button label={"X"} type="button" onClick={props.handleClose} />
            </div>
            <div className="title">
              <h3>Add New Category</h3>
            </div>
            <form onSubmit={handleSubmitCategory}>
              <div className="collections">
                <label htmlFor="collections">Collection</label>
                <Select id={"collection_id"} name="collection_id" key={1} defaultValue="option" options={myCollections} onChange={handleChangeCategoryData} required={true} />
              </div>
              <div className="field">
                <label htmlFor="name">Name: </label>
                <input type="text" name="name" id="name" placeholder="Name your New Category" onChange={handleChangeCategoryData} required />
              </div>
              <div className="field">
                <label htmlFor="description">Description: </label>
                <input type="text" name="description" id="description" placeholder="(Optional) describe your Category" onChange={handleChangeCategoryData} required />
              </div>
              <Button type="submit" label={"Save"} />
            </form>
          </div>
        );
      default:
        return <div>There Is Not a Modal For This Required Content</div>;
    }
  }

  return props.content == "StaticModal" ? <div className="staticModal">{selectContent(props.content)}</div> : <div className={`modalBackground ${props.className || ""} ${props.isShown ? "" : "isHidden"}`}>{selectContent(props.content)}</div>;
}
