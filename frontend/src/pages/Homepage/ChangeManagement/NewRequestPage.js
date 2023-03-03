import React from 'react'
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Sidebar2 from "../../../layouts/Sidebar2";
import CreateRequestForm from "../../../components/Change/CreateRequestForm";

// Page for Create new request

function NewRequestPage() {
  document.title = "New Change Request " + "- PiXELL-River";

  const breadcrumbs = [
    <Typography key="3">Change Management</Typography>,
    <Typography key="3" color="text.primary">
      New Change Request
    </Typography>,
  ];

  return (
    <div>
        <Box sx={{ flexGrow: 1 }}>
          <Sidebar2 content={
            <>
              <CreateRequestForm /> 
            </>
          }
          breadcrumbs={breadcrumbs}
          />
        </Box>
    </div>
  );
}

export default NewRequestPage;