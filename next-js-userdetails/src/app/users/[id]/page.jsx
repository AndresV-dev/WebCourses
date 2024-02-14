async function getUser(id) {
  const res = await fetch(`https://reqres.in/api/users/${id}`);
  const data = await res.json();
  return data.data;
}

async function UserDetails({ params }) {
  const user = await getUser(params.id);
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-auto text-center">
      <img className="w-full" src={user.avatar} alt={user.first_name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{"Name: " + user.first_name + " " + user.last_name}</div>
        <p className="text-gray-700 text-base">Email: {user.email}</p>
      </div>
    </div>
  );
}

export default UserDetails;
