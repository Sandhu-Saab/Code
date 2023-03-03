import React from "react";
import { Box } from "@mui/material";
import Sidebar2 from '../../../layouts/Sidebar2';
import ViewIncident from "../../../components/Incident/ViewIncident";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { useLocation } from "react-router-dom";
// Page for Incident View Page

function Incident() {
  const query = new URLSearchParams(useLocation().search);
  const incidentId = query.get("incidentId");

  const breadcrumbs = [
    <Typography key="3">Incident Management</Typography>,
    <Link underline="hover" key="2" color="inherit" href="/incident/all">
      Incident List
    </Link>,
    <Typography key="3">View</Typography>,
    <Typography key="3" color="text.primary">
      Incident Ticket #{incidentId}
    </Typography>,
  ];

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Sidebar2 content={<ViewIncident />} breadcrumbs={breadcrumbs} />
      </Box>
    </div>
  );
}

export default Incident;
