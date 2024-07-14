import React from "react";
import { Link } from "react-router-dom";

export default function EmployeeList({ users, addToFavorites }) {
  return (
    <div>
      <h2>Employee List</h2>
      <table className="table table-bordered table-responsive">
        <tbody>
          {users.map((user, idx) => (
            <tr key={idx}>
              <td className="text-center align-middle">
                <img
                  src={user.picture.thumbnail}
                  alt={`${user.name.first} ${user.name.last}`}
                  className="img-fluid"
                  style={{ maxHeight: "150px" }}
                />
                <p>{`${user.name.first} ${user.name.last}`}</p>
                <p>{user.email}</p>
                <p>Age: {user.dob.age}</p>
                <p>{`${user.location.city}, ${user.location.country}`}</p>
                <Link to={`/employee/${user.login.uuid}`}>
                  <button className="btn btn-info">Details</button>
                </Link>
                <button
                  className="btn btn-warning"
                  onClick={() => addToFavorites(user)}
                >
                  Add to Favorites
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
