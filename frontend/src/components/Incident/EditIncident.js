import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import EditIncidentData from "./EditIncidentData";
// import getUsers from "./Functions/GetUsers";

function EditIncident() {
  const [incidentData, setIncidentData] = useState();
  const query = new URLSearchParams(useLocation().search);
  const incidentId = query.get("incidentId");
  const token = sessionStorage.getItem("access");
  const [loading, setLoading] = useState(true);
  const [userList, setUserList] = useState([]);
  const [technicianList, setTechnicianList] = useState([]);
  const [ticketTypeList, setTicketTypeList] = useState([]);
  const [group, setGroup] = useState([]);
  const [status, setStatus] = useState([]);

  /**
   * Fetch the data of the specified incidentId from the database
   */
  function getIncidentData() {
    axios({
      method: "GET",
      url: `/api/editIncident/?incidentId=${incidentId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const data = response.data;
        setIncidentData(data);
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
      setStatus(data);
      // console.log(data)
    } catch(error){
      if (error.response){
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    }
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
   * Fetches the values of the groups from the API.
   */
  const getGroups = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `/api/securitygroups/`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.data;
      setGroup(data);
    } catch (error) {
      if (error.response) {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    }
  };

  useEffect(() => {
    getIncidentData();
    getUsers();
    getTechnicians();
    getTicketTypes();
    getGroups();
    getStatus();
  }, []);

  useEffect(() => {
    if (incidentData && userList.length ) {
      setLoading(false);
    }
  });

  document.title = "Incident Ticket #" + incidentId + " - PiXELL-River";

  return (
    <div>
      {loading ? (
        <div className="spinner">
          <span>Loading. . .</span>
          <div className="half-spinner"></div>
        </div>
      ) : (
        <EditIncidentData
          incidents={incidentData}
          userLists={userList}
          technicianLists={technicianList}
          ticketTypeLists={ticketTypeList}
          secGroup={group}
          incStatus={status}
        />
      )}
    </div>
  );
}

export default EditIncident;
