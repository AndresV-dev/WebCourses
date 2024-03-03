import { useEffect, useState } from 'react';
import { Category, User, UserTaskCollections } from '../types';
import { downloadCataloges } from '../router/Router';
import Button from './Button';

interface SidebarProps {
  user?: User,
  handleModal: () => void
}

function Sidebar(props: SidebarProps) {
  const [collections, setCollections] = useState<UserTaskCollections[]>([]);

  downloadCataloges();
    useEffect(() => {
      if(collections.length === 0){
        fetch('http://localhost:8081/v1/user/collection/list', {
      method: 'GET',
      headers: new Headers({
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + (props.user?.token !== undefined ? props.user?.token : process.env.VITE_TOKEN)
      })
    })
    .then(response => response.json())
    .then(res => setCollections(res))
  }
      }, []);

  if(collections !== null){
    sessionStorage.setItem("collections", JSON.stringify(collections));
  }

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
