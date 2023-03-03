import React from "react";
import { Grid, Paper, Box } from "@mui/material";

/**
 * Default Export function for creating change request
 * Child components: SelectAsset, RequestForm, BusinessJustificationForm, 
 *                                RiskAssessmentForm, InstallPlan, BackOutPlan
 */
function DashboardContent() {
document.title = "Dashboard " + "- PiXELL-River";
  
  return (
    <div>
      <Grid container Spacing={2}>
        <Grid item xs={6}>
          <Box>
            <Paper>
              {/* Top-Left dashboard insert here */}
              <iframe src="http://localhost:2345/d-solo/kMCEWcX7k/itsm?orgId=1&from=1653382139853&to=1653403739853&panelId=2"
                width="500"
                height="400"
                frameborder="0"
                title="Total Incident Tickets"
              ></iframe>
            </Paper>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Paper>
            {/* Top-Right dashboard insert here */}
            <iframe src="http://localhost:2345/d-solo/kMCEWcX7k/itsm?orgId=1&from=1651492800000&to=1656158400000&panelId=4"
              width="500"
              height="400"
              frameborder="0"
              title="Incident Tickets Stats"
            ></iframe>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>
            {/* Bottom-Left dashboard insert here */}
            <iframe src="http://localhost:2345/d-solo/kMCEWcX7k/itsm?orgId=1&from=1652659200000&to=1653436800000&panelId=10"
              width="500"
              height="400"
              frameborder="0"
              title="Incident Ticket Types"
            ></iframe>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>
            {/* Bottom-Right dashboard insert here */}
            <iframe src="http://localhost:2345/d-solo/kMCEWcX7k/itsm?orgId=1&from=1652659200000&to=1653436800000&panelId=8"
              width="500"
              height="400"
              frameborder="0"
              title="Incident Ticket Priority"
            ></iframe>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default DashboardContent;
