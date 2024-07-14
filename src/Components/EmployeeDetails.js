import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function EmployeeDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      const generatedUsers =
        JSON.parse(localStorage.getItem("generatedUsers")) || [];
      const userDetails =
        favorites.find((fav) => fav.login.uuid === id) ||
        generatedUsers.find((user) => user.login.uuid === id);

      if (userDetails) {
        console.log("Found user details in localStorage:", userDetails);
        setUser(userDetails);
      } else {
        try {
          const response = await axios.get(
            `https://randomuser.me/api/?uuid=${id}`
          );
          const fetchedUser = response.data.results[0];
          console.log("Fetched user details from API:", fetchedUser);
          setUser(fetchedUser);
        } catch (error) {
          console.error("User not found with id:", id);
        }
      }
    };

    fetchUser();
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const addToFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!favorites.find((fav) => fav.login.uuid === user.login.uuid)) {
      localStorage.setItem("favorites", JSON.stringify([...favorites, user]));
    }
  };

  const latitude = parseFloat(user.location.coordinates.latitude);
  const longitude = parseFloat(user.location.coordinates.longitude);

  console.log("User Coordinates:", { latitude, longitude });

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
        center={[latitude, longitude]}
        zoom={13}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[latitude, longitude]}>
          <Popup>{`${user.location.city}, ${user.location.country}`}</Popup>
        </Marker>
      </MapContainer>
      <button className="btn btn-warning" onClick={addToFavorites}>
        Save as favorite
      </button>
    </div>
  );
}
