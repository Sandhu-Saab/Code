import React from "react";
import {
  List,
  Grid,
  Collapse,
  TextField,
  Typography,
  ListItemText,
  ListSubheader,
  ListItemButton,
} from "@mui/material";

import { Box } from '@mui/system';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useState, useEffect } from "react";
import axios from "axios";

/**
 * Returns the Asset Details Dropdown view form.
 * 
 * @param {Specific asset data information object.} detail 
 * @returns The Asset Details Dropdown view form.
 */
function ViewAssetDetails({ detail }) {
    const [open, setOpen] = useState(false);
    const [userList, setUserList] = useState([]);
    const [statusList, setStatusList] = useState([]);
    const token = sessionStorage.getItem("access");
    /**
     * Handles the open and close of the asset details dropdown.
     */
    const handleCollapse = () => {
        setOpen(!open);
    };

    /**
     * Fetches the users from the database and stores them on the userList state.
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
    };

    /**
     * Fetches the statuses from the database and stores them on the statusList state.
     */
     const getStatus = async() => {
        try {
            const response = await axios({
                method: "GET",
                url: `/api/assetStatusData/`,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.data;
            setStatusList(data);
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
        getStatus();
    }, []);

    /**
     * Returns the specified user object based on the given user ID
     * @param {The ID of the specified user} id 
     * @returns The specified user object
     */
    function getRequestedUser(id) {

        let userValue = "";

        userList.forEach((user) => {
            if(user.id === id){
                userValue = user.username;
            }
        });

        if(userValue === ""){
            userValue = "N/A";
        };

        return userValue;
    }

    function getAssetStatus(statusId) {
        let assetStatus = ""

        statusList.forEach((status) => {
            if(status.asset_status_id === statusId){
                assetStatus = status.name
            }
        });

        if(assetStatus === ""){
            assetStatus = "N/A";
        }

        return assetStatus;
    }

    return (
        <List
            sx={{ width: '100%', color: 'white', bgcolor: '#1e88e5', borderRadius: 2 }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader" />
            }   
        >
            <ListItemButton onClick={handleCollapse}>
                <ListItemText primary="Asset Details" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={open} timeout="auto" unmountOnExit>
                <Box
                    p={4}
                    component="div"
                    disablePadding
                    sx={{
                        color: 'black',
                        bgcolor: '#ffebee',
                        border: 0,
                        borderColor: 'primary.main'
                    }}
                >
                    <Typography variant="h5" color="#525252" align='center'>
                        Asset Details
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid item xs={1} />

                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                type="text"
                                margin="normal"
                                id="assetNumber"
                                variant="filled"
                                name="assetNumber"
                                label="Asset Number"
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={`AST${detail.asset_number.toString().padStart(6, "0")}`}
                            />

                            <TextField
                                fullWidth
                                type="text"
                                name="name"
                                id="assetName"
                                margin="normal"
                                variant="outlined"
                                label="Asset Name"
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={detail.asset_name}
                            />

                            <TextField
                                fullWidth
                                type="text"
                                id="ipAddress"
                                margin="normal"
                                name="ipAddress"
                                label="IP Address"
                                variant="outlined"
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={detail.ip_address}
                            />

                            <TextField
                                fullWidth
                                type="text"
                                id="assignedTo"
                                margin="normal"
                                name="assignedTo"
                                label="Assigned To"
                                variant="outlined"
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={getRequestedUser(detail.assignedTo)}
                            />

                            <TextField
                                fullWidth
                                type="text"
                                id="owner"
                                margin="normal"
                                name="owner"
                                label="Owner"
                                variant="outlined"
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={getRequestedUser(detail.user_id)}
                            />
                        </Grid>

                        <Grid item xs={2} />

                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                type="text"
                                margin="normal"
                                id="serialNumber"
                                variant="outlined"
                                name="serialNumber"
                                label="Serial Number"
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={detail.serial_number}
                            />

                            <TextField
                                fullWidth
                                type="text"
                                margin="normal"
                                id="category"
                                variant="outlined"
                                name="category"
                                label="Category"
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={detail.category}
                            />

                            <TextField
                                fullWidth
                                type="text"
                                margin="normal"
                                id="status"
                                variant="outlined"
                                name="status"
                                label="Status"
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={getAssetStatus(detail.status)}
                            />

                            <TextField
                                fullWidth
                                type="text"
                                id="location"
                                margin="normal"
                                name="location"
                                label="Location"
                                variant="outlined"
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={detail.location}
                            />

                            <TextField
                                fullWidth
                                type="text"
                                margin="normal"
                                variant="outlined"
                                id="assetResources"
                                name="assetResources"
                                label="Asset Resources"
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={detail.asset_resources}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} mt={2}>
                        <Grid item xs={1} />

                        <Grid item xs={10} >
                            <TextField
                                fullWidth
                                multiline
                                type="text"
                                maxRows={5}
                                minRows={5}
                                variant="filled"
                                id="description"
                                name="description"
                                label="Description"
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={detail.description}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Collapse>
        </List>
    )
}

export default ViewAssetDetails;