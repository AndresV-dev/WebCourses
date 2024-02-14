import { useEffect, useState } from 'react';
import '../assets/css/sidebar.css';
import { User, UserTaskCollections } from '../types';

interface SidebarProps {
  user: User
}

function Sidebar(props: SidebarProps) {
  const [collections, setCollections] = useState<UserTaskCollections[]>([]);

  useEffect(() => {
    fetch('http://localhost:8081/v1/user/collection/list', {
      method: 'GET',
      headers: new Headers({
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + (props.user.token !== undefined ? props.user.token : "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0IiwiZXhwIjoxNzA3OTY2NjI0LCJpYXQiOjE3MDc4ODAyMjR9.Go5rBTs_c2nSj7dSDeRSJCK3CwzzcQSr21GdpgSss68")
      })
    })
    .then(response => response.json())
    .then(res => setCollections(res));
  
  }, []);

  return (
    <nav className="sidebar">
      <ul className="user">
        <li>
          <img src={props.user.userImage} alt="User Profile Image" />
        </li>
        <li>{props.user.username}</li>
      </ul>
      <ul className="">
        <li className="links">Add Task</li>
        <li className="links">Dashboard</li>
        <li className="links">Search</li>
        <li className="links">Other Days</li>
      </ul>
      <ul className="collection">
        <li className="category">Reuniones</li>
        <li className="category">Super Market</li>
      </ul>
    </nav>
  );
}

export default Sidebar;
