import React from 'react'
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Sidebar2 from "../../../layouts/Sidebar2";
import ExportDataLayout from './ExportDataLayout';

// Page for Create export data

function ExportDataPage() {
  document.title = "Export Data " + "- PiXELL-River";

  const breadcrumbs = [
    <Typography key="3">Export Data</Typography>,
    // <Typography key="3" color="text.primary">
    //   Select Which data you want to  downloaded
    // </Typography>,
  ];

  return (
    <div>
        <Box sx={{ flexGrow: 1 }}>
        <Sidebar2 content={<ExportDataLayout />} breadcrumbs={breadcrumbs}/>
        </Box>
    </div>
  );
}

export default ExportDataPage;