import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import FunctionDataGrid from "../../Functions/FunctionDatagrid";
import { adminColumns, studentColumns } from "../../lib/problemColumns";
/**
 * Default Export function for the ProblemDataGrid listing all the problem tickets
 */
function ProblemDataGrid() {
  const [open, setOpen] = useState(true);
  const [problems, setProblems] = useState();
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(3);

  const token = sessionStorage.getItem("access");

  document.title = "All Problem Tickets " + "- PiXELL-River";

  let currentUserRole = sessionStorage.getItem("roleId");

  /**
   * Fetch all the problems from the database and set the state problems
   */
  function getProblems() {
    axios({
      method: "GET",
      url: "/api/problem/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const data = response.data;
        setProblems(data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  function column() {
    if (Number.parseInt(currentUserRole) === 4) {
      return studentColumns;
    } else {
      return adminColumns;
    }
  }

  useEffect(() => {
    getProblems();
  }, []);

  useEffect(() => {
    if (problems) {
      setLoading(false);
    }
  });

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
          <FunctionDataGrid
            rows={problems}
            columns={column()}
          />
        </Box>
      )}
    </>
  );
}

export default ProblemDataGrid;
