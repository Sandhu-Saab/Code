import React from 'react';
import {Box,} from "@mui/material";
import Sidebar2 from "../../../layouts/Sidebar2";
import EditProblem from "../../../components/Problem/EditProblem";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { useLocation } from "react-router-dom";

// Page for Problem Edit Page

function EditProblemPage() {
  const query = new URLSearchParams(useLocation().search);
  const problemId = query.get("problemId");

  const breadcrumbs = [
    <Typography key="3">Problem Management</Typography>,
    <Link underline="hover" key="2" color="inherit" href="/problem/all">
      Problem List
    </Link>,
    <Typography key="3">Edit</Typography>,
    <Typography key="3" color="text.primary">
      Problem Ticket #{problemId}
    </Typography>,
  ];

  return(
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Sidebar2 content={<EditProblem />} breadcrumbs={breadcrumbs}/>
      </Box>
    </div>
  );
}

export default EditProblemPage;
