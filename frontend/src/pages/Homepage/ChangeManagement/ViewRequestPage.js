import React from 'react';
import { Box } from "@mui/material";
import Link from "@mui/material/Link";
import { useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Sidebar2 from "../../../layouts/Sidebar2";
import ViewRequest from "../../../components/Change/ViewRequest";

function ViewRequestPage() {
    const query = new URLSearchParams(useLocation().search);
    const changeId = query.get("changeId");

    const breadcrumbs = [
        <Typography key="3">Change Management</Typography>,
        <Link underline="hover" key="2" color="inherit" href="/change/all">
            Change Request List
        </Link>,
        <Typography key="3">View</Typography>,
        <Typography key="3" color="text.primary">
            Change Request #{changeId}
        </Typography>,
    ];

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Sidebar2 content={<ViewRequest />} breadcrumbs={breadcrumbs}/>
            </Box>
        </>
    )
}

export default ViewRequestPage;