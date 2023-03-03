import React from 'react'
import {
  List,
  ListSubheader,
  ListItemButton,
  ListItemText,
  Collapse,
  Grid,
  TextField,
  Divider,
  Typography,
} from "@mui/material";

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/system';

/**
 * RiskAssessment dropdown form component for CreateRequest page
 * Parent component: CreateRequest
 * (ongoing)
 */
function RiskAssessmentForm() {
  const [open, setOpen] = React.useState(false);

  const handleCollapse = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 1200, color: 'white', bgcolor: '#1e88e5', borderRadius: 2 }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
        </ListSubheader>
      }
    >
      <ListItemButton onClick={handleCollapse}>
        <ListItemText primary="Risk Assessment Form" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box p={4} component="div" disablePadding
          sx={{ color: 'black', bgcolor: '#ffebee', border: 0, borderColor: 'primary.main' }}
        >
          <Typography variant="h5" color="#525252" align='center'>
            Scope Risk Assessment
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={1} />
            <Grid item xs={4}>
              <TextField
                fullWidth
                name="serialNumber"
                id="outlined-serialnumber"
                label="How many sub-systems will be affected?"
                variant="outlined"
                margin="normal"
                type="text"
                onChange=""
              />
              <TextField
                fullWidth
                name="serialNumber"
                id="outlined-serialnumber"
                label="Are there redundancies for this sub-systems?"
                variant="outlined"
                margin="normal"
                type="text"
                onChange=""
              />
              <TextField
                fullWidth
                name="serialNumber"
                id="outlined-serialnumber"
                label="Are thre work arounds in place to handle the down time?"
                variant="outlined"
                margin="normal"
                type="text"
                onChange=""
              />
            </Grid>
            <Grid item xs={2} />
            <Grid item xs={4}>
              <TextField
                fullWidth
                name="serialNumber"
                id="outlined-serialnumber"
                label="How critical is the sub-systems to the business?"
                variant="outlined"
                margin="normal"
                type="text"
                onChange=""
              />
              <TextField
                fullWidth
                name="serialNumber"
                id="outlined-serialnumber"
                label="How often/much is the sub-system used?"
                variant="outlined"
                margin="normal"
                type="text"
                onChange=""
              />
              <TextField
                fullWidth
                name="serialNumber"
                id="outlined-serialnumber"
                label="What is the financial impact of this change?"
                variant="outlined"
                margin="normal"
                type="text"
                onChange=""
              />
            </Grid>
            <Grid item xs={1} />
          </Grid>

          <br />
          <Divider />

          <Typography variant="h5" color="#525252" align='center' pt={2}>
            Scale Risk Assessment
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={1} />
            <Grid item xs={4}>
              <TextField
                fullWidth
                name="serialNumber"
                id="outlined-serialnumber"
                label="Who are the affected stakeholders?"
                variant="outlined"
                margin="normal"
                type="text"
                onChange=""
              />
            </Grid>
            <Grid item xs={2} />
            <Grid item xs={4}>
              <TextField
                fullWidth
                name="serialNumber"
                id="outlined-serialnumber"
                label="How many stakeholders are affected?"
                variant="outlined"
                margin="normal"
                type="text"
                onChange=""
              />
            </Grid>
            <Grid item xs={1} />
          </Grid>

        </Box>
      </Collapse>
    </List>
  );
}

export default RiskAssessmentForm;