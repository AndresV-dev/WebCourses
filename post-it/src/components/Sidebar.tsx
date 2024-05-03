import { useEffect, useState } from "react";
import { Category, User, UserTaskCollections } from "../types";
import { MdCollections, MdOutlineAddToPhotos } from "react-icons/md";
import { parseJson } from "../util/functions";
import { logout } from "../api/featchApi";
import Button from "./Button";
import Modal from "./Modal";
import { Link, useNavigate } from "react-router-dom";

interface SidebarProps {}

function Sidebar(props: SidebarProps) {
  const navigate = useNavigate();
  const [collections, setCollections] = useState<Array<UserTaskCollections>>();
  const [user, setUser] = useState<User>();
  const [isShownTask, setIsShownTask] = useState(false);
  const [isShownCollection, setIsShownCollection] = useState(false);
  const [isShownCategory, setIsShownCategory] = useState(false);

  useEffect(() => {
    if (sessionStorage.user !== undefined) {
      setCollections(parseJson(sessionStorage.collections));
      setUser(parseJson(sessionStorage.user) as User);
    }
  }, [sessionStorage.user]);

  const logoutFunction = () => {
    logout();
    navigate(`/login`);
  };
  return (
    <nav className="sidebar">
      <section className="userSection">
        <ul className="user">
          <li id="userImage">
            <img src={user?.userImage || process.env.VITE_USERIMAGEURL} alt="User Profile Image" />
          </li>
          <Link id="username" to={"/user/" + (user?.username || process.env.VITE_USERNAME)}>
            {user?.username || process.env.VITE_USERNANE}
          </Link>
        </ul>
      </section>
      <section className="generalMenu">
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
      </section>
      <section className="collectionSection section">
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
              <Link className="collection" key={`name-${collection.name}`} to={"/tasks/" + collection.name} state={{ collectionId: collection.id }}>
                {collection.name}
              </Link>
              {collection.categories?.map((category: Category, index: number) => {
                return (
                  <Link to={"/tasks/" + collection.name + "/" + category.name} key={`category ${index}`} state={{ collectionId: collection.id, categoryId: category.id }} className="category">
                    {category.name}
                  </Link>
                );
              })}
            </ul>
          );
        })}
      </section>
      <section className="logoutSection">
        <Button label={"Logout"} type="button" className={"btn-add"} onClick={() => logoutFunction()} name="logout" />
      </section>
    </nav>
  );
}

export default Sidebar;
