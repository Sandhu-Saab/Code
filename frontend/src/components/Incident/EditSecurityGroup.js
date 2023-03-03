import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { TextField, Box, Button, Paper } from "@mui/material";

function EditSecurityGroup() {
  const query = new URLSearchParams(useLocation().search);
  const securityGroupId = query.get("securityGroupId");
  let token = sessionStorage.getItem("access");
  const [group, setGroup] = useState([]);
  const [newGroup, setNewGroup] = useState([]);
  const [loading, setLoading] = useState(true);

  /**
   * Fetches the groups and stores in a useState to display in datagrid.
   */
  function getGroups() {
    axios({
      method: "GET",
      url: `/api/securitygroups/${securityGroupId}/`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const data = response.data;
        setGroup(data);
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

  function updateGroup(event) {
    axios({
      method: "PATCH",
      url: `/api/securitygroups/${securityGroupId}/`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        name: String(newGroup.secGroup),
      },
    }).then((response) => {
      window.location.href = "/incident/securitygroup/new";
    });
    event.preventDefault();
  }

  useEffect(() => {
    getGroups();
  }, [group.length]);

  /**
   * Handle onChange for subject and details field
   */
  function handleChangeField(event) {
    const { name, value } = event.target;
    setNewGroup((prevTicket) => ({
      ...prevTicket,
      [name]: value,
    }));
  }

  return (
    <>
      {loading ? (
        <div className="spinner">
          <span>Loading. . .</span>
          <div className="half-spinner"></div>
        </div>
      ) : (
        <Paper
          elevation={10}
          sx={{
            mt: "10vh",
            mx: "auto",
            textAlign: "center",
            px: 8,
            py: 3,
            width: "50%",
          }}
        >
          <Box>
            <h2>Edit Security Group</h2>
          </Box>

          <Box
            sx={{
              height: "100%",
              width: "100%",
            }}
          >
            <TextField
              required
              id="secGroup"
              label="Security Group"
              variant="filled"
              fullWidth
              defaultValue={String(group.name)}
              name="secGroup"
              onChange={handleChangeField}
            />
          </Box>

          <Box sx={{ mt: 3 }}>
            <Button
              type="button"
              color="primary"
              variant="contained"
              onClick={updateGroup}
            >
              Update
            </Button>
          </Box>

          <Box
            sx={{
              mt: "5vh",
              height: "100%",
              width: "100%",
            }}
          ></Box>
        </Paper>
      )}
    </>
  );
}

export default EditSecurityGroup;
