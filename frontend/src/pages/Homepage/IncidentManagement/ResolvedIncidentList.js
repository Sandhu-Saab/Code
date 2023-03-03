import React from "react";
import { Box } from "@mui/material";
import Sidebar2 from "../../../layouts/Sidebar2";
import ResolvedIncidentDataGrid from "../../../components/Incident/ResolvedIncident";
import Typography from "@mui/material/Typography";
// Page for Incident Ticket List

function ResolvedIncidentTicketList() {
  const breadcrumbs = [
    <Typography key="3" >
      Incident Management
      </Typography>,
    <Typography key="3" color="text.primary">
      All Resolved Incident Tickets
    </Typography>,
  ];

  document.title = "Resolved Incident Tickets " + "- PiXELL-River";

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Sidebar2 content={<ResolvedIncidentDataGrid />} breadcrumbs={breadcrumbs}/>;
      </Box>
    </div>
  );
}

export default ResolvedIncidentTicketList;
