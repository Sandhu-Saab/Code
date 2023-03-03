import React from "react";
import { Box } from "@mui/material";
import Sidebar2 from "../../../layouts/Sidebar2";
import ViewProblem from "../../../components/Problem/ViewProblem";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { useLocation } from "react-router-dom";
// Page for Problem View Page

function Problem() {
  const query = new URLSearchParams(useLocation().search);
  const problemId = query.get("problemId");

  const breadcrumbs = [
    <Typography key="3">Problem Management</Typography>,
    <Link underline="hover" key="2" color="inherit" href="/problem/all">
      Problem List
    </Link>,
    <Typography key="3">View</Typography>,
    <Typography key="3" color="text.primary">
      Problem Ticket #{problemId}
    </Typography>,
  ];

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Sidebar2 content={<ViewProblem />} breadcrumbs={breadcrumbs} />
      </Box>
    </div>
  );
}

export default Problem;
