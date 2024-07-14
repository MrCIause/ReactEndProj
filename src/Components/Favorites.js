// src/Components/Favorites.js
import React from "react";
import { Link } from "react-router-dom";

export default function Favorites() {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  return (
    <div>
      <h2>מועדפים</h2>
      <table className="table table-bordered table-responsive">
        <tbody>
          {favorites.map((user, idx) => (
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
