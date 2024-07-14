import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import EmployeeList from "../Components/EmployeeList";

export default function Home() {
  const [input, setInput] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const location = useLocation();

  const handleSearch = useCallback(
    (searchTerm) => {
      const query = searchTerm || input || "default";
      axios
        .get(`https://randomuser.me/api/?results=50&seed=${query}`)
        .then((response) => {
          const users = response.data.results;
          setAllUsers(users);
          localStorage.setItem("generatedUsers", JSON.stringify(users));
          filterUsers(users, query);
        })
        .catch((error) => console.error("Error fetching data:", error));
    },
    [input]
  );

  const filterUsers = (users, query) => {
    const lowercasedQuery = query.toLowerCase();
    const filtered = users.filter(
      (user) =>
        user.name.first.toLowerCase().includes(lowercasedQuery) ||
        user.name.last.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredUsers(filtered);
  };

  const addToFavorites = (user) => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!favorites.find((fav) => fav.login.uuid === user.login.uuid)) {
      localStorage.setItem("favorites", JSON.stringify([...favorites, user]));
    }
  };

  useEffect(() => {
    const search = new URLSearchParams(location.search).get("search");
    if (search) {
      setInput(search);
      handleSearch(search);
    } else {
      handleSearch();
    }
  }, [location, handleSearch]);

  useEffect(() => {
    filterUsers(allUsers, input);
  }, [input, allUsers]);

  return (
    <div className="container mt-3">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="btn btn-primary" onClick={() => handleSearch()}>
          Search
        </button>
      </div>
      <EmployeeList users={filteredUsers} addToFavorites={addToFavorites} />
    </div>
  );
}
