import React from "react";
import { Box } from "@mui/material";
import Sidebar2 from "../../../layouts/Sidebar2";
import CreateUser from "../../../components/User/CreateUser";
import Typography from "@mui/material/Typography";

// Page for Create new user

function NewUser() {
  const breadcrumbs = [
    <Typography key="3">User Management</Typography>,
    <Typography key="3" color="text.primary">
      New User
    </Typography>,
  ];

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Sidebar2 content={<CreateUser />} breadcrumbs={breadcrumbs}/>
      </Box>
    </div>
  );
}

export default NewUser;
