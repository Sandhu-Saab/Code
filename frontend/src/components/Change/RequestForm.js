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

// *********Value Getter***********

function valuetext(value) {
    return `${value}`;
}

function valueLabelFormat(value) {
    return marks.findIndex((mark) => mark.value === value) + 1;
}


/**
 * RequestDetailsForm dropdown form component for CreateRequest page
 * Parent component: CreateRequest
 */
function RequestForm(props) {
    const [open, setOpen] = useState(false);
    const [impact, setImpact] = useState(4);
    const [urgency, setUrgency] = useState(4);
    const [priority, setPriority] = useState(4);
    const [requestNumber, setRequestNumber] = React.useState();
    const [userList, setUserList] = useState([]);
    const [requestDetails, setRequestDetails] = useState({
        requestName: "",
        projectName: "",
        assignedTo: "",
        department: "",
        requestedById: "",
        requestContact: "",
        impact: "",
        urgency: "",
        priority: "",
        description: "",
    });

    let token = sessionStorage.getItem("access");

    const handleCollapse = () => {
        setOpen(!open);
    };

    useEffect(() => {
        handleChangePriority();
        setRequestDetails({ ...requestDetails, impact: impact, urgency: urgency, priority: priority });
        props.onRequestDetailsChange(requestDetails);
    }, [impact, urgency])

    useEffect(() => {
        getUsers();
        getRequestNumber();
    }, [])

    /**
     * handle change in priority based from the ITIL matrix
     */
    const handleChangePriority = () => {
        if (urgency === 4) {
            setPriority(4);
        } else {
            if (urgency === 3) {
                if (impact !== 1) {
                    setPriority(3);
                } else {
                    setPriority(2);
                }
            } else {
                if (urgency === 2) {
                    if (impact === 1) {
                        setPriority(1);
                    } else if (impact === 4) {
                        setPriority(3);
                    } else {
                        setPriority(2);
                    }
                } else {
                    if (urgency === 1) {
                        if (impact < 3) {
                            setPriority(1);
                        } else {
                            setPriority(2);
                        }
                    }
                }
            }
        }
    };

    /**
   * Fetch maxId from the changeRequest table and set to requestNumber
   */
    function getRequestNumber() {
        axios({
            method: "GET",
            url: "/api/api/changerequests/",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                const data = response.data;

                let maxArray = [];
                for (let i = 0; i < data.length; i++) {
                    maxArray.push(data[i].requestId);
                }

                let maxid = Math.max(...maxArray) + 1;
                if (maxid === -Infinity) {
                    maxid = 1
                };
                maxid = maxid.toString().padStart(6, "0");

                setRequestNumber("CHR" + maxid);
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            });
    }

    /**
   * Handles change event  when assetDetails field are change
   */
    function handleChange(event) {
        const { value, name } = event.target;
        setRequestDetails((prevRequestDetails) => ({
            ...prevRequestDetails,
            [name]: value,
        }));
        props.onRequestDetailsChange(requestDetails);
    };

    /**
   *  Fetch all users from the api_user table and store it on userList state
   */
    function getUsers() {
        axios({
            method: "GET",
            url: "/api/api/users/",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                const data = response.data;
                setUserList(data);
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            });
    }

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
                                name="requestNumber"
                                id="outlined-requestnumber"
                                label="Request Number"
                                variant="filled"
                                margin="normal"
                                type="text"
                                disabled
                                // value="CHR000001"
                                value={requestNumber}
                            />
                            <TextField
                                fullWidth
                                name="projectName"
                                id="outlined-projectname"
                                label="Project Name"
                                variant="outlined"
                                margin="normal"
                                type="text"
                                value={requestDetails.projectName}
                                onChange={handleChange}
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
                                value={requestDetails.requestName}
                                onChange={handleChange}
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
                                    options={userList}
                                    groupBy={(option) => option.first_name[0]}
                                    getOptionLabel={(option) => `${option.first_name} ${option.last_name}`}
                                    noOptionsText={"No Results Found"}
                                    renderInput={(params) => (
                                        <TextField required {...params} label="Assigned To" />
                                    )}
                                    // value={user}
                                    onChange={(event, newValue) => {
                                        setRequestDetails((prevRequestDetails) => ({
                                            ...prevRequestDetails,
                                            assignedTo: newValue.id,
                                        }));
                                        props.onRequestDetailsChange(requestDetails);
                                    }}
                                />
                            </Box>
                            <Box pt={3}>
                                <Autocomplete
                                    id="grouped-userList"
                                    options={userList}
                                    groupBy={(option) => option.first_name[0]}
                                    getOptionLabel={(option) => `${option.first_name} ${option.last_name}`}
                                    noOptionsText={"No Results Found"}
                                    renderInput={(params) => (
                                        <TextField required {...params} label="Requested By" />
                                    )}
                                    // value={user}
                                    onChange={(event, newValue) => {
                                        setRequestDetails((prevRequestDetails) => ({
                                            ...prevRequestDetails,
                                            requestedById: newValue.id,
                                        }));
                                        props.onRequestDetailsChange(requestDetails);
                                    }}
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
                                value={requestDetails.department}
                                onChange={handleChange}
                            />
                            <TextField
                                fullWidth
                                name="requestContact"
                                id="outlined-request-contact"
                                label="Request Contact"
                                variant="outlined"
                                margin="normal"
                                type="text"
                                value={requestDetails.requestContact}
                                onChange={handleChange}
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
                                    value={impact}
                                    onChange={(event, newValue) => {
                                        setImpact(newValue);
                                    }}
                                    name="impact"
                                />
                                <Typography>Urgency</Typography>
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
                                    value={urgency}
                                    onChange={(event, newValue) => {
                                        setUrgency(newValue);
                                    }}
                                    name="urgency"
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
                                    value={priority}
                                />
                            </Grid>
                            <Grid item xs={1} />
                        </Grid>
                    </Box>
                    <TextField
                        id="decsription"
                        label="Description"
                        rows={4}
                        variant="filled"
                        multiline
                        fullWidth
                        name="description"
                        value={requestDetails.description}
                        onChange={handleChange}
                    />
                </Box>
            </Collapse>
        </List>
    )
}

export default RequestForm