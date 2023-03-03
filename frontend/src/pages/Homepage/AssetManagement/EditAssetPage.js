import React from "react";
import { Box } from "@mui/material";
import Sidebar2 from "../../../layouts/Sidebar2";
import EditAsset from "../../../components/Assets/EditAsset";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { useLocation } from "react-router-dom";
/**
 * Edit page for editing an Asset.
 *
 * @returns Edit Asset Page Form.
 */
function EditAssetPage() {
  const query = new URLSearchParams(useLocation().search);
  const assetId = query.get("assetId");

  const breadcrumbs = [
    <Typography key="3">Asset Management</Typography>,
    <Link underline="hover" key="2" color="inherit" href="/asset/all">
      Asset List
    </Link>,
    <Typography key="3">Edit</Typography>,
    <Typography key="3" color="text.primary">
      Asset #{assetId}
    </Typography>,
  ];

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Sidebar2 content={<EditAsset />} breadcrumbs={breadcrumbs} />
      </Box>
    </>
  );
}

export default EditAssetPage;
