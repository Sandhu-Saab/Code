import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Box,
  Switch,
  FormControlLabel,
  Slider,
  Divider,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepButton,
  Grid,
} from "@mui/material";
import IncidentComments from "./IncidentComments";
import "../../layouts/preloader3.css";

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const marks = [
    {
        value: 1,
        label: "1 - Critical",
    },
    {
        value: 2,
        label: "2 - High",
    },
    {
        value: 3,
        label: "3 - Medium",
    },
    {
        value: 4,
        label: "4 - Low",
    },
];

function valuetext(value) {
    return `${value}`;
}

function valueLabelFormat(value) {
    return marks.findIndex((mark) => mark.value === value) + 1;
}


function ViewIncidentForm({
    id,
    incidentData,
    userList,
    technicianList,
    ticketTypeList,
    securityGroupList,
    statusList,
}) {
    let navigate = useNavigate();
    const query = new URLSearchParams(useLocation().search);
    let steps = [statusList]
    // const [steps, setSteps] = useState(statusList);
    const currentUserId = sessionStorage.getItem("userId");
    const currentUserRole = sessionStorage.getItem("roleId");
    const currentUserSection = sessionStorage.getItem("section");
    const [incStatus, setIncStatus] = useState(incidentData.status);

    function getStatus(){
        // console.log(incStatus)
        // console.log(steps)
        if(incStatus == 6){
            setIncStatus(3);
            return incStatus
        }
        if(incStatus == 7){
            setIncStatus(4);
            return incStatus
        }
        if (incStatus == 8){
            setIncStatus(5);
            return incStatus
        }
        return incStatus
    }


    /**
     * It loops through the userList array to find the username of the ownerId
     * @param ownerId - The ID of the user you want to get the username of.
     * @returns The value of the username.
     */
    function getUsername(ownerId) {
        let value;

        // Loops through the user to find exact value
        userList.forEach((name) => {
            if (name.id === ownerId) {
            value = name.username;
            }
        });
        getStatus();
        return value;
    }
  
    /**
     * It loops through the technicianList array and returns the first and last name of the technician that
     * matches the userId.
     * @param userId - The id of the user you want to get the full name of.
     * @returns The value of the first_name and last_name of the technician.
     */
    function getTechFullName(userId) {
        let value;
        console.log(technicianList)
        // Loops through the technician to find exact value
        technicianList.forEach((name) => {
            if (name.id === userId) {
            value = name.first_name + " " + name.last_name;
            }
        });

        return value;
    }

    /**
     * Gets the security value based on the ID.
     * @param {*} sGroupId 
     * @returns 
     */
    function getSecurityGroup(sGroupId) {
        let value = "N/A";
        console.log(sGroupId);

        // Loops through the security groups to find exact value
        securityGroupList.forEach((securityGroup) => {
            if (securityGroup.securityGroupId === sGroupId) {
                value = securityGroup.name;
            }
        });

        return value;
    }
  
    /**
     * It loops through the ticketTypeList array and returns the value of the type property of the object
     * that has a TypeId property that matches the ticketId parameter.
     * @param ticketId - The ticket ID that you want to get the name of
     * @returns The value of the ticket type.
     */
    function getTicket(ticketId) {
        let value;

        // Loops through the tickets to find exact value
        ticketTypeList.forEach((name) => {
            if (name.id === ticketId) {
            value = name.type;
            }
        });

        return value;
    }  

    /**
     * It loops through the userList array and returns the first_name
     * and last_name of the user with the matching id.
     * @param userId - The id of the user you want to get the full name of.
     * @returns The value of the user's full name.
     */
    function getUserFullName(userId) {
        let value;

        // Loops through the user to find exact value
        userList.forEach((name) => {
            if (name.id === userId) {
                value = name.first_name + " " + name.last_name;
            }
        });

        return value;
    }

    /**
    * Function to navigate the page back to the all list.
    */
    const routeChangeBack = () => {
        let path = "/incident/all";
        navigate(path);
    };

    /**
    * Function to navigate the page to edit the incident
    */
    const routeChangeEdit = () => {
        const incidentId = query.get("incidentId");
        
        let path = "/incident/edit?incidentId=" + incidentId;
        navigate(path);
    };
    
    return (
        <>
            <Box pb={5} sx={{ width: "100%" }}>
                <Stepper alternativeLabel activeStep={Number(getStatus() -1)}>
                {statusList.map((label, index) => (
                    <Step key={label}>
                    <StepButton color="inherit">
                        <StepLabel>{label}</StepLabel>
                    </StepButton>
                    </Step>
                ))}
                </Stepper>
            </Box>

            <Box pb={4}>
                <Grid container spacing={2}>
                    <Grid item xs={1} />

                    <Grid item xs={4}>
                        <TextField
                            id="ticketNumber"
                            label="Ticket Number"
                            variant="filled"
                            name="ticketNumber"
                            margin="normal"
                            type="text"
                            value={id}
                            inputProps={{ readOnly: true }}
                            fullWidth
                        />

                        <TextField
                            id="user"
                            label="User"
                            variant="filled"
                            name="user"
                            margin="normal"
                            type="text"
                            value={String(getUserFullName(incidentData.userId))}
                            inputProps={{ readOnly: true }}
                            fullWidth
                        />

                        <Box pt={3}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DateTimePicker
                                    label="Report Date Time"
                                    value={incidentData.reportDateTime}
                                    disabled
                                    renderInput={(params) => (
                                        <TextField
                                            required
                                            {...params}
                                            sx={{ width: "100%" }}
                                        />
                                    )}
                                />
                            </LocalizationProvider>
                        </Box>

                        <Box pt={5}>
                            <FormControlLabel
                                control={<Switch color="primary" />}
                                label="Multiple Affected User"
                                labelPlacement="start"
                                checked={incidentData.multipleAffectedUser}
                                name="multipleUserAffected"
                                disabled
                            />
                        </Box>
                    </Grid>

                    <Grid item xs={2} />

                    <Grid item xs={4}>
                      <Typography textAlign="center">Impact</Typography>

                      <Slider
                        size="small"
                        aria-label="Restricted values"
                        valueLabelFormat={valueLabelFormat}
                        getAriaValueText={valuetext}
                        step={null}
                        valueLabelDisplay="auto"
                        marks={marks}
                        min={1}
                        max={4}
                        value={incidentData.impact}
                        disabled
                        name="impact"
                      />

                      <Typography textAlign="center">Urgency</Typography>

                      <Slider
                        size="small"
                        aria-label="Restricted values"
                        valueLabelFormat={valueLabelFormat}
                        getAriaValueText={valuetext}
                        step={null}
                        valueLabelDisplay="auto"
                        marks={marks}
                        min={1}
                        max={4}
                        value={incidentData.urgency}
                        name="urgency"
                        disabled
                      />

                      <Typography textAlign="center">Priority</Typography>

                      <Slider
                        size="small"
                        aria-label="Restricted values"
                        valueLabelFormat={valueLabelFormat}
                        getAriaValueText={valuetext}
                        step={null}
                        valueLabelDisplay="auto"
                        marks={marks}
                        min={1}
                        max={4}
                        disabled
                        value={incidentData.priority}
                      />

                      {incidentData.multipleAffectedUser && (
                        <Box pt={2}>
                          <FormControl sx={{ width: "100%" }}>
                            <InputLabel id="number-user-affected-label">
                              No. of User Affected
                            </InputLabel>

                            <Select
                              name="affectedUserSize"
                              labelId="number-user-affected"
                              id="number-user-affected"
                              label="No. of User Affected"
                              value={incidentData.affectedUserSize}
                              disabled
                            >
                              <MenuItem value={0}>
                                <em>None</em>
                              </MenuItem>

                              <MenuItem value={1}>1-50</MenuItem>
                              <MenuItem value={2}>51-100</MenuItem>
                              <MenuItem value={3}>101+</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                      )}
                    </Grid>

                    <Grid item xs={1} />
                </Grid>

                <br />
                <Divider />

                <Box pt={3}>
                    <Grid container spacing={2}>
                        <Grid item xs={1} />

                        <Grid item xs={4}>
                            <TextField
                                id="ticketOpenedBy"
                                label="Ticket Open By"
                                variant="filled"
                                value={String(getUsername(incidentData.ticketOwnerId))}
                                inputProps={{ readOnly: true }}
                                fullWidth
                            />

                            <TextField
                                id="securityGroup"
                                label="Security Group"
                                variant="filled"
                                margin="normal"
                                fullWidth
                                value={getSecurityGroup(incidentData.security_group)}
                                name="securityGroup"
                                inputProps={{ readOnly: true }}
                            />

                            <TextField
                                id="assignedTech"
                                label="Assigned Technician"
                                variant="filled"
                                name="assignedTech"
                                margin="normal"
                                type="text"
                                value={String(
                                    getTechFullName(incidentData.assignedTechId)
                                )}
                                inputProps={{ readOnly: true }}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={2} />

                        <Grid item xs={4}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DateTimePicker
                                label="Ticket Created At"
                                value={incidentData.ticketDateTime}
                                renderInput={(params) => (
                                    <TextField {...params} sx={{ width: "100%" }} />
                                )}
                                disabled
                                />
                            </LocalizationProvider>

                            <TextField
                                id="grouped-ticketType"
                                label="Ticket Type"
                                variant="filled"
                                name="ticketType"
                                margin="normal"
                                type="text"
                                value={String(
                                    getTicket(incidentData.ticketType)
                                )}
                                inputProps={{ readOnly: true }}
                                fullWidth
                            />
                            {currentUserRole == 3 &&(
                            <Box pt={5}>
                            <FormControlLabel
                                control={<Switch color="primary" />}
                                label="Viewable to Students?"
                                labelPlacement="start"
                                checked={incidentData.isAssigned}
                                name="isAssigned"
                                disabled
                            />
                        </Box>
                            )}
                        </Grid>

                        <Grid item xs={1} />
                    </Grid>
                </Box>

                <br />
                <Divider />

                <Box pt={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={1} />

                        <Grid item xs={10}>
                            <TextField
                                id="subject"
                                label="Subject"
                                variant="filled"
                                fullWidth
                                value={String(incidentData.subject)}
                                name="subject"
                                inputProps={{ readOnly: true }}
                            />
                        
                            <Box pt={3}>
                                <TextField
                                    id="details"
                                    label="Details"
                                    variant="filled"
                                    multiline
                                    maxRows={100}
                                    fullWidth
                                    value={String(incidentData.details)}
                                    name="details"
                                    inputProps={{ readOnly: true }}
                                />
                            </Box>
                        </Grid>

                        <Grid item xs={1} />
                    </Grid>
                </Box>

                <Box pt={5} textAlign="center">
                    <Button
                        type="button"
                        variant="contained"
                        onClick={routeChangeEdit}
                    >
                        Edit
                    </Button>

                    <Button
                        type="button"
                        variant="contained"
                        style={{ margin: "20px" }}
                        onClick={routeChangeBack}
                    >
                        Back
                    </Button>
                </Box>

                <br />
                <Divider />

                <IncidentComments />
            </Box> 
        </>
    )
}

export default ViewIncidentForm;