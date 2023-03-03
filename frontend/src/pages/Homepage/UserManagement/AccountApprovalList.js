import React, { useEffect } from "react";
import { Box, } from "@mui/material";
import Sidebar2 from "../../../layouts/Sidebar2";
import UserRequestGrid from "../../../components/User/AccountApprovalListForm";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

// Page for User Request List
function AccountApprovalList() {
  let navigate = useNavigate();

  const currentUserRoleId = sessionStorage.getItem("roleId");

  const breadcrumbs = [
    <Typography key="3">User Management</Typography>,
    <Typography key="3" color="text.primary">
      User Approval List
    </Typography>,
  ];
  
  document.title = "Account Approval " + "- PiXELL-River";

  /**
   * Verifies if the current user is able to have access account approval page.
   */
  const verifyUser = () =>{
    if (currentUserRoleId === "4") navigate("/dash");
  }

  useEffect(() => {
    verifyUser();
  }, []);
  
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Sidebar2 content={<UserRequestGrid />} breadcrumbs={breadcrumbs}/>
      </Box>
    </div>
  );
}

export default AccountApprovalList;