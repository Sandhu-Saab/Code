import React, { useState, useEffect } from "react";

import { DataGrid } from "@mui/x-data-grid";
import { Link, Box, ListItemButton, ListItemIcon } from "@mui/material";
import axios from "axios";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import moment from 'moment';


import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

function ChangeDataGrid() {
    const [loading, setLoading] = useState(true);
    const [userList, setUserList] = useState([]);
    const [status, setStatus] = useState([]);
    const [types, setTypes] = useState([]);
    const [requestList, setRequestList] = useState([]);
    const [counter, setCounter] = useState(3);
    const [open, setOpen] = useState(true);

    const token = sessionStorage.getItem("access");
  
    const currentUserId = sessionStorage.getItem("userId");
    const currentUserRole = sessionStorage.getItem("roleId");
    const currentUserSection = sessionStorage.getItem("section");

    /**
     * Fetches the values of the request data grid from the API.
     */
    const getRequest = async() => {
        try {
            const response = await axios({
                method: "GET",
                url: "/api/requests/",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
    
            const data = await response.data;
            // console.log(data, "ChangeDataGrid.js");

            // if (currentUserRole === "4") {
            //     setRequestList(data.filter(data => data.createdBy === Number.parseInt(currentUserId)));
            // } else if (currentUserRole === "3") {
            //     setRequestList(data.filter(data => data.requestOwnerSection === currentUserSection));
            // } else {
            //     setRequestList(data);
            // }

            setRequestList(data);

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
            // console.log(data, "ChangeDataGrid.js");
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
        getRequest();
    }, []);

    useEffect(() => {
        if (userList.length && status.length && types.length && requestList.length) {
          setLoading(false);
        }
      });

    useEffect(() => {
        if (open) {
            counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
        }
    }, [counter, open]);

    /*** Value Getters ***/

    /**
     * Gets the request number of the change request.
     * 
     * @param {*} params 
     * @returns The request number of the change request.
     */
    function getRequestNumber(params) {
        return "CHR" + String(params.row.requestNumber).padStart(6, '0');
    }

    /**
     * Gets the username of the user who created the request.
     * 
     * @param {*} params 
     * @returns The username of the user who created the request.
     */
    function getCreatedUser(params) {
        let userValue = ""

        userList.forEach((user) => {
            if(user.id === params.row.requestedById){
                userValue = user.username;
            }
        });

        if(userValue === ""){
            userValue = "N/A";
        };

        return userValue;
    }

    /**
     * Gets the value of the request's status based on the given int.
     * 
     * @param {*} params 
     * @returns The value of the request's status.
     */
    function getStatusValue(params) {
        
        let statusValue = "";

        if(params.row.status === 1){
            statusValue = "New";
        }
        else if(params.row.status === 2){
            statusValue = "Pending";
        }
        else if(params.row.status === 3){
            statusValue = "Approved";
        }
        else{
            statusValue = "N/A";
        }

        return statusValue;
    }

    /**
     * Gets the type of the request.
     * 
     * @param {*} params 
     * @returns The type of the request.
     */
    function getRequestType(params) {
        
        let typeValue = params.row.requestType

        return typeValue;
    }

    /**
     * Gets the date the request was created.
     * 
     * @param {*} params 
     * @returns The date the request was created.
     */
    function getDateCreated(params) {
        return moment(params.row.requestDateTime).format("MMM Do YYYY, h:mm a");
    }    

    function getRequestName(params) {
        let typeValue = ""

        types.forEach((type) => {
            if (Number.parseInt(type.changeTypeId) === Number.parseInt(params.row.type)) {
                typeValue = type.typeName;
            }
        });

        return typeValue;
    }

    /**
     * Gets the name of the request.
     * 
     * @param {*} params 
     * @returns The name of the request.
     */
    function getRequestName(params) {
        return params.row.requestName;
    }

    /**
     * Gets the username of the user assigned to the request.
     * 
     * @param {*} params 
     * @returns The username of the user assigned to the request.
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
     * Gets the department of the request.
     * 
     * @param {*} params 
     * @returns The department of the request.
     */
    function getDepartment(params) {
        return params.row.department;
    }

    /**
     * Gets the value of the request's priority based on the given int.
     * 
     * @param {*} params 
     * @returns The value of the request's priority.
     */
    function getPriorityValue(params) {
        let priorityValue = "";
        let rowPriority = params.row.priority;

        switch (rowPriority) {
            case 1:
                priorityValue = "Critical";
                break;
            case 2:
                priorityValue = "High";
                break;
            case 3:
                priorityValue = "Medium";
                break;
            case 4:
                priorityValue = "Low";
                break;
        }        

        return `${rowPriority} - ${priorityValue}`;
    }

    const columns = [
        {
            field: 'changeId',
            headerName: 'Request Number',
            width: 180,
            headerAlign: "left",
            align: "left",
            valueGetter: getRequestNumber,
        },
        {
            field: 'requestOwnerBy',
            headerName: 'Created By',
            width: 130,
            headerAlign: "left",
            align: "left",
            valueGetter: getCreatedUser,
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 120,
            headerAlign: "left",
            align: "left",
            valueGetter: getStatusValue,
        },
        {
            field: 'type',
            headerName: 'Request Type',
            width: 150,
            headerAlign: "center",
            align: "center",
            valueGetter: getRequestType,
        },
        {
            field: 'dateCreated',
            headerName: 'Request Date',
            width: 250,
            headerAlign: "center",
            align: "center",
            valueGetter: getDateCreated,
        },
        {
            field: 'requestName',
            headerName: 'Request Name',
            width: 250,
            headerAlign: "center",
            align: "center",
            valueGetter: getRequestName,
        },
        {
            field: 'assignedTo',
            headerName: 'Assigned To',
            width: 140,
            headerAlign: "center",
            align: "center",
            valueGetter: getAssignedTo,
        },
        {
            field: 'department',
            headerName: 'Department',
            width: 220,
            headerAlign: "center",
            align: "center",
            valueGetter: getDepartment,
        },
        {
            field: 'priority',
            headerName: ' Priority',
            width: 150,
            headerAlign: "center",
            align: "center",
            valueGetter: getPriorityValue,
        },
        {
            field: "View",
            width: 60,
            headerAlign: "center",
            align: "center",
            renderCell: (cellValues) => {
                return (
                    <Link href={`/change/view?requestId=${cellValues.row.id}`}>
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
                    <Link href={`/change/edit?requestId=${cellValues.row.id}`}>
                        <ListItemButton>
                            <EditIcon />    
                        </ListItemButton>
                    </Link>
                )
            },
        },
    ];

    const studentColumns = [
        {
            field: 'changeId',
            headerName: 'Request ID',
            width: 130,
            headerAlign: "left",
            align: "left",
            valueGetter: getRequestNumber,
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 120,
            headerAlign: "left",
            align: "left",
            valueGetter: getStatusValue,
        },
        {
            field: 'type',
            headerName: 'Request Type',
            width: 150,
            headerAlign: "center",
            align: "center",
            valueGetter: getRequestType,
        },
        {
            field: 'dateCreated',
            headerName: 'Request Date',
            width: 250,
            headerAlign: "center",
            align: "center",
            valueGetter: getDateCreated,
        },
        {
            field: 'requestName',
            headerName: 'Request Name',
            width: 250,
            headerAlign: "center",
            align: "center",
            valueGetter: getRequestName,
        },
        {
            field: 'assignedTo',
            headerName: 'Assigned To',
            width: 140,
            headerAlign: "center",
            align: "center",
            valueGetter: getAssignedTo,
        },
        {
            field: 'department',
            headerName: 'Department',
            width: 220,
            headerAlign: "center",
            align: "center",
            valueGetter: getDepartment,
        },
        {
            field: 'priority',
            headerName: ' Priority',
            width: 150,
            headerAlign: "center",
            align: "center",
            valueGetter: getPriorityValue,
        },
        {
            field: "View",
            width: 60,
            headerAlign: "center",
            align: "center",
            renderCell: (cellValues) => {
                return (
                    <Link href={`/change/view?requestId=${cellValues.row.id}`}>
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
                    <Link href={`/change/edit?requestId=${cellValues.row.id}`}>
                        <ListItemButton>
                            <EditIcon />    
                        </ListItemButton>
                    </Link>
                )
            },
        },
    ];    

    let dataColoumns = currentUserRole !== "4" ? columns : studentColumns;

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
                    <h1>No Requests Found</h1>
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
                        rows={requestList}
                        getRowId={(requestList) => requestList.id}
                        columns={dataColoumns}
                        pageSize={13}
                        rowsPerPageOptions={[13]}
                        disableSelectionOnClick
                        initialState={{
                            sorting: {
                                sortModel: [
                                {
                                    field: "id",
                                    sort: "asc",
                                },
                                ],
                            },
                        }}
                    />
              </Box>
            )}
        </>
    )
}

export default ChangeDataGrid;