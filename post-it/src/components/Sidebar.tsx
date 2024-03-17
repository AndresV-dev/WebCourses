import { useEffect, useState } from "react";
import { Category, User, UserTaskCollections } from "../types";
import { Link } from "react-router-dom";

interface SidebarProps {
  handleModal: () => void;
}

function Sidebar(props: SidebarProps) {
  const [collections, setCollections] = useState<UserTaskCollections[]>();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    setCollections(JSON.parse(sessionStorage.collections));
    setUser(JSON.parse(sessionStorage.user) as User);
  }, [sessionStorage.user]);

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
        <button type="button" key={"AddTask"} className={"btn-addtask"} onClick={props.handleModal}>
          Add Task
        </button>
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
      {collections?.map((collection, i) => {
        return (
          <ul key={`collection ${i}`} className="links">
            <Link className="collection" key={`name-${collection.name}`} to={"/my-collections/" + collection.name}>
              {collection.name}
            </Link>
            {collection.categories.map((category: Category, index: number) => {
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
