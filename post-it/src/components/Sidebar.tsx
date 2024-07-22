import { useEffect, useState } from "react";
import { Category, User, UserTaskCollections } from "../types";
import { MdCollections, MdOutlineAddToPhotos } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa6";
import { parseJson } from "../util/functions";
import { logout } from "../api/featchApi";
import Button from "./Button";
import Modal from "./Modal";
import { Link, useNavigate } from "react-router-dom";

//interface SidebarProps {}

//function Sidebar(props: SidebarProps) {
function Sidebar() {
  const navigate = useNavigate();
  const [collections, setCollections] = useState<Array<UserTaskCollections>>();
  const showList = useState(false);
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

  const showListFunction = (id: number) => {
    document.getElementById("collection" + id)?.classList.toggle("show");
  };
  return (
    <nav className="sidebar">
      <section className="userSection">
        <ul className="user">
          <li id="userImage">
            <img src={user?.userImage || process.env.VITE_USERIMAGEURL} alt="User Profile Image" />
          </li>
          <Link id="username" to={"/user/" + (user?.id || process.env.VITE_USERID)} state={{ user }}>
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
          <Link id="search" to={"/tasks/search"} state={{}}>
            Search
          </Link>
          <Link id="otherDays" to={"/tasks/others"} state={{}}>
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
        {collections?.map((collection) => {
          return (
            <div className="collection dropdown" key={`name-${collection.name}`}>
              <Link to={"/tasks/" + collection.name} className="collection-tag" state={{ collectionId: collection.id }}>
                {collection.name}
              </Link>
              {collection.categories?.length > 0 ? (
                <button onClick={() => showListFunction(collection.id)} name={`collection${collection.id}`} className="dropbtn ">
                  <FaAngleDown />
                </button>
              ) : undefined}
              <div className={`${showList ? "show" : ""} dropdown-content`} id={`collection${collection.id}`}>
                {collection.categories?.map((category: Category, index: number) => {
                  return (
                    <Link to={"/tasks/" + collection.name + "/" + category.name} key={`category ${index}`} state={{ collectionId: collection.id, categoryId: category.id }} className="category category-tag">
                      {category.name}
                    </Link>
                  );
                })}
              </div>
            </div>
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
