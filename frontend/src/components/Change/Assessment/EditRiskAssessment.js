import React, { useState, useEffect } from "react";
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
  FormHelperText,
} from "@mui/material";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import "../../../layouts/preloader3.css";

import axios from "axios";
import { Box } from '@mui/system';
import Autocomplete from "@mui/material/Autocomplete";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

function EditRiskAssessment({
    id,
    assessmentDetails,
    onRequestAssessmentChange,
    }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const token = sessionStorage.getItem("access");

    const handleCollapse = () => {
      setOpen(!open);
    };

    useEffect(() => {
        console.log(assessmentDetails);
    }, []);

    useEffect(() => {
        if (assessmentDetails.length) {
            setLoading(false);
        }
    });

    return (
        <>
            <List
                sx={{ width: '100%', color: 'white', bgcolor: '#1e88e5', borderRadius: 2 }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader" />
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
                        {loading ? (
                            <div className="spinner">
                                <span>Loading. . .</span>
                                <div className="half-spinner"></div>
                            </div>
                        ) : (
                            <>
                                <Grid container spacing={2}>
                                    <Grid item xs={1} />

                                    <Grid item xs={4}>

                                        <>
                                            <FormControl sx={{ width: '100%' }} required>
                                                <InputLabel id="configuration">
                                                    Document of Configuration
                                                </InputLabel>

                                                <Select
                                                    required
                                                    name="configuration"
                                                    labelId="configuration"
                                                    id="configuration"
                                                    label="configuration"
                                                    defaultValue={assessmentDetails.configuration}
                                                    onChange={(event, newValue) => {
                                                        onRequestAssessmentChange("configuration", newValue.props.value);
                                                    }}
                                                >
                                                    <MenuItem key={1} value={"Incomplete and out of date"}>Incomplete and out of date</MenuItem>
                                                    <MenuItem key={2} value={"Less than 50%"}>Less than 50%</MenuItem>
                                                    <MenuItem key={3} value={"More than 50%"}>More than 50%</MenuItem>
                                                    <MenuItem key={4} value={"Complete and up to date"}>Complete and up to date</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </>

                                        <Box pb={3} />
                                        <>
                                            <FormControl sx={{ width: '100%' }} required>
                                                <InputLabel id="redundancy">
                                                    Redundancy
                                                </InputLabel>

                                                <Select
                                                    required
                                                    name="redundancy"
                                                    labelId="redundancy"
                                                    id="redundancy"
                                                    label="redundancy"
                                                    defaultValue={assessmentDetails.redundancy}
                                                    onChange={(event, newValue) => {
                                                        onRequestAssessmentChange("redundancy", newValue.props.value);
                                                    }}  
                                                >
                                                    <MenuItem key={1} value={"None Available (Individual Point of Failure)"}>None Available (Individual Point of Failure)</MenuItem>
                                                    <MenuItem key={2} value={"Manual Available (Requires Additional Effort)"}>Manual Available (Requires Additional Effort)</MenuItem>
                                                    <MenuItem key={3} value={"Automated and Available"}>Automated and Available</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </>
                                    </Grid>

                                    <Grid item xs={2} />

                                    <Grid item xs={4}>
                                        <>
                                            <FormControl sx={{ width: '100%' }} required>
                                                <InputLabel id="environment">
                                                    Environment
                                                </InputLabel>

                                                <Select
                                                    required
                                                    name="environment"
                                                    labelId="environment"
                                                    id="environment"
                                                    label="environment"
                                                    defaultValue={assessmentDetails.environment}
                                                    onChange={(event, newValue) => {
                                                        onRequestAssessmentChange("environment", newValue.props.value);
                                                    }}  
                                                >
                                                    <MenuItem key={1} value={"Information Only"}>Information Only</MenuItem>
                                                    <MenuItem key={2} value={"Test Environment"}>Test Environment</MenuItem>
                                                    <MenuItem key={3} value={"Production - No Dependencies"}>Production - No Dependencies</MenuItem>
                                                    <MenuItem key={4} value={"Production - Multiple Dependencies"}>Production - Multiple Dependencies</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </>

                                        <Box pb={3} />
                                        <>
                                            <FormControl sx={{ width: '100%' }} required>
                                                <InputLabel id="maturity">
                                                    Environment Maturity
                                                </InputLabel>

                                                <Select
                                                    required
                                                    name="maturity"
                                                    labelId="maturity"
                                                    id="maturity"
                                                    label="maturity"
                                                    defaultValue={assessmentDetails.maturity}
                                                    onChange={(event, newValue) => {
                                                        onRequestAssessmentChange("maturity", newValue.props.value);
                                                    }}         
                                                >
                                                    <MenuItem key={1} value={"Environment Obsolete"}>Environment Obsolete</MenuItem>
                                                    <MenuItem key={2} value={"Environment Somewhat Mature"}>Environment Somewhat Mature</MenuItem>
                                                    <MenuItem key={3} value={"Environment Mature/Maintained"}>Environment Mature/Maintained</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </>
                                    </Grid>
                                </Grid>

                                <br />
                                <Divider />
                                <br />

                                <Grid container spacing={2}>
                                    <Grid item xs={1} />

                                    <Grid item xs={4}>
                                        
                                        <>
                                            <FormControl sx={{ width: '100%' }} required>
                                                <InputLabel id="implement">
                                                    Time to Implement
                                                </InputLabel>

                                                <Select
                                                    required
                                                    name="implement"
                                                    labelId="implement"
                                                    id="implement"
                                                    label="implement"
                                                    defaultValue={assessmentDetails.implement}
                                                    onChange={(event, newValue) => {
                                                        onRequestAssessmentChange("implement", newValue.props.value);
                                                    }}        
                                                >
                                                    <MenuItem key={1} value={"Less than 30 Minutes"}>Less than 30 Minutes</MenuItem>
                                                    <MenuItem key={2} value={"More than 30 Minutes Less than 1 Hour"}>More than 30 Minutes Less than 1 Hour</MenuItem>
                                                    <MenuItem key={3} value={"More than 1 Hour Less Than 4"}>More than 1 Hour Less Than 4</MenuItem>
                                                    <MenuItem key={4} value={"More than 4 Hours"}>More than 4 Hours</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </>
                                        
                                        <Box pb={3} />

                                        <>
                                            <FormControl sx={{ width: '100%' }} required>
                                                <InputLabel id="deployment">
                                                    Deployment Window
                                                </InputLabel>

                                                <Select
                                                    required
                                                    name="deployment"
                                                    labelId="deployment"
                                                    id="deployment"
                                                    label="deployment"
                                                    defaultValue={assessmentDetails.deployment}
                                                    onChange={(event, newValue) => {
                                                        onRequestAssessmentChange("deployment", newValue.props.value);
                                                    }}       
                                                >
                                                    <MenuItem key={1} value={"Inadequate Window to Implement/Backout"}>Inadequate Window to Implement/Backout</MenuItem>
                                                    <MenuItem key={2} value={"Adequate Window to Implement/Backout"}>Adequate Window to Implement/Backout</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </>
                                    </Grid>

                                    <Grid item xs={2} />

                                    <Grid item xs={4}>
                                        <>
                                            <FormControl sx={{ width: '100%' }} required>
                                                <InputLabel id="history">
                                                    Change History
                                                </InputLabel>

                                                <Select
                                                    required
                                                    name="history"
                                                    labelId="history"
                                                    id="history"
                                                    label="history"
                                                    defaultValue={assessmentDetails.history}
                                                    onChange={(event, newValue) => {
                                                        onRequestAssessmentChange("history", newValue.props.value);
                                                    }}      
                                                >
                                                    <MenuItem key={1} value={"Change has failed previously"}>Change has failed previously</MenuItem>
                                                    <MenuItem key={2} value={"Change has not been completed before"}>Change has not been completed before</MenuItem>
                                                    <MenuItem key={3} value={"Change has been completed with errors previously"}>Change has been completed with errors previously</MenuItem>
                                                    <MenuItem key={4} value={"Change has been completed successfully previously"}>Change has been completed successfully previously</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </>

                                        <Box pb={3} />

                                        <>
                                            <FormControl sx={{ width: '100%' }} required>
                                                <InputLabel id="member">
                                                    Number of Staff/Teams Required
                                                </InputLabel>

                                                <Select
                                                    required
                                                    name="member"
                                                    labelId="member"
                                                    id="member"
                                                    label="member"
                                                    defaultValue={assessmentDetails.member}
                                                    onChange={(event, newValue) => {
                                                        onRequestAssessmentChange("member", newValue.props.value);
                                                    }}     
                                                >
                                                    <MenuItem key={1} value={"1 Staff"}>1 Staff</MenuItem>
                                                    <MenuItem key={2} value={"4 or More Staff"}>4 or More Staff</MenuItem>
                                                    <MenuItem key={3} value={"1 Service Team"}>1 Service Team</MenuItem>
                                                    <MenuItem key={4} value={"Multiple Service Teams Required"}>Multiple Service Teams Required</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </>
                                    </Grid>
                                </Grid>

                                <br />
                                <Divider />
                                <br />

                                <Grid container spacing={2}>
                                    <Grid item xs={1} />

                                    <Grid item xs={4}>

                                        <>
                                            <FormControl sx={{ width: '100%' }} required>
                                                <InputLabel id="production">
                                                    Pre-Production Testing
                                                </InputLabel>

                                                <Select
                                                    required
                                                    name="production"
                                                    labelId="production"
                                                    id="production"
                                                    label="production"
                                                    defaultValue={assessmentDetails.production}
                                                    onChange={(event, newValue) => {
                                                        onRequestAssessmentChange("production", newValue.props.value);
                                                    }}     
                                                >
                                                    <MenuItem key={1} value={"No Testing Completed"}>No Testing Completed</MenuItem>
                                                    <MenuItem key={2} value={"Some Testing Completed"}>Some Testing Completed</MenuItem>
                                                    <MenuItem key={3} value={"Previously Tested Successfully"}>Previously Tested Successfully</MenuItem>
                                                    <MenuItem key={4} value={"Unable to Test"}>Unable to Test</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </>

                                        <Box pb={3} />

                                        <>
                                            <FormControl sx={{ width: '100%' }} required>
                                                <InputLabel id="schedule">
                                                    Change Scheduling
                                                </InputLabel>

                                                <Select
                                                    required
                                                    name="schedule"
                                                    labelId="schedule"
                                                    id="schedule"
                                                    label="schedule"
                                                    defaultValue={assessmentDetails.schedule}
                                                    onChange={(event, newValue) => {
                                                        onRequestAssessmentChange("schedule", newValue.props.value);
                                                    }}     
                                                >
                                                    <MenuItem key={1} value={"Pre-Planned Maintenance Window"}>Pre-Planned Maintenance Window</MenuItem>
                                                    <MenuItem key={2} value={"After-Hours, Non-Production"}>After-Hours, Non-Production</MenuItem>
                                                    <MenuItem key={3} value={"During Production, at request of Client"}>During Production, at request of Client</MenuItem>
                                                    <MenuItem key={4} value={"During Production"}>During Production</MenuItem>
                                                    <MenuItem key={5} value={"During Peak Timing or Blackout time"}>During Peak Timing or Blackout time</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </>
                                    </Grid>

                                    <Grid item xs={2} />

                                    <Grid item xs={4}>

<>
                                            <FormControl sx={{ width: '100%' }} required>
                                                <InputLabel id="backout">
                                                    Backout Plan
                                                </InputLabel>

                                                <Select
                                                    required
                                                    name="backout"
                                                    labelId="backout"
                                                    id="backout"
                                                    label="backout"
                                                    defaultValue={assessmentDetails.backout}
                                                    onChange={(event, newValue) => {
                                                        onRequestAssessmentChange("backout", newValue.props.value);
                                                    }}  
                                                >
                                                    <MenuItem key={1} value={"Low Difficulty"}>Low Difficulty</MenuItem>
                                                    <MenuItem key={2} value={"Medium Difficulty"}>Medium Difficulty</MenuItem>
                                                    <MenuItem key={3} value={"High Difficulty"}>High Difficulty</MenuItem>
                                                    <MenuItem key={4} value={"Not Possible"}>Not Possible</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </>
                                    </Grid>
                                </Grid>
                            </>
                        )}
                    </Box>
                </Collapse>
            </List>
        </>
    )
}

export default EditRiskAssessment;