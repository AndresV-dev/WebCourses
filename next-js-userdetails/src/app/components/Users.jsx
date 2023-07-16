// indica que la funcion se ejecuta en el cliente
"use client";
import { useRouter } from "next/navigation";

function Users({ users }) {
  const router = useRouter();
  return (
    <div className="">
      {users.data.map((user) => (
        <li className="grid grid-cols-2 justify-between border-2 border-gray-500 my-3 p-3 rounded-md list-none" key={user.id} onClick={() => router.push(`/users/${user.id}`)}>
          <div>
            <h5>
              {user.id} {user.name} {user.last_name}
            </h5>
            <p>{user.email}</p>
          </div>
          <img className="w-30 h-30 mr-5 rounded-full justify-self-end" src={user.avatar} alt={user.email} />
        </li>
      ))}
    </div>
  );
}

export default Users;
