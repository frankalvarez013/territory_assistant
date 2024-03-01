// In /hooks/useFetchUsers.js
import { useState, useEffect } from "react";

export default function useFetchUsers() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch(`/api/user`);
      if (!response.ok) {
        console.error("Failed to fetch user data");
        return;
      }
      const data = await response.json();
      setUsers(data);
    }

    fetchUsers();
  }, []);

  return users;
}
