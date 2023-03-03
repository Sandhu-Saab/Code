import React from "react";
import { Box } from "@mui/material";
import Sidebar2 from "../../../layouts/Sidebar2";
import AssetsDataGrid from "../../../components/Assets/AssetsDataGrid";
import Typography from "@mui/material/Typography";
//import AssetsTestDataGrid from "../components/Assets/AssetsTestDataGrid";
// Page for Asset List

function AssetList() {
  document.title = "All Assets " + "- PiXELL-River";

  const breadcrumbs = [
    <Typography key="3">Asset Management</Typography>,
    <Typography key="3" color="text.primary">
      All Assets
    </Typography>,
  ];

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Sidebar2 content={<AssetsDataGrid />} breadcrumbs={breadcrumbs}/>
      </Box>
    </div>
  );
}

export default AssetList;
