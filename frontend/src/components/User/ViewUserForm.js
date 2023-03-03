import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Paper, Grid, Avatar, TextField, Button, FormControl, InputLabel, Select, MenuItem} from "@mui/material";

/**
 * Displays the view user form page of the specified user.
 *
 * @param {Selected user object and the fetched roles data.} param0
 * @returns The view user form of the specified user.
 */
function ViewUserForm({ user, userId, roles, sections, groups }) {
  let navigate = useNavigate();

  const [rolesList] = useState(roles);
  const [sectionsList] = useState(sections);

  const currentUserId = sessionStorage.getItem("userId");
  const currentUserRole = sessionStorage.getItem("roleId");
  
  document.title = `View User #${currentUserId} - PiXELL-River`;

  /**
   * Redirects user back to the user list.
   */
  const routeChangeBack = () => {
    let path = "/user/all";

    if (currentUserRole === "3" || currentUserRole === "4" || currentUserRole === "2") {
      path = "/user/class-all";
    }

    navigate(path);
  };

  /**
   * Redirects user to the edit page.
   */
  const routeChangeEdit = () => {
    let path = "/user/edit?userId=" + userId;
    // let path = "/user/all";
    navigate(path);
  };

  /**
   * Fetches the values of the roles from the API.
   *
   * @param {Role id of the user object} userRole
   * @returns The string value of the role id.
   */
  function getRole(userRole) {
    let value;

    // Loops through the roles to find exact value
    rolesList.forEach((role) => {
      if (role.roleId === Number.parseInt(userRole)) {
        value = role.name;
      }
    });

    return value;
  }

  /**
   * Fetches the values of the sections from the API.
   *
   * @param {Section id of the user object} userSection
   * @returns The string value of the section id.
   */
  function getSection(userSection) {
    let sectionValue = "";

    sections.forEach((section) => {
      if (userSection === section.id) {
        sectionValue = section.section;
      }

      if (userSection === null) {
        sectionValue = "N/A";
      }
    });

    return sectionValue;
  }

  /**
   * Fetches the values of the groups from the API.
   *
   * @param {Role id of the user object} userGroup
   * @returns The string value of the role id.
   */
   function getSecurityGroup(userGroup) {
    let value;
    // Loops through the roles to find exact value
    groups.forEach((group) => {
        for(let i=0; i < userGroup.length; i++)
          if (group.securityGroupId === userGroup[i]) {
            value = group.name;
          } 
    });

    return value;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={2} />

      <Grid item xs={8}>
        <Box pb={10} />

        <Paper elevation={10}>
          <form>
            <Box pt={5} display="flex" justifyContent="center">
              <Avatar src="../src/assets/logo.png"></Avatar>
            </Box>

            <Box textAlign="center">
              <h3>View User</h3>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={1} />

              <Grid item xs={4}>
                <TextField
                  fullWidth
                  required
                  name="first_name"
                  id="outlined-fname"
                  label="First Name"
                  variant="filled"
                  margin="normal"
                  type="text"
                  value={String(user.fname)}
                  InputProps={{
                    readOnly: true,
                  }}
                />

                <TextField
                  fullWidth
                  required
                  name="username"
                  id="outlined-fname"
                  label="Username"
                  variant="filled"
                  margin="normal"
                  type="text"
                  value={String(user.username)}
                  InputProps={{
                    readOnly: true,
                  }}
                />

                <TextField
                  fullWidth
                  required
                  name="role"
                  id="outlined-fname"
                  label="Role"
                  variant="filled"
                  margin="normal"
                  type="text"
                  value={String(getRole(user.role))}
                  InputProps={{
                    readOnly: true,
                  }}
                />

                <TextField
                  fullWidth
                  required
                  name="securityGroup"
                  id="securityGroup"
                  label="Security Group"
                  multiline
                  rows={4}
                  variant="filled"
                  margin="normal"
                  type="text"
                  value={getSecurityGroup(user.security_group)}
                  InputProps={{
                    readOnly: true,
                  }}
                  />
                  {/* <Box pt={2} textAlign="left">
                    <FormControl fullWidth>
                      <InputLabel>Section *</InputLabel>
                      <Select
                        name="security_group"
                        label="security_group"
                        // onChange={setCurrentUserSection}
                        id="security_group"
                        labelId="demo-simple-select-helper-label"
                      >
                        {userTest && userTest.map((user) => (
                          <MenuItem value={user.id}>
                            {user.security_group}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>  */}
                  
              </Grid>

              <Grid item xs={2} />

              <Grid item xs={4}>
                <TextField
                  fullWidth
                  required
                  name="last_name"
                  id="outlined-fname"
                  label="Last Name"
                  variant="filled"
                  margin="normal"
                  type="text"
                  value={String(user.lname)}
                  InputProps={{
                    readOnly: true,
                  }}
                />

                <TextField
                  fullWidth
                  required
                  name="email"
                  id="outlined-fname"
                  label="Email"
                  variant="filled"
                  margin="normal"
                  type="text"
                  value={String(user.email)}
                  InputProps={{
                    readOnly: true,
                  }}
                />

                <TextField
                  fullWidth
                  required
                  name="section"
                  id="outlined-fname"
                  label="Section"
                  variant="filled"
                  margin="normal"
                  type="text"
                  value={String(getSection(user.section))}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            </Grid>

            <Box pt={5} textAlign="center">

              {/* <Button
                type="button"
                color="primary"
                variant="contained"
                onClick={routeChangeEdit}
              >
                Edit
              </Button> */}
        

              {/* Students are able to edit their OWN ACCOUNT */}
              {user.id === currentUserId && currentUserRole === "4" && (
                <Button
                  type="button"
                  color="primary"
                  variant="contained"
                  onClick={routeChangeEdit}
                >
                  Edit
                </Button>
              )}

              <Button
                type="button"
                color="primary"
                variant="contained"
                style={{ margin: "20px" }}
                onClick={routeChangeBack}
              >
                Back
              </Button>
            </Box>
          </form>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default ViewUserForm;
