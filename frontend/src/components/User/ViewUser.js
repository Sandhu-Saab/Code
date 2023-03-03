import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";

import "../../layouts/preloader3.css";

import ViewUserForm from "./ViewUserForm";

/**
 * Displays the view user page of the specified user.
 * 
 * @returns The view user page of the specified user.
 */
function ViewUser() {
    const query = new URLSearchParams(useLocation().search);
    const userId = query.get("userId");

    let navigate = useNavigate();

    // const currentUserUserId = sessionStorage.getItem("userId");
    const currentUserRoleId = sessionStorage.getItem("roleId");
    const currentUserSection = sessionStorage.getItem("section");

    const [user, setUser] = useState();
    const [groups, setGroups] = useState([]);
    const [roles, setRolesList] = useState([]);
    const [sections, setSections] = useState([]);

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
            setUser({
                id: data.id,
                fname: data.first_name,
                lname: data.last_name,
                username: data.username,
                email: data.email,
                section: data.course_id,
                role: data.role,
                security_group: data.security_group
            });
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
     * Fetch all sections from the database and store it on Sections state.
     */
    const getSections = async() => {
        try {
            const response = await axios({
                method: "GET",
                url: "/api/courses/",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.data;
            setSections(data);
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
            setGroups(data);
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
     * has permissions to view the specified user's account.
     */
    const verifyUser = () => {
        let viewUserSection = user.section;

        if (currentUserRoleId === "3" || currentUserRoleId === "4") {
            // Instructor/Student is viewing another account from a different section.
            if (currentUserSection !== viewUserSection) {
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
        if (user && roles.length && sections.length) {
            verifyUser();
            setLoading(false);
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
                <ViewUserForm user={user} userId={userId} roles={roles} sections={sections} groups={groups}/>
            )}
        </div>
    )
}

export default ViewUser;