import React, { useEffect, useState } from "react";
import {
  Link,
  List,
  ListSubheader,
  ListItemButton,
  ListItemText,
  Collapse,
  Grid,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import { Box } from "@mui/system";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { getDateFormat} from "../../../lib/problemColumns";
/**
 * Dependencies dropdown form component for checking the incident dependencies
 * Parent component: CreateProblem
 */
const DeleteDependencies = (props) => {
  const [open, setOpen] = useState(false);
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = sessionStorage.getItem("access");
  const [problemData, setProblemData] = useState([props.problems.problemId]);
  const query = new URLSearchParams(useLocation().search);
  const problemId = query.get("problemId");
  const [counter, setCounter] = useState(5);
  const [users, setUsers] = useState(props.users);
  const [incidentId, setIncidentId] = useState();

  const getProblems = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(
        `/api/problemsRelatedRetrieve/?problemsRelated=${problemId}`,
        {
          headers,
        }
      );
      const data = await response.data;
      setIncidents(data);
    } catch (error) {
      if (error.response) {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    }
  };

  useEffect(() => {
    removeRelatedIncidents();
    getProblems();
    setIncidentId();
  },[incidentId])

  useEffect(() => {
    getProblems();
  }, []);

  useEffect(() => {
    if (incidents.length) {
      setLoading(false);
    }
  });

  useEffect(() => {
    if (open) {
      counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }
  }, [counter, open]);

  const handleCollapse = () => {
    setOpen(!open);
  };

  function getTicketNumber(params) {
    return `INC` + String(params.row.ticketNumber).padStart(6, "0");
  }
  const removeRelatedIncidents = async() => {
      try{
          const response = await axios({
              method: "PATCH",
              url: `/api/incidentData/${incidentId}/`,
               headers:{
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
          },
          data: {
              problemsRelated: null
          }
          });
      } catch (error){
          if (error.response){
              console.log(error.response);
          }
      }
  }
  const adminColumns = [
    {
        field: "ticketNumber",
        headerName: "Incident Number",
        width: 200,
        valueGetter: getTicketNumber,
      },
      {
        field: "ticketOwnerId",
        headerName: "Created By",
        width: 200,
      },
      {
        field: "userId",
        headerName: "User",
        width: 140,
      },
      {
        field: "status",
        headerName: "Status",
        width: 180,
      },
      {
        field: "priority",
        headerName: "Priority",
        width: 130,
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
      {
        field: "Remove",
        width: 90,
        headerAlign: "center",
        align: "center",
        renderCell: (cellValues) => {
          return (
            <Link 
            onClick={() => {
              setIncidentId(cellValues.row.id)
            }}>
              <ListItemButton>
                  <DeleteIcon />    
              </ListItemButton>
            </Link>
          );
        },
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
        <ListItemText primary="Remove Related Incidents" />
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
            height: 400,
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
        <div style={{height:350, width:"100%"}}>
          <DataGrid
            rows={incidents}
            getRowId={(incidents) => incidents.id}
            columns={adminColumns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
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
};

export default DeleteDependencies;
