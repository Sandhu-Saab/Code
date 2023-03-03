import axios from "axios";
import { useState } from "react";
import { Box, Paper, TextField, Button } from "@mui/material";
import ViewSecurityGroup from "./ViewSecurityGroup";

function CreateSecurityGroup() {
  let token = sessionStorage.getItem("access");
  const [group, setGroup] = useState();

  /**
   * Handles change event when security group field are change
   */
  function handleChangeField(event) {
    setGroup(event.target.value);
  }

  /**
   * Creates a new security group to the database.
   */
  function CreateGroup() {
    axios({
      method: "POST",
      url: "/api/securitygroups/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        name: group,
      },
    })
      .then((response) => {
        window.location.href = "/incident/securitygroup/new";
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <>
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
          <h2>New Security Group</h2>
        </Box>

        <Box
          sx={{
            height: "100%",
            width: "100%",
          }}
        >
          <TextField
            required
            fullWidth
            type="text"
            name="secGroup"
            margin="normal"
            label="Security Group"
            variant="outlined"
            id="secGroup"
            onChange={handleChangeField}
          />
        </Box>

        <Box sx={{ mt: 3 }}>
          <Button
            type="button"
            color="primary"
            variant="contained"
            onClick={CreateGroup}
          >
            Create
          </Button>
        </Box>

        <Box
          sx={{
            mt: "5vh",
            height: "100%",
            width: "100%",
          }}
        >
          <ViewSecurityGroup />
        </Box>
      </Paper>
    </>
  );
}

export default CreateSecurityGroup;
