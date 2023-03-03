import axios from "axios";
import "../../layouts/preloader3.css";

import EditUserForm from "./EditUserForm";

import { useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";

/**
 * Displays the edit user page of the specified user.
 * 
 * @returns The edit user page of the specified user.
 */
function EditUser() {
    const query = new URLSearchParams(useLocation().search);
    const userId = query.get("userId");

    let navigate = useNavigate();

    const currentUserId = sessionStorage.getItem("userId");
    const currentUserRoleId = sessionStorage.getItem("roleId");
    const currentUserSection = sessionStorage.getItem("section");

    const [user, setUser] = useState();
    const [roles, setRolesList] = useState([]);
    const [sections, setSectionList] = useState([]);    
    const [group, setGroup] = useState([]);

    const [loading, setLoading] = useState(true);

    const token = sessionStorage.getItem("access");

    /**
     * Fetches the values of the users from the API.
     */
    const getUser = async() => {
        try {
            const response = await axios({
                method: "GET",
                url: `/api/viewSingleUser/?user=${userId}`,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
    
            const data = await response.data;
            setUser(data);
        } catch (error) {
            if (error.response) {
                console.log(error.response);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        }
    }

    /**
     * Fetches the values of the roles from the API.
     */
    const getRoles = async() => {
        try {
            const response = await axios({
                method: "GET",
                url: `/api/roles/`,
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
                url: `/api/courses/`,
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

    /**
     * Fetches the values of the groups from the API.
     */
    const getSecurityGroups = async() => {
        try {
            const response = await axios({
                method: "GET",
                url: `/api/securitygroups/`,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.data;
            setGroup(data);
        } catch (error) {
            if (error.response) {
                console.log(error.response);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        }
    }

    /**
     * Verifies if the current user is admin, student, instructor, etc. and 
     * has permissions to edit the specified user's account.
     */
    const verifyUser = () => {
        let viewUserId = user.id;
        let viewUserRole = user.role;
        let viewUserSection = user.course_id;

        // Instructor
        if (currentUserRoleId === "3") {
            // Instructor is editing another account from a different section.
            if (currentUserSection !== viewUserSection) {
                navigate("/user/class-all");
            }
        }

        // Student
        if (currentUserRoleId === "4") {
            // Student is editing another account.
            if (currentUserSection !== viewUserSection || currentUserId !== viewUserId) {
                navigate("/user/class-all");
            }
        }
    }

    useEffect(() => {
        getUser();
        getRoles();
        getSections();
        getSecurityGroups();
    }, []);

    useEffect(() => {
        if (user && roles.length && sections.length && group.length) {
            setLoading(false);
            verifyUser();
        }
    });

    return (
        <div>
            {loading ? (
                <div className="spinner">
                    <span>Loading. . .</span>
                    <div className="half-spinner"></div>
                </div>
            ) : (
                <>
                    <EditUserForm
                        user={user}
                        userId={userId}
                        roles={roles}
                        sections={sections}
                        secGroup={group}
                    />
                </>
            )}
        </div>
    )
}

export default EditUser;