import axios from "axios";
import React, { useState, useEffect } from "react";

import CreateUserForm from "./UserForm/CreateUserForm";
import CreateUserStudentForm from "./UserForm/CreateUserStudentForm";

/**
 * Displays the create user page.
 * 
 * @returns The create user page.
 */
function CreateUser() {
  document.title = "Create User " + "- PiXELL-River";

  const [roles, setRolesList] = useState([]);
  const [sections, setSectionList] = useState([]);

  const [loading, setLoading] = useState(true);

  const token = sessionStorage.getItem("access");
  let currentUserRole = sessionStorage.getItem("roleId");

  useEffect(() => {
      getRoles();
      getSections();
  }, []);

  useEffect(() => {
    if (roles) {
        setLoading(false);
    }
  });

  /**
   * Fetches the values of the roles from the API.
   */
  const getRoles = async() => {
    try {
        const response = await axios({
            method: "GET",
            url: `/api/filterRole/`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await response.data;
        
        setRolesList(data);
    } catch (error) {
        if (error.response) {
            console.log(error.response);
            console.log(error.response.status);
            console.log(error.response.headers);
        }
    }
  }

  /**
   * Fetches the values of the sections from the API.
   */
  const getSections = async() => {
    try {
        const response = await axios({
            method: "GET",
            url: `/api/filterCourses/`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await response.data;
        setSectionList(data);
    } catch (error) {
        if (error.response) {
            console.log(error.response);
            console.log(error.response.status);
            console.log(error.response.headers);
        }
    }
  }

  let userForm = <CreateUserForm roles={roles} sections={sections} />;

  if (currentUserRole === "4") {
    userForm = <CreateUserStudentForm />;
  }

  return (
    <div>
        {loading ? (
          <div className="spinner">
              <span>Loading. . .</span>
              <div className="half-spinner"></div>
          </div>
        ) : (
          <>
            {userForm}
          </>
        )}
    </div>
  );
}

export default CreateUser;
