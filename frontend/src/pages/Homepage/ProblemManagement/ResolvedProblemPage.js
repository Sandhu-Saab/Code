import React from "react";
import { Box } from "@mui/material";
import Sidebar2 from "../../../layouts/Sidebar2";
import ResolvedProblem from "../../../components/Problem/ResolvedProblems";
import Typography from "@mui/material/Typography";
// Page for Resolved Problem Ticket List

function ResolvedProblemPage() {
  const breadcrumbs = [
    <Typography key="3" >
      Problem Management
      </Typography>,
    <Typography key="3" color="text.primary">
      All Resolved Problem Tickets
    </Typography>,
  ];

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Sidebar2 content={<ResolvedProblem />} breadcrumbs={breadcrumbs}/>
      </Box>
    </div>
  );
}

export default ResolvedProblemPage;
