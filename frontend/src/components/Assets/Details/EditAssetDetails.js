import React, { useState, useEffect } from "react";

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

import axios from "axios";
import { Box } from "@mui/system";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import Owner from "./Owner";
import Status from "./Status";
import Category from "./Category";
import AssignedTo from "./AssignedTo";

function EditAssetDetails({
    detail,
    onAssetDetailsChange,
    onAssetDetailCategoryChange,
    onAssetDetailStatusChange,
    onAssetDetailAssignedToChange,
    onAssetDetailOwnerChange,
    errorAssetDetails,
    }) {
    const [open, setOpen] = useState(false);
    const [userList, setUserList] = useState([]);
    const [statusList, setStatusList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [counter, setCounter] = useState(3);

    console.log(detail.assetNumber);

    const token = sessionStorage.getItem("access");
    
    /**
     * Fetches the users from the database and stores them in the userList state.
     */
    const getUsers = async() => {
        try {
            const response = await axios({
                method: "GET",
                url: `/api/users/`,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.data;
            // console.log(data, "EditAssetDetails.js");
            setUserList(data);
        } catch (error) {
            if (error.response) {
                console.log(error.response);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        }
    }

    /**
     * Fetches the roles from the database and stores them on the statusList state.
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
            // console.log(data, "EditAssetDetails.js");
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
        console.log("Used");
        getUsers();
        getStatus();
    }, []);

    useEffect(() => {
        if (userList.length && statusList.length) {
          setLoading(false);
        }
      });

    useEffect(() => {
        if (open) {
            counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
        }
    }, [counter, open]);

    /**
     * Handles the open and close of the asset forms.
     */
     const handleCollapse = () => {
        setOpen(!open);
    };

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

                {loading ? (
                    <div className="spinner">
                        {counter !== 0 ? (
                            <>
                            <span>Loading. . .</span>
                            <div className="half-spinner"></div>
                            </>
                        ) : (
                            <h1>Asset Details Not Found</h1>
                        )}
                    </div>
                ) : (

                <Box
                    disablePadding
                    p={4} component="div"
                    sx={{
                        border: 0,
                        color: 'black',
                        bgcolor: '#ffebee',
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
                                value={`AST${detail.assetNumber.toString().padStart(6, "0")}`}
                                label="Asset Number"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />

                            <TextField
                                required
                                fullWidth
                                type="text"
                                id="assetName"
                                margin="normal"
                                name="assetName"
                                label="Asset Name"
                                variant="outlined"
                                defaultValue={detail.assetName}
                                onChange={onAssetDetailsChange}
                                error={errorAssetDetails.errorName}
                                helperText={errorAssetDetails.errorName}
                            />

                            <TextField
                                required
                                fullWidth
                                type="text"
                                id="ipAddress"
                                margin="normal"
                                name="ipAddress"
                                label="IP Address"
                                variant="outlined"
                                defaultValue={detail.ipAddress}
                                onChange={onAssetDetailsChange}
                                error={errorAssetDetails.errorIP}
                                helperText={errorAssetDetails.errorIP}
                            />

                            <Box sx={{ mt: 2}}>
                                <AssignedTo
                                    users={userList}
                                    editAssign={detail.assignedTo}
                                    errorAssetDetails={errorAssetDetails}
                                    handleChange={onAssetDetailAssignedToChange}
                                />
                            </Box>

                            <Box sx={{ mt: 3}}>
                                <Owner
                                    users={userList}
                                    editOwner={detail.owner}
                                    errorAssetDetails={errorAssetDetails}
                                    handleChange={onAssetDetailOwnerChange}                                    
                                />
                            </Box>
                        </Grid>

                        <Grid item xs={2} />

                        <Grid item xs={4}>
                            <TextField
                                required
                                fullWidth
                                type="text"
                                margin="normal"
                                id="serialNumber"
                                variant="outlined"
                                name="serialNumber"
                                label="Serial Number"
                                defaultValue={detail.serialNumber}
                                onChange={onAssetDetailsChange}
                                error={errorAssetDetails.errorSerial}
                                helperText={errorAssetDetails.errorSerial}
                            />

                            <Box sx={{ mt: 2}}>
                                <Category
                                    editCategory={detail.category}
                                    errorAssetDetails={errorAssetDetails}
                                    handleChange={onAssetDetailCategoryChange}
                                />
                            </Box>

                            <Box sx={{ mt: 3, mb: 1 }}>
                                <Status
                                    status={statusList}
                                    editStatus={detail.status}
                                    errorAssetDetails={errorAssetDetails}
                                    handleChange={onAssetDetailStatusChange}
                                />
                            </Box>

                            <TextField
                                required
                                fullWidth
                                type="text"
                                id="location"
                                margin="normal"
                                name="location"
                                label="Location"
                                variant="outlined"
                                defaultValue={detail.location}
                                onChange={onAssetDetailsChange}
                                error={errorAssetDetails.errorLocation}
                                helperText={errorAssetDetails.errorLocation}
                            />

                            <TextField
                                required
                                fullWidth
                                type="text"
                                margin="normal"
                                variant="outlined"
                                id="assetResources"
                                name="assetResources"
                                label="Asset Resources"
                                defaultValue={detail.assetResources}
                                onChange={onAssetDetailsChange}
                                error={errorAssetDetails.errorResource}
                                helperText={errorAssetDetails.errorResource}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} mt={2}>
                        <Grid item xs={1} />

                        <Grid item xs={10} >
                            <TextField
                                required
                                fullWidth
                                multiline
                                type="text"
                                maxRows={5}
                                minRows={5}
                                variant="filled"
                                id="description"
                                name="description"
                                label="Description"
                                inputProps={{ maxLength: 6 }}
                                defaultValue={detail.description}
                                onChange={onAssetDetailsChange}
                                error={errorAssetDetails.errorDescription}
                                helperText={errorAssetDetails.errorDescription}
                            />
                        </Grid>
                    </Grid>
                </Box>
                )}
            </Collapse>
        </List>
    )
}

export default EditAssetDetails;
