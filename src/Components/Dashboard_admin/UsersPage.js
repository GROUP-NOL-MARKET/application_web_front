import React from "react";
import UsersTable from "./UsersTable";

const UsersPage = () => {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
  
    setUsers([
      { id: 1, name: 'Alice', email: 'alice@example.com', role: 'User' },
      { id: 2, name: 'Bob', email: 'bob@example.com', role: 'Moderator' }
    ]);
  }, []);

  return (
    <div>
      <h4>Liste des utilisateurs</h4>
      <UsersTable users={users} />
    </div>
  );
};
export default UsersPage;
