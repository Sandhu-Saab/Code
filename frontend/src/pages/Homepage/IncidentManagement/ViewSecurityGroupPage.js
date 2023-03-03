import React from "react";
import { Box } from "@mui/material";
import Sidebar2 from "../../../layouts/Sidebar2";
import ViewSecurityGroupUsers from "../../../components/Incident/ViewSecurityGroupUsers";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { useLocation } from "react-router-dom";
// Page for Security Group Users List

function ViewSecurityGroupPage() {
  const query = new URLSearchParams(useLocation().search);
  const id = query.get("securityGroupId");

  const breadcrumbs = [
    <Typography key="3">Incident Management</Typography>,
    <Link underline="hover" key="2" color="inherit" href="/incident/securitygroup/new">
      Security Group
    </Link>,
    <Typography key="3" color="text.primary">
      Security Group ID #{id} Users
    </Typography>,
  ];

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Sidebar2
          content={<ViewSecurityGroupUsers />}
          breadcrumbs={breadcrumbs}
        />
      </Box>
    </div>
  );
}

export default ViewSecurityGroupPage;
