import React from "react";
import { Box } from "@mui/material";
import Sidebar2 from "../../../layouts/Sidebar2";
import IncidentDataGrid from "../../../pages/Homepage/IncidentManagement/IncidentDataGrid";
import Typography from "@mui/material/Typography";
// Page for Incident Ticket List

function IncidentTicketList() {
  const breadcrumbs = [
    <Typography key="3" >
      Incident Management
      </Typography>,
    <Typography key="3" color="text.primary">
      All Incident Tickets
    </Typography>,
  ];

  document.title = "All Incident Tickets " + "- PiXELL-River";
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Sidebar2 content={<IncidentDataGrid />} breadcrumbs={breadcrumbs}/>;
      </Box>
    </div>
  );
}

export default IncidentTicketList;
