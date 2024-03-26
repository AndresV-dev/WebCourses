import { useEffect, useState } from "react";
import { Category, User, UserTaskCollections } from "../types";
import { MdCollections, MdOutlineAddToPhotos } from "react-icons/md";
import { parseJson } from "../util/functions";
import Button from "./Button";
import Modal from "./Modal";
import { Link } from "react-router-dom";

interface SidebarProps {}

function Sidebar(props: SidebarProps) {
  const [collections, setCollections] = useState(parseJson(sessionStorage.collections) as Array<UserTaskCollections>);
  const [user, setUser] = useState<User>();
  const [isShownTask, setIsShownTask] = useState(false);
  const [isShownCollection, setIsShownCollection] = useState(false);
  const [isShownCategory, setIsShownCategory] = useState(false);

  useEffect(() => {
    setCollections(parseJson(sessionStorage.collections));
    setUser(parseJson(sessionStorage.user) as User);
    console.log(collections);
  }, [sessionStorage.user, sessionStorage.collections]);

  return (
    <nav className="sidebar">
      <ul className="user">
        <li id="userImage">
          <img src={user?.userImage || process.env.VITE_USERIMAGEURL} alt="User Profile Image" />
        </li>
        <Link id="username" to={"/user/" + (user?.username || process.env.VITE_USERNAME)}>
          {user?.username || process.env.VITE_USERNANE}
        </Link>
      </ul>
      <ul className="links section">
        <Modal content="createTask" isShown={isShownTask} handleClose={() => setIsShownTask(!isShownTask)} />
        <Button type="button" label={"Add Task"} key={"AddTask"} className={"btn-add"} onClick={() => setIsShownTask(!isShownTask)} />
        <Link id="dashboard" to={"/dashboard"}>
          Dashboard
        </Link>
        <Link id="search" to={"/search"}>
          Search
        </Link>
        <Link id="otherDays" to={"/others"}>
          Other Days
        </Link>
      </ul>
      {
        <div className="collectionsTitle">
          <h3>Collections</h3>
          <div>
            <Modal content="createCollection" isShown={isShownCollection} handleClose={() => setIsShownCollection(!isShownCollection)} />
            <button type="button" className={"btn-icons"} title="Add Collection" onClick={() => setIsShownCollection(!isShownCollection)}>
              <MdCollections />
            </button>
            <Modal content="createCategory" isShown={isShownCategory} handleClose={() => setIsShownCategory(!isShownCategory)} />
            <button type="button" className={"btn-icons"} title="Add Category" onClick={() => setIsShownCategory(!isShownCategory)}>
              <MdOutlineAddToPhotos />
            </button>
          </div>
        </div>
      }
      {collections?.map((collection, i) => {
        return (
          <ul key={`collection ${i}`} className="links">
            <Link className="collection" key={`name-${collection.name}`} to={"/my-collections/" + collection.name}>
              {collection.name}
            </Link>
            {collection.categories?.map((category: Category, index: number) => {
              return (
                <Link to={"/" + category.name} key={`category ${index}`} className="category">
                  {category.name}
                </Link>
              );
            })}
          </ul>
        );
      })}
    </nav>
  );
}

export default Sidebar;
