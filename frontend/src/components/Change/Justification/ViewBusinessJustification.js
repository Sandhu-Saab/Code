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
} from "@mui/material";

import axios from "axios";
import moment from 'moment';
import { Box } from '@mui/system';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

function ViewBusinessJustification({ id }) {
    const [open, setOpen] = useState(false);
    const token = sessionStorage.getItem("access");
    const [justification, setJustification] = useState("");

    const handleCollapse = () => {
        setOpen(!open);
    };

    /**
     * Fetches specified business justification object from the database.
     */
    const getBusinessJustification = async() => {
        try {
            const response = await axios({
                method: "GET",
                url: `/api/businessData/${id}/`,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.data;
            setJustification(data);
        } catch (error) {
            if (error.response) {
                console.log(error.response);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        }
    }

    useEffect(() => {
        getBusinessJustification();
    }, []);
    
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
                    <ListItemText primary="Business Justification Form" />
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
                                    name="startDate"
                                    variant="outlined"
                                    label="Start Date"
                                    id="outlined-start-date"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    value={moment(justification.start_date).format("MMM Do YYYY, h:mm a")}
                                />
                            </Grid>

                            <Grid item xs={2} />

                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    type="text"
                                    margin="normal"
                                    name="endDate"
                                    variant="outlined"
                                    label="End Date"
                                    id="outlined-end-date"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    value={moment(justification.end_date).format("MMM Do YYYY, h:mm a")}
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
                                    margin='normal'
                                    id="purpose"
                                    label="What is it for?"
                                    variant="filled"
                                    multiline
                                    fullWidth
                                    name="purpose"
                                    rows={5}
                                    value={justification.purpose}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>

                            <Grid item xs={2} />

                            <Grid item xs={4}>
                                <TextField
                                    margin='normal'
                                    id="need"
                                    label="Why the change is needed?"
                                    variant="filled"
                                    multiline
                                    fullWidth
                                    name="need"
                                    rows={5}
                                    value={justification.need}
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
                                    margin='normal'
                                    id="security"
                                    label="How long will it be in effect?"
                                    variant="filled"
                                    multiline
                                    fullWidth
                                    name="security"
                                    rows={5}
                                    value={justification.duration}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>

                            <Grid item xs={2} />

                            <Grid item xs={4}>
                                <TextField
                                    margin='normal'
                                    id="accessibility"
                                    label="Accessibility"
                                    variant="filled"
                                    multiline
                                    fullWidth
                                    name="accessibility"
                                    rows={5}
                                    value={justification.accessibility}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>

                            <Grid item xs={1} />
                        </Grid>
                    </Box>
                </Collapse>
            </List>
        </>
    )
}

export default ViewBusinessJustification;