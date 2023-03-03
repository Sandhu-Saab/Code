import React, { useEffect } from "react";
import { Box } from "@mui/material";
import Sidebar2 from "../../../layouts/Sidebar2";
import UserDataGrid from "../../../components/User/UserDataGrid";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

// Page for User List

function UserList() {
  let navigate = useNavigate();

  const currentUserRoleId = sessionStorage.getItem("roleId");

  const breadcrumbs = [
    <Typography key="3">User Management</Typography>,
    <Typography key="3" color="text.primary">
      All Users
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
        <Sidebar2 content={<UserDataGrid />} breadcrumbs={breadcrumbs}/>
      </Box>
    </div>
  );
}

export default UserList;
