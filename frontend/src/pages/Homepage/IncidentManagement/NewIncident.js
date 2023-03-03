import React from 'react';
import {Box,} from "@mui/material";
import CreateIncident from "../../../components/Incident/CreateIncident";
import Sidebar2 from "../../../layouts/Sidebar2";
import Typography from "@mui/material/Typography";

// Page for Create new incident

function NewIncident() {

  const breadcrumbs = [
    <Typography key="3" >
      Incident Management
      </Typography>,
    <Typography key="3" color="text.primary">
      New Incident
    </Typography>,
  ];

  return(
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Sidebar2 content={<CreateIncident />} breadcrumbs={breadcrumbs}/>
      </Box>
    </div>
  );
}

export default NewIncident;
