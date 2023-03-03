import { Box, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import SectionDataGrid from '../../../components/User/SectionDataGrid';
import Sidebar2 from '../../../layouts/Sidebar2'

function SectionList() {
    let navigate = useNavigate();

    const currentUserRoleId = sessionStorage.getItem("roleId");

    const breadcrumbs = [
        <Typography key="3">User Management</Typography>,
        <Typography key="3" color="text.primary">
            All Sections
        </Typography>,
    ];

    /**
      * Verifies if the current user is admin, student, instructor, etc. and 
      * has permissions to create a new section.
      */
    const verifyUser = () => {
        // Instructor and students are not permitted
        if (currentUserRoleId === "3" || currentUserRoleId === "4") {
            navigate("/user/class-all");
        }
    }

    useEffect(() => {
        verifyUser();
    }, []);
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <Sidebar2 content={<SectionDataGrid />} breadcrumbs={breadcrumbs} />
            </Box>
        </div>
    )
}

export default SectionList