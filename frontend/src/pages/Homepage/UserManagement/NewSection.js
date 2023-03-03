import React, { useEffect } from "react";
import { Box } from "@mui/material";
import Sidebar2 from "../../../layouts/Sidebar2";
import CreateSection from "../../../components/User/CreateSection";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
// Page for Create new user

function NewUser() {
    let navigate = useNavigate();

    const currentUserId = sessionStorage.getItem("userId");
    const currentUserRoleId = sessionStorage.getItem("roleId");

    const breadcrumbs = [
        <Typography key="3">User Management</Typography>,
        <Typography key="3" color="text.primary">
          New Section
        </Typography>,
      ];

    document.title = "Create Section " + "- PiXELL-River";

    /**
     * Verifies if the current user is admin, student, instructor, etc. and 
     * has permissions to create a new section.
     */
    const verifyUser = () => {
        // Instructor and students are not permitted
        if (currentUserRoleId === "3" || currentUserId === "4") {
            navigate("/user/class-all");
        }
    }

    useEffect(() => {
        verifyUser();
    }, []);

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Sidebar2 content={<CreateSection />} breadcrumbs={breadcrumbs}/>
            </Box>
        </>
    )
}

export default NewUser;
