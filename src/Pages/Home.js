// src/Pages/Home.js
import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import EmployeeList from "../Components/EmployeeList";

export default function Home() {
  const [input, setInput] = useState("");
  const [users, setUsers] = useState([]);
  const location = useLocation();
  const randomChange = Math.random();

  const handleSearch = useCallback(
    (searchTerm) => {
      const query = searchTerm || input;
      axios
        .get(`https://randomuser.me/api/?results=10&seed=${query}`)
        .then((response) => {
          setUsers(response.data.results);
        })
        .catch((error) => console.error("Error fetching data:", error));
    },
    [input]
  );

  useEffect(() => {
    const search = new URLSearchParams(location.search).get("search");
    if (search) {
      setInput(search);
      handleSearch(search);
    }
  }, [location, handleSearch]);

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
          חפש
        </button>
      </div>
      <EmployeeList users={users} />
    </div>
  );
}
