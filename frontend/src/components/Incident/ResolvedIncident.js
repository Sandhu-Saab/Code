import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import FunctionDataGrid from "../../Functions/FunctionDatagrid";
import { incidentadminColumns, incidentstudentColumns } from "../../lib/incidentColumns";

/**
 * Default Export function for the IncidentDataGrid listing all the incident tickets
 */
function ResolvedIncidentDataGrid() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(3);
  const [open, setOpen] = useState(true);

  const token = sessionStorage.getItem("access");

  let currentUserId = sessionStorage.getItem("userId");
  let currentUserRole = sessionStorage.getItem("roleId");
  let currentUserSection = sessionStorage.getItem("section");

  /**
   * Fetch all the incidents from the database and set the state incidents
   */
  function getIncidents() {
    axios({
      method: "GET",
      url: "/api/incident/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const data = response.data;
        setIncidents(data.filter((data) => data.status === "Resolved"));
        setLoading(false);
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
   * Fetch all the user and store in an array state called Users
   */
  function column() {
    if (Number.parseInt(currentUserRole) === 4) {
      return incidentstudentColumns;
    } else {
      return incidentadminColumns;
    }
  }
  useEffect(() => {
    getIncidents();
  }, []);

  useEffect(() => {
    if (open) {
      counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }
  }, [counter, open]);

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
          <h1>No Rows Found</h1>
        )}
      </div>
    ) : (
        <Box
          sx={{
            height: 800,
            width: "100%",
            "& .Critical": {
              backgroundColor: "#ffb3ba",
              color: "#000",
            },
            "& .High": {
              backgroundColor: "#ffdfba",
              color: "#000",
            },
            "& .Medium": {
              backgroundColor: "#ffffba",
              color: "#000",
            },
            "& .Low": {
              backgroundColor: "#baffc9",
              color: "#000",
            },
          }}
        >
          <FunctionDataGrid rows={incidents} columns={column()}/>
        </Box>
      )}
    </>
  );
}

export default ResolvedIncidentDataGrid;
