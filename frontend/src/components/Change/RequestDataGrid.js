import React from 'react'
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { Link, Box, ListItemButton, ListItemIcon } from "@mui/material";
import axios from "axios";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import EditIcon from '@mui/icons-material/Edit';
import moment from 'moment';

/**
 * Request Datagrid component in request list page
 */
function RequestDataGrid() {
  const [requestList, setRequestList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = sessionStorage.getItem("access");

  const currentUserId = sessionStorage.getItem("userId");
  const currentUserRole = sessionStorage.getItem("roleId");
  const currentUserSection = sessionStorage.getItem("section");

  useEffect(() => {
    getRequests();
    getUsers();
  }, []);

  /**
   *  Fetch all requests from the database and store it on rqeuestList state
   */
  function getRequests() {
    axios({
      method: "GET",
      url: "/api/api/changerequests/?isActive=true",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const data = response.data;

        if (currentUserRole === "4") {
          setRequestList(data.filter(data => data.ownerId === Number.parseInt(currentUserId)));
        } else if (currentUserRole === "3") {
          setRequestList(data.filter(data => data.requestOwnerSection === currentUserSection));
        } else {
          setRequestList(data);
        }

        setLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  };

  /**
   * Fetch all assets from the database and store it on userList array state
   */
  function getUsers() {
    axios({
      method: "GET",
      url: `/api/api/users/`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const data = response.data;
        setUserList(data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  };

  // **************Value Getter ******************

  /**
   * Gets the username of the user assigned to the request.
   * 
   * @param {*} params 
   * @returns The username of the user assigned to the request.
   */
  function getAssignedTo(params) {
    for (let i = 0; i < userList.length; i++) {
      if (userList[i].id === params.row.assignedTo) {
        let username = userList[i].username;
        // console.log(username);
        return username;
      }
    };
  };

  /**
   * Gets the value of the status of the request.
   * 
   * @param {*} params 
   * @returns The value of the status of the request.
   */
  function getStatus(params) {
    switch (params.row.status) {
      case 1:
        return "Pending";
      case 2:
        return "Approved";

      default:
        return null;
    }
  };

  /**
   * Gets the value of the type of the request.
   * 
   * @param {*} params 
   * @returns The value of the type of the request.
   */
  function getRequestType(params) {
    switch (params.row.requestType) {
      case 1:
        return "Standard (Pre-Approved)";
      case 2:
        return "Normal (Minor)";
      case 3:
        return "Major (Requires CAB)";
      case 4:
        return "Emergency";

      default:
        return null;
    }
  };

  /**
   * Gets the value of the priority of the request.
   * 
   * @param {*} params 
   * @returns The value of the priority of the request.
   */
  function getPriority(params) {
    switch (params.row.priority) {
      case 1:
        return "1 - Critical";
      case 2:
        return "2 - High";
      case 3:
        return "3 - Medium";
      case 4:
        return "4 - Low";

      default:
        return null;
    }
  };

  /**
   * Gets the date of the request.
   * 
   * @param {*} params 
   * @returns The date of the request.
   */
  function getDateFormat(params) {
    return moment(params.row.requestDateTime).format("MMM Do YYYY, h:mm a");
  }

  const columns = [
    {
      field: 'requestId',
      headerName: 'Request ID',
      width: 100,
      headerAlign: "left",
      align: "left",
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      valueGetter: getStatus,
      headerAlign: "center",
      align: "center",
    },
    {
      field: 'requestType',
      headerName: 'Request Type',
      width: 250,
      valueGetter: getRequestType,
      headerAlign: "center",
      align: "center",
    },
    {
      field: 'requestDateTime',
      headerName: 'Request Date',
      width: 250,
      headerAlign: "center",
      valueGetter: getDateFormat,
      align: "center",
    },
    {
      field: 'requestName',
      headerName: 'Request Name',
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: 'assignedTo',
      headerName: 'Assigned To',
      width: 150,
      valueGetter: getAssignedTo,
      headerAlign: "center",
      align: "center",
    },
    {
      field: 'department',
      headerName: 'Department',
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: 'priority',
      headerName: 'Priority',
      width: 150,
      valueGetter: getPriority,
      headerAlign: "center",
      align: "center",
    },
    {
      headerName: "Action",
      headerAlign: "center",
      align: "center",
      width: 150,
      sortable: false,
      renderCell: (cellValues) => {
        return (
          <>
            <Link to={`/asset/view?assetId=${cellValues.row.assetId}`}>
              <ListItemButton>
                <ListItemIcon>
                  <CheckBoxIcon />
                </ListItemIcon>
              </ListItemButton>
            </Link>
            <ListItemButton onClick={() => {
              // handleDialogOpen({ id: cellValues.row.assetId });
            }}>
              <ListItemIcon>
                <EditIcon />
              </ListItemIcon>
            </ListItemButton>
          </>
        );
      },
    },
  ];

  document.title = "All Change Request " + "- PiXELL-River";

  return (
    <>
      {loading ? (
        <div className="spinner">
          <span>Loading. . .</span>
          <div className="half-spinner"></div>
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
            columns={columns}
            pageSize={13}
            rowsPerPageOptions={[13]}
            disableSelectionOnClick
            initialState={{
              sorting: {
                sortModel: [
                  {
                    field: "assetId",
                    sort: "asc",
                  },
                ],
              },
            }}
          />
        </Box>
      )}
    </>
  );
}

export default RequestDataGrid;