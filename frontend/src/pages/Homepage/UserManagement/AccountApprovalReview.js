import React from "react";
import Navbar from "../../../layouts/Navbar";
import Sidebar from "../../../layouts/Sidebar";
import { Box, Grid } from "@mui/material";
import Sidebar2 from "../../../layouts/Sidebar2";
import AccountApprovalReview from "../../../components/User/AccountApprovalReviewForm";

// Page for reviewing user request

function AccountApprovalReviewPage() {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Sidebar2 content={<AccountApprovalReview />}/>
      </Box>
    </div>
  );
}

export default AccountApprovalReviewPage;