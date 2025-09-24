import React, {useContext} from "react";
import { ThemeContext } from "./ThemeContext";


const UsersTable = ({ users }) => {

  const {theme} = useContext(ThemeContext);
  return (
    <div className="card shadow-sm">
      <div className="card-body p-0">
        <table className="table mb-0">
          <thead className={`${theme === "dark" ? "table-white" : "table-light"}`}>
            <tr>
              <th>#</th>
              <th>Nom</th>
              <th>Email</th>
              <th>Rôle</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={u.id || i}>
                <td>{i + 1}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>
                  <button className="btn btn-sm btn-outline-primary me-2">Voir</button>
                  <button className="btn btn-sm btn-outline-danger">Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default UsersTable;