// src/Components/EmployeeDetails.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function EmployeeDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`https://randomuser.me/api/?uuid=${id}`)
      .then((response) => {
        setUser(response.data.results[0]);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const addToFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    localStorage.setItem("favorites", JSON.stringify([...favorites, user]));
  };

  return (
    <div>
      <h2>פרטים נוספים על {`${user.name.first} ${user.name.last}`}</h2>
      <p>טלפון: {user.phone}</p>
      <p>כתובת מייל: {user.email}</p>
      <p>
        כתובת מלאה:{" "}
        {`${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.country}`}
      </p>
      <p>תמונה:</p>
      <img src={user.picture.large} alt="User Large" />
      <MapContainer
        center={[
          user.location.coordinates.latitude,
          user.location.coordinates.longitude,
        ]}
        zoom={13}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker
          position={[
            user.location.coordinates.latitude,
            user.location.coordinates.longitude,
          ]}
        >
          <Popup>{`${user.location.city}, ${user.location.country}`}</Popup>
        </Marker>
      </MapContainer>
      <button className="btn btn-warning" onClick={addToFavorites}>
        שמור מועדף
      </button>
    </div>
  );
}
