import React from "react";
import { Box } from "@mui/material";
import Sidebar2 from '../../../layouts/Sidebar2';
import EditSecurityGroup from "../../../components/Incident/EditSecurityGroup";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

function EditSecurityGroupPage() {
  const breadcrumbs = [
    <Typography key="3">Incident Management</Typography>,
    <Link underline="hover" key="2" color="inherit" href="/incident/securitygroup/new">
      Security Group
    </Link>,
    <Typography key="3" color="text.primary">
      Edit Security Group
    </Typography>,
  ];

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Sidebar2 content={<EditSecurityGroup />} breadcrumbs={breadcrumbs} />
      </Box>
    </div>
  );
}

export default EditSecurityGroupPage;
