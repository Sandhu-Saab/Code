
import axios from "axios";
import React, { useState, useEffect } from "react";

import {
    Link,
    ListItemButton,
} from "@mui/material";

import moment from 'moment';
import "../../layouts/preloader3.css";
import { Box } from "@mui/system";

import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import { DataGrid } from "@mui/x-data-grid";
import ConfirmModal from "../../layouts/ConfirmModal";

import {
    getAssetNumber
} from "./Dependency/DependencyGetter";

function AssetsDataGrid() {
    const [loading, setLoading] = useState(true);
    const token = sessionStorage.getItem("access");
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const [selectedAssetId, setSelectedAssetId] = useState();

    const currentUserId = sessionStorage.getItem("userId");
    const currentUserRole = sessionStorage.getItem("roleId");
    const currentUserSection = sessionStorage.getItem("section");

    const [userList, setUserList] = useState([]);
    const [assetList, setAssetList] = useState([]);
    const [detailList, setDetailList] = useState([]);
    const [statusList, setStatusList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [decommissionStatus, setDecommissionStatus] = useState();
    const [counter, setCounter] = useState(3);
    const [open, setOpen] = useState(true);

    const handleDialogOpen = (props) => {
        setDialogIsOpen(true);
        setSelectedAssetId(props.id);
    };
    
    const handleDialogClose = () => {
        setDialogIsOpen(false);
    };
    
    /**
     * Deteremines if the specific user logged in has the permissions to have certain
     * actions (Edit/Decommission) on a asset ticket from the asset list. 
     *
     * @param {Each rows object values} cellValues 
     * @returns True if permitted, false if not.
     */
    const editAssets = (cellValues) => {
        let isPermitted = true;

        // // Instructor
        // if (currentUserRole === "3") {
        //     if (cellValues.row.assetOwnerSection !== currentUserSection) {
        //         isPermitted = false;
        //     }
        // }

        // Student
        if (currentUserRole === "4") {
            if (cellValues.row.createdBy !== currentUserId) {
                isPermitted = false;
            }
        }

        return isPermitted;
    }

    /**
     * Determines if the currently logged in user is able to view the Decomission button on each Asset.
     * 
     * @param {The row's object values} cellValues 
     * @returns True if permitted, false if not
     */
    const decommissionAsset = (cellValues) => {
        let isVisible = true;

        if (cellValues.row.status === Number.parseInt(decommissionStatus)) {
            isVisible = false;
        }

        if (currentUserRole === "3" || currentUserRole === "4") {
            if (cellValues.row.assetOwnerRole === 1 || cellValues.row.assetOwnerRole === 2) {
                isVisible = false;
            }
        }

        if (currentUserRole === "4") {
            if (cellValues.row.assetOwnerRole === 3) {
                isVisible = false;
            }
        }

        return isVisible;
    }

    /**
     * Fetches the values of assets from the API.
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
     * Fetches the values of statuses from the database.
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

            // DecommissionStatus ID is set to 6 by default
            setDecommissionStatus(6);
        } catch (error) {
            if (error.response) {
                console.log(error.response);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        }
    }

    

    /**
     * Fetches the values of the users from the database.
     */
    const getUser = async() => {
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
            // console.log(data, "AssetsDataGrid.js");
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
        getUser();
        getStatus();
        getAssets();
    }, []);

    useEffect(() => {
        if (userList.length && statusList.length && assetList.length && detailList.length && categoryList.length) {
          setLoading(false);
        }
      });

    useEffect(() => {
        if (open) {
            counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
        }
    }, [counter, open]);

    /**
     * Changes the status value of the specified Asset to the DecomissionStatus value (which is probably 6).
     */
    function DecommissionAsset() {
        axios({
            method: "PATCH",
            url: `/api/assetData/${selectedAssetId}/`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            data: {
                status: Number.parseInt(decommissionStatus)
            }
        })
            .then(() => {
                window.location.reload(false);
            })
            .catch((error) => {
                if (error.response) {
                  console.log(error.response);
                  console.log(error.response.status);
                  console.log(error.response.headers);

                  window.alert(`${error.response}. Please try again...`);
                }
            });
    
        setDialogIsOpen(false);
    }

    /**
     * Gets the username of the user who created each asset ticket. 
     *
     * @param {Values of the object in the row} params 
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
     * @param {Values of the object in the row} params 
     * @returns The asset name of each asset ticket. 
     */
    function getAssetName(params) {

        let assetName = params.row.asset_name;

        return assetName;
    }

    /**
     * Gets the category of each asset ticket.
     *
     * @param {Values of the object in the row} params 
     * @returns The category of each asset ticket.
     */
    function getAssetCategory(params) {
        
        let category = params.row.category;
        
        return category;
    }

    /**
     * Gets the ip address of each asset ticket.
     * 
     * @param {Values of the object in the row} params 
     * @returns The ip address of each asset ticket.
     */
    function getIPAddress(params) {

        let ipAddress = params.row.ip_address;

        return ipAddress;
    }

    /**
     * Gets the serial number of each asset ticket.
     * 
     * @param {Values of the object in the row} params 
     * @returns The serial number of each asset ticket.
     */
    function getSerialNumber(params) {

        let serialNumber = params.row.serial_number;

        return serialNumber;
    }

    /**
     * Gets the assigned user's name for each asset ticket. 
     *
     * @param {Values of the object in the row} params 
     * @returns The assigned user's name for each asset ticket. 
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
     * @param {Values of the object in the row} params 
     * @returns The owner name of each asset ticket. 
     */
    function getOwner(params) {
        let userValue = "";

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
     * @param {Values of the object in the row} params 
     * @returns The location of each asset ticket.
     */
    function getLocation(params) {

        let location = params.row.location;

        return location;
    }

    /**
     * Gets the formatted created date of each asset ticket.
     * 
     * @param {Values of the object in the row} params 
     * @returns The formatted created date of each asset ticket.
     */
    function getDateCreated(params) {
        return moment(params.row.dateAdded).format("MMM Do YYYY, h:mm a");
    }

    /**
     * Gets the status of each asset ticket.
     *
     * @param {Values of the object in the row} params 
     * @returns The status of each asset ticket.
     */
    function getAssetStatus(params) {
        let assetStatus = "";

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
        {
            field: "View",
            width: 60,
            headerAlign: "center",
            align: "center",
            renderCell: (cellValues) => {
                return (
                    <Link href={`/asset/view?assetId=${cellValues.row.id}`}>
                        <ListItemButton>
                            <VisibilityIcon />
                        </ListItemButton>
                    </Link>  
                )
            },
        },
        {
            field: "Edit",
            width: 60,
            headerAlign: "center",
            align: "center",
            renderCell: (cellValues) => {
                return (
                    <>
                        {editAssets(cellValues) &&
                            <Link href={`/asset/edit?assetId=${cellValues.row.id}&licenseId=${cellValues.row.license_id}`}>
                                <ListItemButton>
                                    <EditIcon />    
                                </ListItemButton>
                            </Link>
                        }
                    </>
                );
            },
        },
        {
            field: "Decommission",
            width: 120,
            headerAlign: "center",
            align: "center",
            renderCell: (cellValues) => {
                return (
                    <>
                        {decommissionAsset(cellValues) &&
                            <Link>
                                <ListItemButton onClick={() => {
                                    handleDialogOpen({ id: cellValues.row.id });
                                }}>
                                    <RemoveCircleIcon />    
                                </ListItemButton>
                            </Link>
                        }
                    </>
                );
            },
        },
    ]

    return (
        <>
            {loading ? (
                <div className="spinner">
                    {counter !== 0 ? (
                        <>
                            <span>Loading. . .</span>
                            <div className="half-spinner"></div>
                        </>
                    ) : (
                        <h1>No Assets Found</h1>
                    )}
                </div>
            ) : (
                <Box
                    sx={{
                        height: 800,
                        width: "100%",
                    }}
                >
                    <DataGrid
                        rows={assetList}
                        getRowId={(assetList) => assetList.id}
                        columns={columns}
                        pageSize={15}
                        rowsPerPageOptions={[10]}
                        disableSelectionOnClick
                        initialState={{
                            sorting: {
                              sortModel: [
                                {
                                  field: "assetInfoId",
                                  sort: "desc",
                                },
                              ],
                            },
                          }}
                    />
                </Box>
            )}

            {dialogIsOpen && <ConfirmModal title="Decommission Asset" message='Are you sure you want to decommission Asset?' selectedAssetId={selectedAssetId} onCancel={handleDialogClose} onConfirm={DecommissionAsset}/>}
        </>
    )
}

export default AssetsDataGrid;