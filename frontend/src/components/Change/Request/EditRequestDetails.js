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
  Slider,
} from "@mui/material";

import axios from "axios";
import { Box } from '@mui/system';
import Autocomplete from "@mui/material/Autocomplete";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

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

function EditRequestDetails({
    detailsId,
    requestDetails,
    onRequestDetailsChange,
    onRequestAssignChange,
    onRequestRequestedByChange,
    onPriorityChange,
    priorityValue,
    errorRequestDetails,
    }) {
    const [open, setOpen] = useState(false);
    let token = sessionStorage.getItem("access");
    const [requestNumber, setRequestId] = useState(`CHR${requestDetails.requestNumber.toString().padStart(6, "0")}`);

    const [userList, setUserList] = useState([]);

    const handleCollapse = () => {
        setOpen(!open);
    };

    /**
     * Fetches users from the database.
     */
    const getUsers = async() => {
        try {
            const response = await axios({
                method: "GET",
                url: "/api/users/",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.data;
            setUserList(data);
        } catch (error) {
            if (error.response) {
                console.log(error.response);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        }
    }

    useEffect(() => {
        getUsers();
        console.log(requestDetails);
    }, []);

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
                    <ListItemText primary="Request Details Form" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box p={4} component="div" disablePadding
                        sx={{ color: 'black', bgcolor: '#ffebee', border: 0, borderColor: 'primary.main' }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={1} />

                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    type="text"
                                    margin="normal"
                                    id="outlined-requestnumber"
                                    variant="filled"
                                    name="requestNumber"
                                    value={requestNumber}
                                    label="Request Number"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />

                                <TextField
                                    fullWidth
                                    name="projectName"
                                    id="outlined-projectname"
                                    label="Project Name"
                                    variant="outlined"
                                    margin="normal"
                                    type="text"
                                    defaultValue={requestDetails.projectName}
                                    onChange={onRequestDetailsChange}
                                    error={errorRequestDetails.errorProject}
                                    helperText={errorRequestDetails.errorProject}
                                />
                            </Grid>

                            <Grid item xs={2} />

                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    name="requestName"
                                    id="outlined-requestname"
                                    label="Request Name"
                                    variant="outlined"
                                    margin="normal"
                                    type="text"
                                    defaultValue={requestDetails.requestName}
                                    onChange={onRequestDetailsChange}
                                    error={errorRequestDetails.errorName}
                                    helperText={errorRequestDetails.errorName}
                                />
                            </Grid>

                            <Grid item xs={1} />
                        </Grid>

                        <br />
                        <Divider />

                        <Grid container spacing={2}>
                            <Grid item xs={1} />

                            <Grid item xs={4}>
                                <Box pt={2}>
                                    <Autocomplete
                                        defaultValue={userList.find(
                                            (item) => item.id === requestDetails.assignedTo
                                        )}                                    
                                        id="grouped-userList"
                                        disableClearable
                                        options={userList}
                                        groupBy={(option) => option.first_name[0]}
                                        getOptionLabel={(option) => `${option.first_name} ${option.last_name}`}
                                        noOptionsText={"No Results Found"}
                                        renderInput={(params) => (
                                            <TextField
                                                name="assignedTo"
                                                required
                                                {...params}
                                                label="Assign To"
                                                error={errorRequestDetails.errorAssign}
                                                helperText={errorRequestDetails.errorAssign}
                                            />
                                        )}
                                        onChange={onRequestAssignChange}
                                    />
                                </Box>

                                <Box pt={3}>
                                    <Autocomplete
                                        defaultValue={userList.find(
                                            (item) => item.id === requestDetails.requestedBy
                                        )}                  

                                        id="grouped-userList"
                                        options={userList}
                                        disableClearable
                                        groupBy={(option) => option.first_name[0]}
                                        getOptionLabel={(option) => `${option.first_name} ${option.last_name}`}
                                        noOptionsText={"No Results Found"}
                                        renderInput={(params) => (
                                            <TextField
                                                name="requestedBy"
                                                required
                                                {...params}
                                                label="Requested By"
                                                error={errorRequestDetails.errorRequest}
                                                helperText={errorRequestDetails.errorRequest}
                                            />
                                        )}
                                        onChange={onRequestRequestedByChange}
                                    />
                                </Box>
                            </Grid>

                            <Grid item xs={2} />

                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    name="department"
                                    id="outlined-department"
                                    label="Department"
                                    variant="outlined"
                                    margin="normal"
                                    type="text"
                                    defaultValue={requestDetails.department}
                                    onChange={onRequestDetailsChange}
                                    error={errorRequestDetails.errorDepartment}
                                    helperText={errorRequestDetails.errorDepartment}
                                />
                                <TextField
                                    fullWidth
                                    name="requestContact"
                                    id="outlined-request-contact"
                                    label="Request Contact"
                                    variant="outlined"
                                    margin="normal"
                                    type="text"
                                    defaultValue={requestDetails.requestContact}
                                    onChange={onRequestDetailsChange}
                                    error={errorRequestDetails.errorContact}
                                    helperText={errorRequestDetails.errorContact}
                                />
                            </Grid>
                            
                            <Grid item xs={1} />
                        </Grid>

                        <br />
                        <Divider />

                        <Box pt={2} pb={2}>
                            <Grid container spacing={2}>
                                <Grid item xs={1} />
                                <Grid item xs={4}>
                                    <Typography>Impact</Typography>
                                    <Slider
                                        name="impact"
                                        size="small"
                                        aria-label="Restricted values"
                                        defaultValue={requestDetails.impact}
                                        valueLabelFormat={valueLabelFormat}
                                        getAriaValueText={valuetext}                                        
                                        valueLabelDisplay="auto"
                                        step={1}
                                        marks={marks}
                                        min={1}
                                        max={4}
                                        onChange={onPriorityChange}
                                    />

                                    <Typography>Urgency</Typography>
                                    <Slider
                                        name="urgency"
                                        size="small"
                                        aria-label="Restricted values"
                                        defaultValue={requestDetails.urgency}
                                        valueLabelFormat={valueLabelFormat}
                                        getAriaValueText={valuetext}                                        
                                        valueLabelDisplay="auto"
                                        step={1}
                                        marks={marks}
                                        min={1}
                                        max={4}
                                        onChange={onPriorityChange}
                                    />
                                </Grid>

                                <Grid item xs={2} />
                                
                                <Grid item xs={4}>
                                    <Typography>Priority</Typography>
                                    <Slider
                                        size="small"
                                        aria-label="Restricted values"
                                        defaultValue={requestDetails.priority}
                                        valueLabelFormat={valueLabelFormat}
                                        getAriaValueText={valuetext}
                                        step={null}
                                        valueLabelDisplay="auto"
                                        marks={marks}
                                        min={1}
                                        max={4}
                                        disabled
                                        value={priorityValue}
                                    />
                                </Grid>
                                <Grid item xs={1} />
                            </Grid>
                        </Box>

                        <TextField
                            id="description"
                            label="Description"
                            rows={4}
                            variant="filled"
                            multiline
                            fullWidth
                            name="description"
                            defaultValue={requestDetails.description}
                            onChange={onRequestDetailsChange}
                            error={errorRequestDetails.errorDescription}
                            helperText={errorRequestDetails.errorDescription}
                        />
                    </Box>
                </Collapse>
            </List>
        </>
    )
}

export default EditRequestDetails;