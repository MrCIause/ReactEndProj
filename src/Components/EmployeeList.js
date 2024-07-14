import React from "react";
import { Link } from "react-router-dom";

export default function EmployeeList({ users, addToFavorites }) {
  return (
    <div className="container mt-3">
      <h2>Employee List</h2>
      <div className="row">
        {users.map((user, idx) => (
          <div className="col-md-3 mb-3" key={idx}>
            <div className="card h-100">
              <img
                src={user.picture.thumbnail}
                alt={`${user.name.first} ${user.name.last}`}
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">{`${user.name.first} ${user.name.last}`}</h5>
                <p className="card-text">{user.email}</p>
                <p className="card-text">Age: {user.dob.age}</p>
                <p className="card-text">{`${user.location.city}, ${user.location.country}`}</p>
              </div>
              <div className="card-footer">
                <Link to={`/employee/${user.login.uuid}`}>
                  <button className="btn btn-info btn-sm me-2">Details</button>
                </Link>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => addToFavorites(user)}
                >
                  Add to Favorites
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
