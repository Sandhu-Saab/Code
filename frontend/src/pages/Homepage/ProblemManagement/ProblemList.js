import React from "react";
import { Box } from "@mui/material";
import ProblemDataGrid from "../../../components/Problem/ProblemDataGrid";
import Sidebar2 from "../../../layouts/Sidebar2";
import Typography from "@mui/material/Typography";
// Page for Problem Ticket List

function ProblemTicketList() {
  const breadcrumbs = [
    <Typography key="3" >
      Problem Management
      </Typography>,
    <Typography key="3" color="text.primary">
      All Problem Tickets
    </Typography>,
  ];
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Sidebar2 content={<ProblemDataGrid />} breadcrumbs={breadcrumbs}/>
      </Box>
    </div>
  );
}

export default ProblemTicketList;
