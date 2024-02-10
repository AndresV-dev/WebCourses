function Sidebar() {
  //for test now
  const user = {
    id: 1,
    uuid: "UD25F-6DH21-1JNHD-143H",
    name: "Andres",
    lastname: "Vargas",
    edad: 26,
    email: "avargas@gmail.com",
    username: "AndresVargas",
    password: "hjsdgfhjsdj32476jknsadbf",
    userImage: "https://cdn-icons-png.flaticon.com/512/6326/6326055.png",
  };

  return (
    <nav className="sidebar">
      <ul className="user">
        <li>
          <image src="https://cdn-icons-png.flaticon.com/512/6326/6326055.png" alt="User Profile Image" />
        </li>
        <li>{user.username}</li>
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
