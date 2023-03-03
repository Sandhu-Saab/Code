import axios from "axios";
import React, { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";

function IncidentViewGroups(props) {
  let token = sessionStorage.getItem("access");
  const [group, setGroup] = useState([]);

  /**
   * Fetches the groups and stores in a useState to display in datagrid.
   */
  function getGroups() {
    if (
      props.secGroup === null ||
      props.secGroup === undefined ||
      window.location.pathname === "/incident/edit"
    ) {
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
          setGroup(data);
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
        });
    } else {
      axios({
        method: "GET",
        url: `/api/securitygroups/${props.secGroup}/`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          const data = response.data;
          setGroup(data);
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
        });
    }
  }

  useEffect(() => {
    getGroups();
  }, []);

  function output() {
    if (window.location.pathname === "/incident/edit") {
      return (
        <Autocomplete
          defaultValue={group.find(
            (item) => item.securityGroupId === props.secGroup
          )}
          id="grouped-userList"
          options={group}
          groupBy={(option) => option.securityGroupId}
          getOptionLabel={(option) => `${option.name}`}
          getOptionSelected={(option, value) => option.value === value.value}
          noOptionsText={"No Results Found"}
          renderInput={(params) => (
            <TextField required {...params} label="Security Groups" />
          )}
          onChange={(event, newValue) => {
            props.onGroupChange(newValue.securityGroupId);
          }}
        />
      );
    }

    if (props.secGroup === null || props.secGroup === undefined) {
      return (
        <Autocomplete
          id="grouped-userList"
          options={group}
          getOptionLabel={(option) => `${option.name}`}
          getOptionSelected={(option, value) => option.value === value.value}
          noOptionsText={"No Results Found"}
          renderInput={(params) => (
            <TextField required {...params} label="Security Groups" />
          )}
          onChange={(event, newValue) => {
            props.onGroupChange(newValue.securityGroupId);
          }}
        />
      );
    } else {
      return (
        <TextField
          id="securityGroup"
          label="Security Group"
          variant="filled"
          fullWidth
          value={String(group.name)}
          name="securityGroup"
          inputProps={{ readOnly: true }}
        />
      );
    }
  }

  return output();
}

export default IncidentViewGroups;
