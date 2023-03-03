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
import { Box } from '@mui/system';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

function ViewRiskAssessment({
    id
    }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const token = sessionStorage.getItem("access");
    const [assessment, setAssessment] = useState("");

    const handleCollapse = () => {
        setOpen(!open);
    };

    /**
     * Fetches specified request details object from API.
     */
    const getAssessment = async() => {
        try {
            const response = await axios({
                method: "GET",
                url: `/api/assessmentData/${id}/`,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.data;
            setAssessment(data);
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
        getAssessment();
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
                                        <TextField
                                            fullWidth
                                            type="text"
                                            margin="normal"
                                            name="configuration"
                                            variant="outlined"
                                            label="Configuration"
                                            id="configuration"
                                            value={assessment.doc_config}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        />

                                        <TextField
                                            fullWidth
                                            type="text"
                                            margin="normal"
                                            name="redundancy"
                                            variant="outlined"
                                            label="Redundancy"
                                            id="redundancy"
                                            value={assessment.redundancy}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={2} />

                                    <Grid item xs={4}>
                                        <TextField
                                            fullWidth
                                            type="text"
                                            margin="normal"
                                            name="environment"
                                            variant="outlined"
                                            label="Environment"
                                            id="environment"
                                            value={assessment.enviroment}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        />

                                        <TextField
                                            fullWidth
                                            type="text"
                                            margin="normal"
                                            name="maturities"
                                            variant="outlined"
                                            label="Environment Maturity"
                                            id="maturities"
                                            value={assessment.enviroment_maturity}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        />
                                    </Grid>
                                </Grid>

                                <br />
                                <Divider />

                                <Grid container spacing={2}>
                                    <Grid item xs={1} />

                                    <Grid item xs={4}>
                                       <TextField
                                            fullWidth
                                            type="text"
                                            margin="normal"
                                            name="implement"
                                            variant="outlined"
                                            label="Time to Implement"
                                            id="implement"
                                            value={assessment.time_to_implement}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        />

                                       <TextField
                                            fullWidth
                                            type="text"
                                            margin="normal"
                                            name="deployment"
                                            variant="outlined"
                                            label="Deployment Window"
                                            id="deployment"
                                            value={assessment.deployment_window}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={2} />

                                    <Grid item xs={4}>
                                        <TextField
                                            fullWidth
                                            type="text"
                                            margin="normal"
                                            name="history"
                                            variant="outlined"
                                            label="Change History"
                                            id="history"
                                            value={assessment.change_history}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        />

                                        <TextField
                                            fullWidth
                                            type="text"
                                            margin="normal"
                                            name="member"
                                            variant="outlined"
                                            label="Number of Staff/Teams Required"
                                            id="member"
                                            value={assessment.num_of_staff}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        />
                                    </Grid>
                                </Grid>

                                <br />
                                <Divider />

                                <Grid container spacing={2}>
                                    <Grid item xs={1} />

                                    <Grid item xs={4}>
                                        <TextField
                                            fullWidth
                                            type="text"
                                            margin="normal"
                                            name="production"
                                            variant="outlined"
                                            label="Pre-Production Testing"
                                            id="production"
                                            value={assessment.testing}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        />

                                        <TextField
                                            fullWidth
                                            type="text"
                                            margin="normal"
                                            name="schedule"
                                            variant="outlined"
                                            label="Change Scheduling"
                                            id="schedule"
                                            value={assessment.scheduling}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={2} />

                                    <Grid item xs={4}>
                                        <TextField
                                            fullWidth
                                            type="text"
                                            margin="normal"
                                            name="backout"
                                            variant="outlined"
                                            label="Backout Plan"
                                            id="backout"
                                            value={assessment.backout_plan}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        />
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

export default ViewRiskAssessment;