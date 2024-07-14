import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function EmployeeDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const userDetails = favorites.find((fav) => fav.login.uuid === id);
    if (userDetails) {
      setUser(userDetails);
      console.log("User Details:", userDetails);
    }
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const addToFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    localStorage.setItem("favorites", JSON.stringify([...favorites, user]));
  };

  const validateCoordinates = (latitude, longitude) => {
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);
    if (
      isNaN(lat) ||
      isNaN(lon) ||
      lat < -90 ||
      lat > 90 ||
      lon < -180 ||
      lon > 180
    ) {
      return false;
    }
    return true;
  };

  const latitude = user.location.coordinates.latitude;
  const longitude = user.location.coordinates.longitude;

  if (!validateCoordinates(latitude, longitude)) {
    console.error("Invalid coordinates:", { latitude, longitude });
    return <div>Invalid location data.</div>;
  }

  const lat = parseFloat(latitude);
  const lon = parseFloat(longitude);

  return (
    <div>
      <h2>More info: {`${user.name.first} ${user.name.last}`}</h2>
      <p>Phone: {user.phone}</p>
      <p>Email: {user.email}</p>
      <p>
        Address:{" "}
        {`${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.country}`}
      </p>
      <p>Picture: </p>
      <img src={user.picture.large} alt="User Large" />
      <MapContainer
        center={[lat, lon]}
        zoom={13}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[lat, lon]}>
          <Popup>{`${user.location.city}, ${user.location.country}`}</Popup>
        </Marker>
      </MapContainer>
      <button className="btn btn-warning" onClick={addToFavorites}>
        Save as favorite
      </button>
    </div>
  );
}
