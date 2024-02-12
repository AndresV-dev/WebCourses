import '../assets/css/sidebar.css';
import { User } from '../types';

interface SidebarProps {
  user: User
}

function Sidebar(props: SidebarProps) {
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
