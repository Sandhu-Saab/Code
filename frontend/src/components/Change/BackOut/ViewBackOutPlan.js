import React, { useState, useEffect } from 'react';

import {
    List,
    ListSubheader,
    ListItemButton,
    ListItemText,
    Collapse,
    TextField,
} from "@mui/material";

import axios from "axios";
import { Box } from '@mui/system';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

function ViewBackOutPlan({ id }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const token = sessionStorage.getItem("access");
    const [backout, setBackOut] = useState("");

    const handleCollapse = () => {
        setOpen(!open);
    };

    /**
     * Fetches specified Backout Plan object from the database.
     */
    const getBackOut = async() => {
        try {
            const response = await axios({
                method: "GET",
                url: `/api/backoutPlanData/${id}/`,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.data;
            setBackOut(data);
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
        getBackOut();
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
                    <ListItemText primary="BackOut Plan" />
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
                                <TextField
                                    id="description"
                                    label="Description"
                                    rows={4}
                                    variant="filled"
                                    multiline
                                    fullWidth
                                    name="description"
                                    value={backout.description}
                                />
                            </>
                        )}
                    </Box>
                </Collapse>
            </List>
        </>
    )
}

export default ViewBackOutPlan;