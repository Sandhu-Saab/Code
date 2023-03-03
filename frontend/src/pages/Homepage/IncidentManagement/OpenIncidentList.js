import React from "react";
import { Box } from "@mui/material";
import Sidebar2 from "../../../layouts/Sidebar2";
import OpenIncidentDataGrid from "../../../components/Incident/OpenIncident";
import Typography from "@mui/material/Typography";
// Page for Incident Ticket List

function OpenIncidentTicketList() {
  const breadcrumbs = [
    <Typography key="3" >
      Incident Management
      </Typography>,
    <Typography key="3" color="text.primary">
      All Open Incident Tickets
    </Typography>,
  ];
  document.title = "Open Incident Tickets " + "- PiXELL-River";

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Sidebar2 content={<OpenIncidentDataGrid />} breadcrumbs={breadcrumbs}/>;
      </Box>
    </div>
  );
}

export default OpenIncidentTicketList;
