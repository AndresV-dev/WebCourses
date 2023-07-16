import Users from "@/app/components/Users";

async function fetchUsers() {
  const response = await fetch("https://reqres.in/api/users");
  const data = await response.json();
  return data;
}

async function IndexPage() {
  const users = await fetchUsers();
  return (
    <div>
      <div className="text-2xl font-bold ">Lista de Usuarios</div>

      <div className="mt-10">
        <Users users={users} />
      </div>
    </div>
  );
}

export default IndexPage;
