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

/**
 * AssetDetails dropdown form component for CreateAsset page
 * Parent component: CreateAsset
*/
function AssetDetails({
        onAssetDetailsChange,
        onAssetDetailCategoryChange,
        onAssetDetailStatusChange,
        onAssetDetailAssignedToChange,
        onAssetDetailOwnerChange,
        assetId,
        errorAssetDetails
    }) {

    const [open, setOpen] = useState(false);
    const [userList, setUserList] = useState([]);
    const [statusList, setStatusList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [assetNumber, setAssetId] = useState(`AST${assetId.toString().padStart(6, "0")}`);

    const token = sessionStorage.getItem("access");

    /**
     * Handles the open and close of the asset forms.
     */
    const handleCollapse = () => {
        setOpen(!open);
    };

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
     * Fetches the roles from the database and stores them in the statusList state.
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
            // console.log(data, "AssetDetails.js");
            setStatusList(data.filter(data => data.name !== "Decommissioned"));
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
                                value={assetNumber}
                                label="Asset Number"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />

                            <TextField
                                required
                                fullWidth
                                type="text"
                                name="name"
                                id="assetName"
                                margin="normal"
                                variant="outlined"
                                label="Asset Name"
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
                                onChange={onAssetDetailsChange}
                                error={errorAssetDetails.errorIP}
                                helperText={errorAssetDetails.errorIP}
                            />

                            <Box sx={{ mt: 2}}>
                                <AssignedTo
                                    handleChange={onAssetDetailAssignedToChange}
                                    users={userList}
                                    errorAssetDetails={errorAssetDetails}
                                />
                            </Box>

                            <Box sx={{ mt: 3}}>
                                <Owner
                                    handleChange={onAssetDetailOwnerChange}
                                    users={userList}
                                    errorAssetDetails={errorAssetDetails}
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
                                onChange={onAssetDetailsChange}
                                error={errorAssetDetails.errorSerial}
                                helperText={errorAssetDetails.errorSerial}
                            />

                            <Box sx={{ mt: 2}}>
                                <Category
                                    editCategory={""}
                                    handleChange={onAssetDetailCategoryChange}
                                    errorAssetDetails={errorAssetDetails}
                                />
                            </Box>

                            <Box sx={{ mt: 3, mb: 1 }}>
                                <Status
                                    handleChange={onAssetDetailStatusChange}
                                    status={statusList}
                                    errorAssetDetails={errorAssetDetails}
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
                                inputProps={{ maxLength: 300 }}
                                onChange={onAssetDetailsChange}
                                error={errorAssetDetails.errorDescription}
                                helperText={errorAssetDetails.errorDescription}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Collapse>
        </List>
    )
}

export default AssetDetails;
