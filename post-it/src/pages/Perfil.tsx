import { useLocation } from "react-router-dom";
import { useState } from "react";
import { User } from "../types";

export default function Perfil() {
  let { state } = useLocation();
  const [user, setUser] = useState<User>(state.user);
  return <div>User Info: {JSON.stringify(user || "User Info Not Available")}</div>;
}
