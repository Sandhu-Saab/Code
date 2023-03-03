import React from "react";
import { Box } from "@mui/material";
import Sidebar2 from "../../../layouts/Sidebar2";
import EditUser from "../../../components/User/EditUser";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { useLocation } from "react-router-dom";
// Page for User View Page

function EditUserPage() {
  const query = new URLSearchParams(useLocation().search);
  const userId = query.get("userId");

  const breadcrumbs = [
    <Typography key="3">User Management</Typography>,
    <Link underline="hover" key="2" color="inherit" href="/user/all">
      Users List
    </Link>,
    <Typography key="3">Edit</Typography>,
    <Typography key="3" color="text.primary">
      User ID #{userId}
    </Typography>,
  ];

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Sidebar2 content={<EditUser />} breadcrumbs={breadcrumbs} />
      </Box>
    </div>
  );
}

export default EditUserPage;
