import React from 'react';
import {Box,} from "@mui/material";
import CreateProblem from "../../../components/Problem/CreateProblem";
import Sidebar2 from "../../../layouts/Sidebar2";
import Typography from "@mui/material/Typography";
// Page for Create new Problem

function NewProblem() {
  const breadcrumbs = [
    <Typography key="3" >
      Problem Management
      </Typography>,
    <Typography key="3" color="text.primary">
      New Problem
    </Typography>,
  ];
  return(
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Sidebar2 content={<CreateProblem />}breadcrumbs={breadcrumbs}/>
      </Box>
    </div>
  );
}

export default NewProblem;
