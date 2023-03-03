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

function ViewRequestDetails({ id, users }) {
    const [open, setOpen] = useState(false);
    const token = sessionStorage.getItem("access");
    const [loading, setLoading] = useState(true);
    const [requestDetails, setRequestDetails] = useState("");
    
    const handleCollapse = () => {
        setOpen(!open);
    };

    /**
     * Fetches specified request details object from the database.
     */
    const getRequestDetail = async() => {
        try {
            const response = await axios({
                method: "GET",
                url: `/api/request/?requestId=${id}`,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.data;
            setRequestDetails(data);
            setLoading(false);
        } catch (error) {
            if (error.response) {
                console.log(error.response);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        }
    }

    useEffect(() => {
        getRequestDetail();
    }, []);

    /**
     * Gets the assigned to name of the specified request ticket. 
     *
     * @returns The assigned to name of the specified request ticket. 
     */
    function getAssignedTo() {
        let userValue = "";

        users.forEach(user => {
            if (requestDetails.assignedTo === user.id) {
                userValue = user.username;
            }
        });

        return userValue;
    }

    /**
     * Gets the requested by name of the specified request ticket. 
     *
     * @returns The requestedby name of the specified request ticket. 
     */
    function getRequestedBy() {
        let userValue = "";

        users.forEach(user => {
            if (requestDetails.requestedById === user.id) {
                userValue = user.username;
            }
        });

        return userValue;
    }

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
                                        <TextField
                                            fullWidth
                                            type="text"
                                            margin="normal"
                                            id="outlined-requestnumber"
                                            variant="filled"
                                            name="requestNumber"
                                            label="Request Number"
                                            value={`CHR${requestDetails.requestNumber.toString().padStart(6, "0")}`}
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
                                            value={requestDetails.projectName}
                                            InputProps={{
                                                readOnly: true,
                                            }}
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
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={1} />
                                </Grid>

                                <br />
                                <Divider />

                                <Grid container spacing={2}>
                                    <Grid item xs={1} />

                                    <Grid item xs={4}>
                                        <TextField
                                            fullWidth
                                            name="assignedTo"
                                            id="outlined-assignedTo"
                                            label="Assigned To"
                                            variant="outlined"
                                            margin="normal"
                                            type="text"
                                            value={getAssignedTo()}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        />

                                        <TextField
                                            fullWidth
                                            name="requestedBy"
                                            id="outlined-requestedBy"
                                            label="Requested By"
                                            variant="outlined"
                                            margin="normal"
                                            type="text"
                                            value={getRequestedBy()}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        />
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
                                            InputProps={{
                                                readOnly: true,
                                            }}

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
                                            InputProps={{
                                                readOnly: true,
                                            }}
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
                                                value={requestDetails.impact}
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
                                                value={requestDetails.urgency}
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
                                                value={requestDetails.priority}
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
                                    value={requestDetails.description}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </>
                        )}
                    </Box>
                </Collapse>
            </List>
        </>
    )
}

export default ViewRequestDetails;