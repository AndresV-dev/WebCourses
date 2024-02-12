import Sidebar from "../components/Sidebar";

import '../assets/css/sidebar.css';
import { User } from "../types";

function Dashboard() {

  const user: User = {
    id: 1,
    uuid: "UD25F-6DH21-1JNHD-143H",
    role: 'ADMIN',
    name: "Andres",
    lastname: "Vargas",
    age: 26,
    email: "avargas@gmail.com",
    username: "AndresVargas",
    password: "hjsdgfhjsdj32476jknsadbf",
    created_at: new Date(),
    userImage: "https://cdn-icons-png.flaticon.com/512/6326/6326055.png"
  } 
  return (
    <div className="Dashboard">
      <Sidebar user={user} />
      <div className="content">

      </div>
    </div>
  );
}

export default Dashboard;
