import * as React from "react";
import Sidebar2 from "../../../layouts/Sidebar2";
import { Box} from "@mui/material";
import DashboardContent from "./DashboardContent";
import Typography from "@mui/material/Typography";

// Page for Dashboard

function Dashboard() {
  const breadcrumbs = [
    <Typography key="3" color="text.primary">
      Dashboard
    </Typography>,
  ];

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Sidebar2 content={<DashboardContent />} breadcrumbs={breadcrumbs}/>
      </Box>
    </div>
  );
}

export default Dashboard;
