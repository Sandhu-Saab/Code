import React, { useState, useEffect } from "react";
import axios from "axios";

/**
 * Retrieves and returns all user's data
 * @returns The data of all users
 */
function getUsers() {

    const [users, setUsers] = useState([]);

    const token = sessionStorage.getItem("access");

    axios({
        method: "GET",
        url: "http://127.0.0.1:8000/api/assignedusers/",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          setUsers(response.data);
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
        });
    return users;
}

export default getUsers;