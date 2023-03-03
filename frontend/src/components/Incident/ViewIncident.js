import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  Grid,
} from "@mui/material";
import axios from "axios";
import "../../layouts/preloader3.css";

import ViewIncidentForm from "./ViewIncidentForm";

/**
 * Default Export function for viewing incident ticket
 * Child components: IncidentComments
 */
function ViewIncident() {
  const query = new URLSearchParams(useLocation().search);
  const incidentId = query.get("incidentId");
  const [loading, setLoading] = useState(true);
  const [incidentData, setIncidentData] = useState([]);
  const [userList, setUserList] = useState([]);
  const [securityGroup, setSecurityGroup] = useState([]);

  const [technicianList, setTechnicianList] = useState([]);
  const [ticketTypeList, setTicketTypeList] = useState([]);
  const [ticketNumber, setTicketNumber] = useState([]);
  const [statList, setStatList] = useState([]);
  const [status, setStatus] = useState([]);
  const currentUserRole = sessionStorage.getItem("roleId");
  const token = sessionStorage.getItem("access");
  const ticketNum = "INC" + ticketNumber.toString().padStart(6, "0");
  /**
   * Fetch the data of the specified incidentId from the database
   */
  const getIncidentData = async() => {
    try {
        const response = await axios({
            method: "GET",
            url: `/api/singleIncident/?incidentId=${incidentId}`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await response.data;
        // console.log(data, "ViewIncident.js");
        setIncidentData(data);
        setTicketNumber(data.ticketNumber);
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
   *  Fetch all users from the api_user table and store it on userList state
   */
  function getUsers() {
    axios({
      method: "GET",
      url: "/api/userFast/",
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
  }

  /**
   *  Fetch all users with the role technician (1) from the database and store it on technicianList state
   */
  function getTechnicians() {
    axios({
      method: "GET",
      url: "/api/getTechnician/?role_id=2",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const data = response.data;
        setTechnicianList(data);
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
   * Fetch all the ticketTypes from the database
   */
  function getTicketTypes() {
    axios({
      method: "GET",
      url: "/api/tickettype/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const data = response.data;
        setTicketTypeList(data);
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
   * Fetches the groups and stores in a useState.
   */
  function getSecurityGroups() {
    axios({
      method: "GET",
      url: `/api/securitygroups/`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const data = response.data;
        setSecurityGroup(data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  const getStatus = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `/api/incidentStatus/`,
        headers: {
          "Content-Type": "application/json",
          Authorization : `Bearer ${token}`,
        },
      });
      const data = await response.data;
      setStatList(data)
    } catch(error){
      if (error.response){
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    }
  }

  function getStatusList(){
    setStatus([])
    statList.map((e) =>{
      setStatus(current => [...current, e.status_name])
    })
  }

  useEffect(() => {
    getTechnicians();
    getIncidentData();
    getUsers();
    getTicketTypes();
    getSecurityGroups();
    getStatus();
  }, []);

  useEffect(() => {
    getStatusList();
  }, [loading])

  document.title = "Incident Ticket #" + ticketNumber + " - PiXELL-River";

  return (
    <div>
      {loading ? (
        <div className="spinner">
          <span>Loading. . .</span>
          <div className="half-spinner"></div>
        </div>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={2} />

          <Grid item xs={8}>
            <Paper elevation={10}>
              <Box p={4}>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  color="#525252"
                  align="center"
                  pb={5}
                >
                  Incident
                </Typography>

                <ViewIncidentForm
                  id={ticketNum}
                  incidentData={incidentData}
                  userList={userList}
                  technicianList={technicianList}
                  ticketTypeList={ticketTypeList}
                  securityGroupList={securityGroup}
                  statusList = {status}
                />
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={2} />
        </Grid>
      )}
    </div>
  );
}

export default ViewIncident;
