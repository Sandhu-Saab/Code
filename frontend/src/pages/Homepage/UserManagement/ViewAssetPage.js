import React from "react";
import { Box } from "@mui/material";
import Sidebar2 from "../../../layouts/Sidebar2";
import ViewAsset from "./ViewAsset";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { useLocation } from "react-router-dom";

/**
 * View page for viewing an Asset.
 *
 * @returns View Asset Page Form.
 */
function ViewAssetPage() {
  const query = new URLSearchParams(useLocation().search);
  const assetId = query.get("assetId");

  const breadcrumbs = [
    <Typography key="3">Asset Management</Typography>,
    <Link underline="hover" key="2" color="inherit" href="/asset/all">
      Asset List
    </Link>,
    <Typography key="3">View</Typography>,
    <Typography key="3" color="text.primary">
      Asset #{assetId}
    </Typography>,
  ];

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Sidebar2 content={<ViewAsset />} breadcrumbs={breadcrumbs} />
      </Box>
    </>
  );
}

export default ViewAssetPage;
