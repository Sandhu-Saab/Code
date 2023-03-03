import React from "react";
import { Box } from "@mui/material";
import Sidebar2 from "../../../layouts/Sidebar2";
import CreateSecurityGroup from "../../../components/Incident/CreateSecurityGroup";
import Typography from "@mui/material/Typography";

// Page for Create new asset

function NewSecurityGroupPage() {
  const breadcrumbs = [
    <Typography key="3">Incident Management</Typography>,
    <Typography key="3">Security Group</Typography>,
    <Typography key="3" color="text.primary">
      New Security Group
    </Typography>,
  ];

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Sidebar2 content={<CreateSecurityGroup />} breadcrumbs={breadcrumbs} />
      </Box>
    </div>
  );
}

export default NewSecurityGroupPage;
