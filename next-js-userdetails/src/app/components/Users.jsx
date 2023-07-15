function Users({ users }) {
  return (
    <div className="data">
      {users.data.map((user) => (
        <li key={user.id}>
          <div>
            <h5>
              {user.id} {user.name} {user.last_name}
            </h5>
            <p>{user.email}</p>
          </div>
          <img src={user.avatar} alt={user.email} />
        </li>
      ))}
    </div>
  );
}

export default Users;
