// src/Components/EmployeeList.js
import React from "react";
import { Link } from "react-router-dom";

export default function EmployeeList({ users }) {
  const addToFavorites = (user) => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    localStorage.setItem("favorites", JSON.stringify([...favorites, user]));
  };

  return (
    <div>
      <h2>תוצאות חיפוש</h2>
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
                <p>{user.dob.age} שנים</p>
                <p>{`${user.location.city}, ${user.location.country}`}</p>
                <Link to={`/employee/${user.login.uuid}`}>
                  <button className="btn btn-info">פרטים נוספים</button>
                </Link>
                <button
                  className="btn btn-warning"
                  onClick={() => addToFavorites(user)}
                >
                  הוסף למועדפים
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
