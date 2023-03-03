import React, { useEffect, useState } from "react";
import {
  List,
  ListSubheader,
  ListItemButton,
  ListItemText,
  Collapse,
  Grid,
} from "@mui/material";
import moment from "moment";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { getDateFormat } from "../../../lib/problemColumns";

/**
 * Dependencies dropdown form component for checking the incident dependencies
 * Parent component: CreateProblem
 */
function EditDependencies(props) {
  const [open, setOpen] = useState(false);
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const token = sessionStorage.getItem("access");
  const [selectedId, setSelectedId] = useState();
  let currentUserId = sessionStorage.getItem("userId");
  let currentUserRole = sessionStorage.getItem("roleId");
  let currentUserSection = sessionStorage.getItem("section");
  const [counter, setCounter] = useState(3);
  const [problemData, setProblemData] = useState([props.problem.problemId])
  const [incidentArray, setIncidentArray] = useState([]);

  useEffect(() => {
    getIncidents();
    getUsers();
  }, []);

  // useEffect(() => {
  //   if(props.problems !== null){
  //     getProblems();
  //   }
  // }, []);

  useEffect(() => {
    if (incidents.length) {
      setLoading(false);
    }
  });

  const handleCollapse = () => {
    setOpen(!open);
    // if(props.problems !== null){
    //   getProblems();
    // }
  };

  function getTicketNumber(params) {
    return `INC` + String(params.row.ticketNumber).padStart(6, "0");
  }
  
  useEffect(() => {
    if (open) {
      counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }
  }, [counter, open]);

  /**
   * Fetch all the user and store in an array state called Users
   */
  function getUsers() {
    axios({
      method: "GET",
      url: `/api/users/?is_active=true`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const data = response.data;
        setUsers(data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  /**
   *  Fetch all incidents from the database and store it on incidents state
   */
  function getIncidents() {
    axios({
      method: "GET",
      url: "/api/problemsRelated/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const data = response.data;
        setIncidents(data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  // const getProblems = async () => {
  //   try {
  //     const headers = {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     };
  //     const response = await axios.get(
  //       `/api/problemsRelatedRetrieve/?problemsRelated=${problemData}`,
  //       {
  //         headers,
  //       }
  //     );
  //     const data = await response.data;
  //     setIncidentArray(data)
  //   } catch (error) {
  //     if (error.response) {
  //       console.log(error.response);
  //       console.log(error.response.status);
  //       console.log(error.response.headers);
  //     }
  //   }
  // };
  // **************Value Getter ******************

  const columns = [
    {
      field: "incidentId",
      headerName: "Incident Number",
      width: 150,
      style: { overflow: "wrap" },
      valueGetter: getTicketNumber,
    },
    {
      field: "userId",
      headerName: "User",
      width: 100,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
    },
    {
      field: "priority",
      headerName: "Priority",
      width: 100,
    },
    { field: "subject", headerName: "Subject", width: 200 },
    {
      field: "assignedTechId",
      headerName: "Assigned Technician",
      width: 200,
    },
    {
      field: "reportDateTime",
      headerName: "Report Date Time",
      width: 250,
      valueGetter: getDateFormat,
    },
  ];

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 1200,
        color: "black",
        bgcolor: "lightgray",
        borderRadius: 2,
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader
          component="div"
          id="nested-list-subheader"
        ></ListSubheader>
      }
    >
      <ListItemButton onClick={handleCollapse}>
        <ListItemText primary="Add Related Incidents" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box
          p={4}
          component="div"
          disablePadding
          sx={{
            color: "black",
            bgcolor: "#ffebee",
            border: 0,
            borderColor: "primary.main",
          }}
        >
      {loading ? (
        <div className="spinner">
          {counter !== 0 ? (
            <>
              <span>Loading. . .</span>
              <div className="half-spinner"></div>
            </>
          ) : (
            <h1>No Rows Found</h1>
          )}
        </div>
      ) : (
            <Grid container spacing={2}>
              <Grid item xs={1} />
              <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                  rows={incidents}
                  getRowId={(incidents) => incidents.id}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  checkboxSelection
                  disableSelectionOnClick
                  selectionModel={selectedId}
                  onSelectionModelChange={(id) => {
                    const selectedIDs = new Set(id);
                    setSelectedId(id);
                    props.onDependenciesChange(id);
                  }}
                  getCellClassName={(params) => {
                    if (params.field === "priority") {
                      switch (params.row.priority) {
                        case 1:
                          return "Critical";
                        case 2:
                          return "High";
                        case 3:
                          return "Medium";
                        case 4:
                          return "Low";

                        default:
                          return null;
                      }
                    }
                  }}
                  initialState={{
                    sorting: {
                      sortModel: [
                        {
                          field: "incidentId",
                          sort: "desc",
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
  );
}

export default EditDependencies;
