import React from "react";
import { Box } from "@mui/material";
import Sidebar2 from "../../../layouts/Sidebar2";
import OpenProblem from "../../../components/Problem/OpenProblems";
import Typography from "@mui/material/Typography";
// Page for Open Problem Ticket List

function OpenProblemPage() {
  const breadcrumbs = [
    <Typography key="3" >
      Problem Management
      </Typography>,
    <Typography key="3" color="text.primary">
      All Open Problem Tickets
    </Typography>,
  ];

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Sidebar2 content={<OpenProblem />} breadcrumbs={breadcrumbs}/>
      </Box>
    </div>
  );
}

export default OpenProblemPage;
