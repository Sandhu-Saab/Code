import axios from "axios";
import "../../layouts/preloader3.css";

import { useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import EditSectionForm from "./EditSectionForm";

/**
 * Displays the edit section page.
 * 
 * @returns The edit section page.
 */
function EditSection() {
    const query = new URLSearchParams(useLocation().search);
    const sectionId = query.get("courseId");

    let navigate = useNavigate();

    const [section, setSection] = useState();
    const [loading, setLoading] = useState(true);

    const token = sessionStorage.getItem("access");

    /**
     * Fetches the values of the section from the API.
     */
    const getSection = async() => {
        try {
            const response = await axios({
                method: "GET",
                url: `/api/viewSingleCourse/?courseId=${sectionId}`,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
    
            const data = await response.data;
            setSection(data);
        } catch (error) {
            if (error.response) {
                console.log(error.response);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        }
    }
    useEffect(() => {
        getSection();
    }, []);

    useEffect(() => {
        if (section) {
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
                <>
                    <EditSectionForm 
                      section={section}
                    />
                </>
            )}
        </div>
    )
}

export default EditSection;