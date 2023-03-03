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

import axios from "axios";
import { Box } from '@mui/system';
import Autocomplete from "@mui/material/Autocomplete";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

function RiskAssessment({ onRequestAssessmentChange, errorAssessmentDetails }) {
    const [open, setOpen] = useState(false);
    const token = sessionStorage.getItem("access");
    const [configurationList, setConfiguration] = useState([]);
    const [redundancyList, setRedundancy] = useState([]);
    const [environmentList, setEnvironment] = useState([]);
    const [maturityList, setMaturity] = useState([]);
    const [implementList, setImplement] = useState([]);
    const [deploymentList, setDeployment] = useState([]);
    const [historyList, setHistory] = useState([]);
    const [memberList, setMember] = useState([]);
    const [productionList, setProduction] = useState([]);
    const [scheduleList, setSchedule] = useState([]);
    const [backplanList, setBackPlan] = useState([]);


    
    const handleCollapse = () => {
      setOpen(!open);
    };
 

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
                    <Box p={4} component="div" disablepadding
                        sx={{ color: 'black', bgcolor: '#ffebee', border: 0, borderColor: 'primary.main' }}
                    >                       
                        <Grid container spacing={2}>
                            <Grid item xs={1} />

                            <Grid item xs={4}>
                                <FormControl error={errorAssessmentDetails.errorConfiguration} fullWidth>
                                    <InputLabel id="configuration">
                                        Documentation of Configuration
                                    </InputLabel>

                                    <Select
                                        name="configuration"
                                        label="Documentation of Configuration"
                                        onChange={onRequestAssessmentChange}
                                        id="configuration"
                                        labelId="configuration"
                                        defaultValue={''}
                                    >
                                        <MenuItem key={1} value={"Incomplete and out of date"}>Incomplete and out of date</MenuItem>
                                        <MenuItem key={2} value={"Less than 50%"}>Less than 50%</MenuItem>
                                        <MenuItem key={3} value={"More than 50%"}>More than 50%</MenuItem>
                                        <MenuItem key={4} value={"Complete and up to date"}>Complete and up to date</MenuItem>
                                    </Select>
                                    <FormHelperText>{errorAssessmentDetails.errorConfiguration}</FormHelperText>
                                </FormControl>

                                <Box pb={3} />

                                <FormControl error={errorAssessmentDetails.errorRedundancy} fullWidth>
                                    <InputLabel id="redundancy">
                                        Redundancy
                                    </InputLabel>

                                    <Select
                                        name="redundancy"
                                        label="Redundancy"
                                        onChange={onRequestAssessmentChange}
                                        id="redundancy"
                                        labelId="redundancy"
                                        defaultValue={''}
                                    >
                                        <MenuItem key={1} value={"None Available (Individual Point of Failure)"}>None Available (Individual Point of Failure)</MenuItem>
                                        <MenuItem key={2} value={"Manual Available (Requires Additional Effort)"}>Manual Available (Requires Additional Effort)</MenuItem>
                                        <MenuItem key={3} value={"Automated and Available"}>Automated and Available</MenuItem>
                                    </Select>
                                    <FormHelperText>{errorAssessmentDetails.errorRedundancy}</FormHelperText>
                                </FormControl>
                            </Grid>

                            <Grid item xs={2} />

                            <Grid item xs={4}>
                                <FormControl error={errorAssessmentDetails.errorEnvironment} fullWidth>
                                    <InputLabel id="environment">
                                        Environment
                                    </InputLabel>

                                    <Select
                                        name="environment"
                                        label="Environment"
                                        onChange={onRequestAssessmentChange}
                                        id="environment"
                                        labelId="environment"
                                        defaultValue={''}
                                    >
                                        <MenuItem key={1} value={"Information Only"}>Information Only</MenuItem>
                                        <MenuItem key={2} value={"Test Environment"}>Test Environment</MenuItem>
                                        <MenuItem key={3} value={"Production - No Dependencies"}>Production - No Dependencies</MenuItem>
                                        <MenuItem key={4} value={"Production - Multiple Dependencies"}>Production - Multiple Dependencies</MenuItem>
                                    </Select>
                                    <FormHelperText>{errorAssessmentDetails.errorEnvironment}</FormHelperText>
                                </FormControl>

                                <Box pb={3} />

                                <FormControl error={errorAssessmentDetails.errorMaturity} fullWidth>
                                    <InputLabel id="maturity">
                                        Environment Maturity
                                    </InputLabel>

                                    <Select
                                        name="maturity"
                                        label="Environment Maturity"
                                        onChange={onRequestAssessmentChange}
                                        id="maturity"
                                        labelId="maturity"
                                        defaultValue={''}
                                    >
                                        <MenuItem key={1} value={"Environment Obsolete"}>Environment Obsolete</MenuItem>
                                        <MenuItem key={2} value={"Environment Somewhat Mature"}>Environment Somewhat Mature</MenuItem>
                                        <MenuItem key={3} value={"Environment Mature/Maintained"}>Environment Mature/Maintained</MenuItem>
                                    </Select>
                                    <FormHelperText>{errorAssessmentDetails.errorMaturity}</FormHelperText>
                                </FormControl>
                            </Grid>
                        </Grid>

                        <br />
                        <Divider />
                        <br />

                        <Grid container spacing={2}>
                            <Grid item xs={1} />

                            <Grid item xs={4}>
                                <FormControl error={errorAssessmentDetails.errorImplement} fullWidth>
                                    <InputLabel id="implement">
                                        Time to Implement
                                    </InputLabel>

                                    <Select
                                        name="implement"
                                        label="Time to Implement"
                                        onChange={onRequestAssessmentChange}
                                        id="implement"
                                        labelId="implement"
                                        defaultValue={''}
                                    >
                                        <MenuItem key={1} value={"Less than 30 Minutes"}>Less than 30 Minutes</MenuItem>
                                        <MenuItem key={2} value={"More than 30 Minutes Less than 1 Hour"}>More than 30 Minutes Less than 1 Hour</MenuItem>
                                        <MenuItem key={3} value={"More than 1 Hour Less Than 4"}>More than 1 Hour Less Than 4</MenuItem>
                                        <MenuItem key={4} value={"More than 4 Hours"}>More than 4 Hours</MenuItem>
                                    </Select>
                                    <FormHelperText>{errorAssessmentDetails.errorImplement}</FormHelperText>
                                </FormControl>

                                <Box pb={3} />

                                <FormControl error={errorAssessmentDetails.errorDeployment} fullWidth>
                                    <InputLabel id="deployment">
                                        Deployment Window
                                    </InputLabel>

                                    <Select
                                        name="deployment"
                                        label="Deployment Window"
                                        onChange={onRequestAssessmentChange}
                                        id="deployment"
                                        labelId="deployment"
                                        defaultValue={''}
                                    >
                                        <MenuItem key={1} value={"Inadequate Window to Implement/Backout"}>Inadequate Window to Implement/Backout</MenuItem>
                                        <MenuItem key={2} value={"Adequate Window to Implement/Backout"}>Adequate Window to Implement/Backout</MenuItem>
                                    </Select>
                                    <FormHelperText>{errorAssessmentDetails.errorDeployment}</FormHelperText>
                                </FormControl>
                            </Grid>

                            <Grid item xs={2} />

                            <Grid item xs={4}>
                                <FormControl error={errorAssessmentDetails.errorHistory} fullWidth>
                                    <InputLabel id="history">
                                        Change History
                                    </InputLabel>

                                    <Select
                                        name="history"
                                        label="Change History"
                                        onChange={onRequestAssessmentChange}
                                        id="history"
                                        labelId="history"
                                        defaultValue={''}
                                    >
                                        <MenuItem key={1} value={"Change has failed previously"}>Change has failed previously</MenuItem>
                                        <MenuItem key={2} value={"Change has not been completed before"}>Change has not been completed before</MenuItem>
                                        <MenuItem key={3} value={"Change has been completed with errors previously"}>Change has been completed with errors previously</MenuItem>
                                        <MenuItem key={4} value={"Change has been completed successfully previously"}>Change has been completed successfully previously</MenuItem>
                                    </Select>
                                    <FormHelperText>{errorAssessmentDetails.errorHistory}</FormHelperText>
                                </FormControl>

                                <Box pb={3} />

                                <FormControl error={errorAssessmentDetails.errorMember} fullWidth>
                                    <InputLabel id="member">
                                        Number of Staff/Teams Required
                                    </InputLabel>

                                    <Select
                                        name="member"
                                        label="Number of Staff/Teams Required"
                                        onChange={onRequestAssessmentChange}
                                        id="member"
                                        labelId="member"
                                        defaultValue={''}
                                    >
                                        <MenuItem key={1} value={"1 Staff"}>1 Staff</MenuItem>
                                        <MenuItem key={2} value={"4 or More Staff"}>4 or More Staff</MenuItem>
                                        <MenuItem key={3} value={"1 Service Team"}>1 Service Team</MenuItem>
                                        <MenuItem key={4} value={"Multiple Service Teams Required"}>Multiple Service Teams Required</MenuItem>
                                    </Select>
                                    <FormHelperText>{errorAssessmentDetails.errorMember}</FormHelperText>
                                </FormControl>
                            </Grid>
                        </Grid>

                        <br />
                        <Divider />
                        <br />

                        <Grid container spacing={2}>
                            <Grid item xs={1} />

                            <Grid item xs={4}>
                                <FormControl error={errorAssessmentDetails.errorProduction} fullWidth>
                                    <InputLabel id="production">
                                        Pre-Production Testing
                                    </InputLabel>

                                    <Select
                                        name="production"
                                        label="Pre-Production Testing"
                                        onChange={onRequestAssessmentChange}
                                        id="production"
                                        labelId="production"
                                        defaultValue={''}
                                    >
                                        <MenuItem key={1} value={"No Testing Completed"}>No Testing Completed</MenuItem>
                                        <MenuItem key={2} value={"Some Testing Completed"}>Some Testing Completed</MenuItem>
                                        <MenuItem key={3} value={"Previously Tested Successfully"}>Previously Tested Successfully</MenuItem>
                                        <MenuItem key={4} value={"Unable to Test"}>Unable to Test</MenuItem>
                                    </Select>
                                    <FormHelperText>{errorAssessmentDetails.errorProduction}</FormHelperText>
                                </FormControl>

                                <Box pb={3} />

                                <FormControl error={errorAssessmentDetails.errorSchedule} fullWidth>
                                    <InputLabel id="schedule">
                                        Change Scheduling
                                    </InputLabel>

                                    <Select
                                        name="schedule"
                                        label="Change Scheduling"
                                        onChange={onRequestAssessmentChange}
                                        id="schedule"
                                        labelId="schedule"
                                        defaultValue={''}
                                    >
                                        <MenuItem key={1} value={"Pre-Planned Maintenance Window"}>Pre-Planned Maintenance Window</MenuItem>
                                        <MenuItem key={2} value={"After-Hours, Non-Production"}>After-Hours, Non-Production</MenuItem>
                                        <MenuItem key={3} value={"During Production, at request of Client"}>During Production, at request of Client</MenuItem>
                                        <MenuItem key={4} value={"During Production"}>During Production</MenuItem>
                                        <MenuItem key={5} value={"During Peak Timing or Blackout time"}>During Peak Timing or Blackout time</MenuItem>
                                    </Select>
                                    <FormHelperText>{errorAssessmentDetails.errorSchedule}</FormHelperText>
                                </FormControl>
                            </Grid>

                            <Grid item xs={2} />

                            <Grid item xs={4}>
                                <FormControl error={errorAssessmentDetails.errorBackout} fullWidth>
                                    <InputLabel id="backout">
                                        Backout Plan
                                    </InputLabel>

                                    <Select
                                        name="backout"
                                        label="Backout Plan"
                                        onChange={onRequestAssessmentChange}
                                        id="backout"
                                        labelId="backout"
                                        defaultValue={''}
                                    >
                                        <MenuItem key={1} value={"Low Difficulty"}>Low Difficulty</MenuItem>
                                        <MenuItem key={2} value={"Medium Difficulty"}>Medium Difficulty</MenuItem>
                                        <MenuItem key={3} value={"High Difficulty"}>High Difficulty</MenuItem>
                                        <MenuItem key={4} value={"Not Possible"}>Not Possible</MenuItem>
                                    </Select>
                                    <FormHelperText>{errorAssessmentDetails.errorBackout}</FormHelperText>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Box>
                </Collapse>
            </List>
        </>
    )
}

export default RiskAssessment;