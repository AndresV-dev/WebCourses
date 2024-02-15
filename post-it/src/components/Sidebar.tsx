import { useEffect, useState } from 'react';
import '../assets/css/sidebar.css';
import { Category, User, UserTaskCollections } from '../types';

interface SidebarProps {
  user?: User
}

function Sidebar(props: SidebarProps) {
  const [collections, setCollections] = useState<UserTaskCollections[]>([]);

    useEffect(() => {
    fetch('http://localhost:8081/v1/user/collection/list', {
      method: 'GET',
      headers: new Headers({
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + (props.user?.token !== undefined ? props.user?.token : process.env.VITE_TOKEN)
      })
    })
    .then(response => response.json())
    .then(res => setCollections(res));  
  }, []);

  return (
    <nav className="sidebar">
      <ul className="user">
        <li id='userImage'>
          <img src={props.user?.userImage || process.env.VITE_USERIMAGEURL} alt="User Profile Image" />
        </li>
        <li id='username'>{props.user?.username || process.env.VITE_USERNANE}</li>
      </ul>
      <ul className="">
        <li id='addTask' className="links">Add Task</li>
        <li id='dashboard' className="links">Dashboard</li>
        <li id='search' className="links">Search</li>
        <li id='otherDays' className="links">Other Days</li>
      </ul>
      {
        collections.map((collection, i) => {
          return(
            <ul key={`collection ${i}`}>
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
