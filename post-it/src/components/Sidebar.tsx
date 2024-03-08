import { useEffect, useState } from 'react';
import { Category, User, UserTaskCollections } from '../types';
import Button from './Button';
import { getCollections } from '../api/TaskApi';

interface SidebarProps {
  user?: User,
  handleModal: () => void
}

function Sidebar(props: SidebarProps) {

  const [collections, setCollections] = useState<UserTaskCollections[]>(JSON.parse(sessionStorage.getItem("collections") || "{}"));

    useEffect(() => {
      if(collections.length === 0){
        getCollections();
        setCollections(JSON.parse(sessionStorage.getItem("collections") || "{}"));
      }
      }, []);

  return (
    <nav className="sidebar">
      <ul className="user">
        <li id='userImage'>
          <img src={props.user?.userImage || process.env.VITE_USERIMAGEURL} alt="User Profile Image" />
        </li>
        <li id='username'>{props.user?.username || process.env.VITE_USERNANE}</li>
      </ul>
      <ul className="links">
        <Button label={"Add Task"} type='button' key={"AddTask"} onClick={props.handleModal}/>
        <li id='dashboard' className="links">Dashboard</li>
        <li id='search' className="links">Search</li>
        <li id='otherDays' className="links">Other Days</li>
      </ul>
      {
        collections.map((collection, i) => {
          return(
            <ul key={`collection ${i}`} className='links'>
              <li className='collection' key={`name-${collection.name}`}>{collection.name}</li>
              {
                collection.categories.map((category: Category, index: number) => {
                  return (
                    <li key={`category ${index}`} className='category'>{ category.name}</li>
                  )
                })
              }             
            </ul>
          );
        })
      }
    </nav>
  );
}

export default Sidebar;
