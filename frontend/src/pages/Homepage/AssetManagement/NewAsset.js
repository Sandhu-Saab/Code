import React from 'react'
import { Box, } from "@mui/material";
import Sidebar2 from "../../../layouts/Sidebar2";
import CreateAssetPage from "../../../components/Assets/CreateAssetPage";
import Typography from "@mui/material/Typography";

// Page for Create new asset

const breadcrumbs = [
    <Typography key="3">Asset Management</Typography>,
    <Typography key="3" color="text.primary">
      New Asset
    </Typography>,
  ];

function NewAsset() {
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <Sidebar2 content={<CreateAssetPage />} breadcrumbs={breadcrumbs}/>
            </Box>
        </div>
    );
}

export default NewAsset;