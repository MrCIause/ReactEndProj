import React from "react";
import { Link } from "react-router-dom";

export default function Favorites() {
  const [favorites, setFavorites] = React.useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  const removeFromFavorites = (uuid) => {
    const updatedFavorites = favorites.filter(
      (user) => user.login.uuid !== uuid
    );
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  return (
    <div>
      <h2>Favorites</h2>
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
                <p>Age: {user.dob.age}</p>
                <p>{`${user.location.city}, ${user.location.country}`}</p>
                <Link to={`/employee/${user.login.uuid}`}>
                  <button className="btn btn-info">Details</button>
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => removeFromFavorites(user.login.uuid)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
