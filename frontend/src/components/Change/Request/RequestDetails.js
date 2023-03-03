import React, { useState, useEffect } from 'react';

import {
    List,
    ListSubheader,
    ListItemButton,
    ListItemText,
    Collapse,
    Grid,
    TextField,
    Divider,
    Slider,
    Typography,
    Autocomplete,
} from "@mui/material";

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/system';
import axios from "axios";

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

function RequestDetails({
    requestId,
    onRequestDetailsChange,
    errorRequestDetails,
    onRequestAssignChange,
    onRequestRequestedByChange,
    onPriorityChange,
    priorityValue,
    }) {
    const [open, setOpen] = useState(false);
    let token = sessionStorage.getItem("access");
    const [userList, setUserList] = useState([]);
    const [requestNumber, setRequestId] = useState(`CHR${requestId.toString().padStart(6, "0")}`);

    /**
     * Fetches specified request status object from API.
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
            // console.log(data, "RequestDetails.js");
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
    }, [])

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
                    <ListSubheader component="div" id="nested-list-subheader">
                    </ListSubheader>
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
                                        id="grouped-userList"
                                        options={userList}
                                        disableClearable
                                        groupBy={(option) => option.first_name[0]}
                                        getOptionLabel={(option) => `${option.first_name} ${option.last_name}`}
                                        noOptionsText={"No Results Found"}
                                        renderInput={(params) => (
                                            <TextField
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
                                        defaultValue={4} 
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
                                        defaultValue={4} 
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
                                        defaultValue={4}
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

export default RequestDetails;