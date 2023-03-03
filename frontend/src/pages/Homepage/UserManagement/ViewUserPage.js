import React from 'react';
import { Box } from "@mui/material";
import ViewUser from "../../../components/User/ViewUser";
import Sidebar2 from "../../../layouts/Sidebar2";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { useLocation } from "react-router-dom";

// Page for User View Page

function ViewUserPage() {
  const query = new URLSearchParams(useLocation().search);
  const sectionId = query.get("sectionId");

  const breadcrumbs = [
    <Typography key="3">User Management</Typography>,
    <Link underline="hover" key="2" color="inherit" href="/user/all">
      Users List
    </Link>,
    <Typography key="3">View</Typography>,
    <Typography key="3" color="text.primary">
      User ID #{sectionId}
    </Typography>,
  ];

  return(
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Sidebar2 content={<ViewUser />} breadcrumbs={breadcrumbs}/>
      </Box>
    </div>
  )
}

export default ViewUserPage;
