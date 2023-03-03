import React, { useState, useEffect } from "react";

import {
  List,
  ListSubheader,
  ListItemButton,
  ListItemText,
  Collapse,
  Grid, 
  Button,
  Stack,
} from "@mui/material";

import moment from 'moment';
import "../../../layouts/preloader3.css";
import axios from "axios";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import {
    getAssetNumber
} from "./DependencyGetter";

/**
 * 
 * @param {*} param0 
 * @returns 
 */
function Dependencies({
    onDependenciesChange,
    token,
    }) {
    const [open, setOpen] = useState(false);
    const [counter, setCounter] = useState(7);
    const [loading, setLoading] = useState(true);
    const [selectedId, setSelectedId] = useState();

    const [userList, setUserList] = useState([]);
    const [assetList, setAssetList] = useState([]);
    const [detailList, setDetailList] = useState([]);

    const [statusList, setStatusList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [decommissionStatus, setDecommissionStatus] = useState("");

    /**
     * Handles the dropdown of dependencies.
     */
    const handleCollapse = () => {
        setOpen(!open);
    };

    /**
     * Redirects user to a new asset to create.
     */
    function navigateNewAsset() {
        window.open("/asset/new", "_blank");
    }

    /**
     *  Fetch all assets from the database and store it on assetList state
     */
    const getAssets = async() => {
        try {
            const response = await axios({
                method: "GET",
                url: `/api/assets/`,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.data;
            setAssetList(data);
            setLoading(false);
        } catch (error) {
            if (error.response) {
                console.log(error.response);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        }
    }


    /**
     * Fetches the users from the database and stores them on userList state.
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
            // console.log(data, "AssetsTestDataGrid.js");
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
     * Fetches the status values and stores them in the status list.
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
            // console.log(data, "AssetsTestDataGrid.js");
            setStatusList(data);
            setDecommissionStatus(data.find((data) => data.name === "Decommissioned"));
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
        getAssets();
    }, []);

    useEffect(() => {
        if (open) {
            counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
        }
    }, [counter, open]);

    /**
     * Gets the username of the user who created each asset ticket. 
     *
     * @param {*} params 
     * @returns The username of the user who created each asset ticket. 
     */
    function getCreatedByUser(params) {
        let userValue = ""

        userList.forEach((user) => {
            if(user.id === params.row.createdBy){
                userValue = user.username;
            }
        });

        if(userValue === ""){
            userValue = "N/A";
        };

        return userValue;
    }

    /**
     * Gets the asset name of each asset ticket. 
     *
     * @param {*} params 
     * @returns The asset name of each asset ticket. 
     */
    function getAssetName(params) {
        let assetName = params.row.asset_name;

        return assetName;
    }

    /**
     * Gets the category of each asset ticket.
     *
     * @param {*} params 
     * @returns The category of each asset ticket.
     */
    function getAssetCategory(params) {
        let category = params.row.category;

        return category;
    }

    /**
     * Gets the ip address of each asset ticket.
     * 
     * @param {*} params 
     * @returns The ip address of each asset ticket.
     */
    function getIPAddress(params) {
        let ipAddress = params.row.ip_address;

        return ipAddress;
    }

    /**
     * Gets the serial number of each asset ticket.
     * 
     * @param {*} params 
     * @returns The serial number of each asset ticket.
     */
    function getSerialNumber(params) {
        let serialNumber = params.row.serial_number;

        return serialNumber;
    }

    /**
     * Gets the assigned to name of each asset ticket. 
     *
     * @param {*} params 
     * @returns The assigned to name of each asset ticket. 
     */
    function getAssignedTo(params) {
        let userValue = ""
        
        userList.forEach((user) => {
            if(user.id === params.row.assignedTo){
                userValue = user.username;
            }
        });

        if(userValue === ""){
            userValue = "N/A";
        };

        return userValue;
    }

    /**
     * Gets the owner name of each asset ticket. 
     *
     * @param {*} params 
     * @returns The owner name of each asset ticket. 
     */
    function getOwner(params) {
        let userValue = ""

        userList.forEach((user) => {
            if(user.id === params.row.user_id){
                userValue = user.username;
            }
        });

        if(userValue === ""){
            userValue = "N/A";
        };

        return userValue;
    }

    /**
     * Gets the location of each asset ticket.
     * 
     * @param {*} params 
     * @returns The location of each asset ticket.
     */
    function getLocation(params) {
        let location = params.row.location;

        return location;
    }

    /**
     * Gets the formatted created date of each asset ticket.
     * 
     * @param {*} params 
     * @returns The formatted created date of each asset ticket.
     */
    function getDateCreated(params) {
        return moment(params.row.dateAdded).format("MMM Do YYYY, h:mm a");
    }

    /**
     * Gets the status of each asset ticket.
     *
     * @param {*} params 
     * @returns The status of each asset ticket.
     */
    function getAssetStatus(params) {
        let assetStatus = ""
        
        statusList.forEach((status) => {
            if(status.asset_status_id === params.row.status){
                assetStatus = status.name
            }
        });

        if(assetStatus === ""){
            assetStatus = "N/A";
        }

        return assetStatus;
    }
    
    const columns = [
        {
            field: 'assetInfoId',
            headerName: 'Asset Number',
            width: 180,
            headerAlign: "left",
            align: "left",
            valueGetter: getAssetNumber,
        },
        {
            field: 'createdBy',
            headerName: 'Created By',
            width: 130,
            headerAlign: "center",
            align: "center",
            valueGetter: getCreatedByUser,
        },
        {
            field: 'assetName',
            headerName: 'Asset Name',
            width: 150,
            headerAlign: "center",
            align: "center",
            valueGetter: getAssetName,
        },
        {
            field: 'category',
            headerName: 'Category',
            width: 120,
            headerAlign: "center",
            align: "center",
            valueGetter: getAssetCategory,
        },
        {
            field: 'ipAddress',
            headerName: 'IP Address',
            width: 130,
            headerAlign: "center",
            align: "center",
            valueGetter: getIPAddress,
        },
        {
            field: 'serialNumber',
            headerName: 'Serial No.',
            width: 140,
            headerAlign: "center",
            align: "center",
            valueGetter: getSerialNumber,
        },
        {
            field: 'assignedTo',
            headerName: 'Assigned To',
            width: 150,
            headerAlign: "center",
            align: "center",
            valueGetter: getAssignedTo,
        },
        {
            field: 'owner',
            headerName: 'Owner',
            width: 150,
            headerAlign: "center",
            align: "center",
            valueGetter: getOwner,
        },
        {
            field: 'location',
            headerName: 'Location',
            width: 150,
            headerAlign: "center",
            align: "center",
            valueGetter: getLocation,
        },
        {
            field: 'dateCreated',
            headerName: 'Date Created',
            width: 180,
            headerAlign: "center",
            align: "center",
            valueGetter: getDateCreated,
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 150,
            headerAlign: "center",
            align: "center",
            valueGetter: getAssetStatus,
        },
    ];

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
                <ListItemText primary="Dependencies" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={open} timeout="auto" unmountOnExit>
                <Box
                    p={4} component="div"
                    disablePadding
                    sx={{
                        border: 0,
                        color: 'black',
                        bgcolor: '#ffebee',
                        borderColor: 'primary.main' 
                    }}
                >
                    {loading ? (
                        <div className="spinner">
                            {counter !== 0
                                ? <>
                                    <span>Loading. . .</span>
                                    <div className="half-spinner"></div>
                                </> 
                                : <div style={{ height: 400, width: "100%" }}>
                                    <DataGrid
                                        rows={assetList}
                                        getRowId={(assetList) => assetList.id}
                                        columns={columns}
                                        pageSize={5}
                                        rowsPerPageOptions={[5]}
                                        checkboxSelection
                                        disableSelectionOnClick
                                        components={{
                                            NoRowsOverlay: () => (
                                                <Stack height="100%" alignItems="center" justifyContent="center"> 
                                                    No rows in Datagrid
                                                </Stack>
                                            )
                                        }}
                                    />
                                </div>
                            }
                        </div>
                    ) : (
                        <Grid container spacing={2}>
                            <Grid item xs={1} />

                            <div style={{ height: 400, width: "100%" }}>
                                <DataGrid
                                    rows={assetList}
                                    getRowId={(assetList) => assetList.id}
                                    columns={columns}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]}
                                    checkboxSelection
                                    disableSelectionOnClick
                                    selectionModel={selectedId}
                                    onSelectionModelChange={(id) => {
                                        const selectedIDs = new Set(id);
                                        const selectedRowData = assetList.filter((row) =>
                                          selectedIDs.has(row.id)
                                        );
                                        
                                        setSelectedId(id)
                                        onDependenciesChange(id);
                                    }}

                                    initialState={{
                                        sorting: {
                                          sortModel: [
                                            {
                                              field: "asset_number",
                                              sort: "asc",
                                            },
                                          ],
                                        },
                                    }}
                                />
                            </div>
                            
                            <Grid item xs={1} />
                        </Grid>
                    )}

                </Box>
            </Collapse>
        </List>
    )
}

export default Dependencies;
