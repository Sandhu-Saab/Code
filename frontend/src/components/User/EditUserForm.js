import axios from "axios";
import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import {
  Alert,
  AlertTitle,
  Box,
  Paper,
  Grid,
  Avatar,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,

} from "@mui/material";
import { isEmpty } from "../../Functions/FormValidator";

/**
 * Displays the edit user form page of the specified user.
 *
 * @param {Selected user object and the fetched roles and sections data.} param0
 * @returns The edit user form of the specified user.
 */
function EditUserForm({ user, userId, roles, sections, secGroup }) {
  let navigate = useNavigate();

  const [currentUser, setUser] = useState({
    fname: user.first_name,
    lname: user.last_name,
    username: user.username,
    password: "",
    repeatPass: "",
    email: user.email,
  });

  const [incidentGroup, setIncidentGroup] = useState();
  const [currentUserRoleId, setCurrentUserRole] = useState(user.role);
  const [currentUserSection, setCurrentUserSection] = useState(user.section);
  const [rolesList] = useState(roles);
  const [sectionList] = useState(sections);

  const currentUserId = sessionStorage.getItem("userId");
  const currentUserRole = sessionStorage.getItem("roleId");

  const [errorUserMessage, setErrorUserMessage] = useState("");
  const [errorPassMessage, setErrorPassMessage] = useState("");
  const [errorFNameMessage, setErrorFNameMessage] = useState("");
  const [errorLNameMessage, setErrorLNameMessage] = useState("");
  const [errorUNameMessage, setErrorUNameMessage] = useState("");
  const [errorEmailMessage, setErrorEmailMessage] = useState("");
  const [errorSectionMessage, setErrorSectionMessage] = useState("");
  const [errorRoleMessage, setErrorRoleMessage] = useState("");

  document.title = `Edit User #${currentUserId} - PiXELL-River`;

  let token = sessionStorage.getItem("access");


  /**
   * Redirects user back to the user list.
   */
  const routeChangeBack = () => {
    let path = "/user/all";

    if (currentUserRole === "3" || currentUserRole === "4" || currentUserRole == "2") {
      setIncidentGroup(null)
      path = "/user/class-all";
    }

    navigate(path);
  };

  /**
   * Handles the changes of the input fields.
   *
   * @param {*} event
   */
  function handleChange(event) {
    const { value, name } = event.target;
    setUser((prevUser) => ({
      // setEditUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  }
  
  const handleGroup = (event) => {
    setIncidentGroup(event.target.value);
  };


  /**
   * Validates the form for all input fields.
   */
  function validateInfo(e) {
    hideAllErrors();

    if (!isValidate()) {
      e.preventDefault();
    } else {
        if(currentUserRole == 4){
          updateStudent();
        }
      updateUser();
    }
  }

  /**
   * Hides all error messages.
   */
  function hideAllErrors() {
    setErrorFNameMessage("");
    setErrorLNameMessage("");
    setErrorUNameMessage("");
    setErrorEmailMessage("");
    setErrorPassMessage("");
    setErrorUserMessage("");
    setErrorSectionMessage("");
    setErrorRoleMessage("");
  }

  /**
   * Validates all input fields.
   */
  function isValidate() {
    let isUserCorrect = true;

    let currentFName = currentUser.fname;
    let currentLName = currentUser.lname;
    let currentEmail = currentUser.email;
    let currentUName = currentUser.username;
    let currentPassword = currentUser.password;
    let currentRPassword = currentUser.repeatPass;
    let currentSection = currentUserSection;
    let currentRole = currentUserRoleId;

    /**
     * RRC Password Policy Regex:
     * https://www.rrc.ca/its/help-resources/information-technology-policies/password-policy/#:~:text=All%20passwords%20must%20adhere%20to,part%2C%20of%20your%20account%20name.
     * - minimum of 8 characters long
     * - contains upper/lower letters
     * - numeric digits
     * - non-alphanumeric
     */
    let validPassword = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,}$/);

    // https://www.w3resource.com/javascript/form/email-validation.php
    let validEmail = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

    if (currentUserRole !== "4") {
      // If first name is empty
      if (isEmpty(currentFName)) {
        isUserCorrect = false;
        setErrorFNameMessage("First Name is required!");
      }

      // If last name is empty
      if (isEmpty(currentLName)) {
        isUserCorrect = false;
        setErrorLNameMessage("Last Name is required!");
      }

      // If username is empty
      if (isEmpty(currentUName)) {
        isUserCorrect = false;
        setErrorUNameMessage("Username is required!");
      }

      // If email is empty and valid
      if (isEmpty(currentEmail)) {
        isUserCorrect = false;
        setErrorEmailMessage("Email is required!");
      } else if (!validEmail.test(currentEmail)) {
        isUserCorrect = false;
        setErrorEmailMessage("Email is not valid!");
      }

      if (currentUserRole !== "3") {
        // If section is empty - only applies to instructors not admin/tech
        if (
          isNaN(Number.parseInt(currentSection)) &&
          currentUserRole === "3" &&
          Number.parseInt(currentRole) !== 5
        ) {
          isUserCorrect = false;
          setErrorSectionMessage("Section is required!");
        }

        // If role is empty
        if (isNaN(Number.parseInt(currentRole))) {
          isUserCorrect = false;
          setErrorRoleMessage("Role is required!");
        }
      }

      // If repeat new password is empty and new password is not
      if (currentPassword !== "" && isEmpty(currentRPassword)) {
        isUserCorrect = false;
        setErrorPassMessage("Cannot be empty FWEF!");
      }

      // If new password is empty and repeat new password is not
      if (currentRPassword !== "" && isEmpty(currentPassword)) {
        isUserCorrect = false;
        setErrorPassMessage("Cannot be empty!");
      }

      /**
       * Validations for passwords that are present but
       * do not match or meet RRC password policies
       */
      if (currentPassword !== "" && currentRPassword !== "") {
        // New Password does not match new repeated password
        if (currentPassword !== currentRPassword) {
          isUserCorrect = false;
          setErrorPassMessage("Passwords do not match!");
        }

        // New repeated password does not match new password
        if (currentRPassword !== currentPassword) {
          isUserCorrect = false;
          setErrorPassMessage("Passwords do not match!");
        }

        // If password must match RRC Password Policy
        if (
          !validPassword.test(currentPassword) &&
          currentPassword === currentRPassword
        ) {
          isUserCorrect = false;
          if (currentPassword === currentRPassword) {
            setErrorPassMessage("Password is not strong enough!");
          }

          setErrorUserMessage(
            "Password must contain upper/lower case letters, numeric digits, non-alphanumeric symbols and be a minimum of 8 characters! Please try again."
          );
        }
      }
    } else {
      // If new password is empty
      if (currentPassword === "" || currentRPassword === "") {
        isUserCorrect = false;
        setErrorPassMessage("Cannot be empty!");
      }

      if (currentPassword !== "" && currentRPassword !== "") {
        // Passwords don't match
        if (
          currentPassword !== currentRPassword ||
          currentRPassword !== currentPassword
        ) {
          isUserCorrect = false;
          setErrorPassMessage("Passwords do not match!");
        }

        // Check if password matches with RRC Password Policy
        if (!validPassword.test(currentPassword)) {
          isUserCorrect = false;
          if (currentPassword === currentRPassword) {
            setErrorPassMessage("Password is not strong enough!");
          }

          setErrorUserMessage(
            "Password must contain upper/lower case letters, numeric digits, non-alphanumeric symbols and be a minimum of 8 characters! Please try again."
          );
        }
      }
    }

    return isUserCorrect;
  }

  /**
   * Sends a PUT response to update specified user's information/data in the database.
   * 
   * @param {*} event
   */
  function updateUser(event) {
    axios({
      method: "PATCH",
      url: `/api/editSingleUserList/${userId}/`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        first_name: currentUser.fname,
        last_name: currentUser.lname,
        username: currentUser.username,
        email: currentUser.email,
        password: currentUser.password,
        course_id: currentUserSection,
        role: currentUserRoleId,
        security_group: [incidentGroup],
        
      },
    })
    .then(() => {
      let path = "../user/all";
      
      if (currentUserRole === "3" || currentUserRole === "4") {
        path = "/user/class-all";
      }
      
      window.location.href = path;
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    });
    
    event.preventDefault();
  }

  function updateStudent(event) {
    axios({
      method: "PATCH",
      url: `/api/editSingleUserList/${userId}/`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        password: currentUser.password,
      },
    })
    .then(() => {
      let path = "../user/all";
      
      if (currentUserRole === "3" || currentUserRole === "4") {
        path = "/user/class-all";
      }
      
      window.location.href = path;
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    });
    
    event.preventDefault();
  }


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


  function getSection(userSectionId) {
    let value;
    // Loops through the roles to find exact value
    sectionList.forEach((section) => {
      if (section.id === userSectionId) {
        value = section.section;
      }
    });

    return value;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={2} />
      <Grid item xs={8}>
        <Box pb={6} />
        <Paper elevation={10}>
          <form>
            <Box pt={5} display="flex" justifyContent="center">
              <Avatar src="../src/static/images/ogo.png"></Avatar>
            </Box>

            <Box textAlign="center">
              <h3>Edit User</h3>
            </Box>

            {/* Student POV */}
            {currentUserRole === "4" && (
              <Box sx={{ mx: "auto", mt: 5, width: 520 }}>
                <TextField
                  required
                  autoFocus
                  id="pass"
                  fullWidth
                  type="password"
                  margin="normal"
                  name="password"
                  variant="outlined"
                  label="New Password"
                  onChange={handleChange}
                  error={errorPassMessage}
                  autoComplete="new-password"
                  helperText={errorPassMessage}
                />

                <TextField
                  required
                  id="pass"
                  fullWidth
                  type="password"
                  margin="normal"
                  name="repeatPass"
                  variant="outlined"
                  onChange={handleChange}
                  error={errorPassMessage}
                  autoComplete="repeatPass"
                  label="Repeat New Password"
                  helperText={errorPassMessage}
                />
              </Box>
            )}
            {/* Admin/Tech/Instructors */}  
            <Grid container spacing={2}>
              <Grid item xs={1} />

              <Grid item xs={4}>
              {currentUserRole !== "4" && (
                <>
                  <TextField
                    required
                    fullWidth
                    autoFocus
                    name="fname"
                    margin="normal"
                    label="First Name"
                    variant="filled"
                    id="outlined-fname"
                    onChange={handleChange}
                    error={errorFNameMessage}
                    helperText={errorFNameMessage}
                    defaultValue={String(user.first_name)}
                  />

                  <TextField
                    required
                    fullWidth
                    type="text"
                    margin="normal"
                    name="username"
                    label="Username"
                    variant="filled"
                    onChange={handleChange}
                    error={errorUNameMessage}
                    helperText={errorUNameMessage}
                    defaultValue={String(user.username)}
                  />

                  <TextField
                    required
                    id="pass"
                    fullWidth
                    type="password"
                    margin="normal"
                    name="password"
                    variant="filled"
                    label="New Password"
                    onChange={handleChange}
                    error={errorPassMessage}
                    autoComplete="new-password"
                    helperText={errorPassMessage}
                  />

                  <Box pt={2} textAlign="left">
                    <FormControl fullWidth>
                      <InputLabel>Security Group *</InputLabel>
                      <Select
                        required
                        name="security_group"
                        label="SecurityGroup"
                        onChange={handleGroup}
                        id="demo-simple_select-helper"
                        labelId="demo-simple-select-helper-label"
                      >
                        {secGroup && secGroup.map((security_group) => (
                          <MenuItem value={security_group.securityGroupId}>
                            {security_group.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </>
              )}
              </Grid>

              <Grid item xs={2} />
              
              <Grid item xs={4}>
              {currentUserRole !== "4" && (
                  <>
                    <TextField
                      required
                      fullWidth
                      name="lname"
                      margin="normal"
                      label="Last Name"
                      variant="filled"
                      id="outlined-lname"
                      onChange={handleChange}
                      error={errorLNameMessage}
                      helperText={errorLNameMessage}
                      defaultValue={String(user.last_name)}
                    />

                    <TextField
                      required
                      fullWidth
                      name="email"
                      type="email"
                      label="Email"
                      margin="normal"
                      variant="filled"
                      autoComplete="email"
                      onChange={handleChange}
                      error={errorEmailMessage}
                      id="outlined-email-input"
                      helperText={errorEmailMessage}
                      defaultValue={String(user.email)}
                    />

                    <TextField
                      required
                      id="pass"
                      fullWidth
                      type="password"
                      margin="normal"
                      name="repeatPass"
                      variant="filled"
                      onChange={handleChange}
                      error={errorPassMessage}
                      autoComplete="repeatPass"
                      label="Repeat New Password"
                      helperText={errorPassMessage}
                    />
                    <Box pt={2}>
                    <Autocomplete
                      defaultValue={sectionList.find(
                        (item) => item.name === getSection(user.section)
                      )}
                      id="sectionList"
                      options={sectionList}
                      disableClearable
                      getOptionLabel={(option) => `${option.section}`}
                      noOptionsText={"No Results Found"}
                      renderInput={(params) => (
                        <TextField required {...params} label="Section" />
                      )}
                      onChange={(event, newValue) => {
                        setCurrentUserSection(newValue.id);
                      }}
                    />
                    </Box>
                    <Box pt={3}>
                      <Autocomplete
                        defaultValue={rolesList.find(
                          (item) => item.name === getRole(user.role)
                        )}

                        id="rolesList"
                        options={rolesList}
                        disableClearable
                        getOptionLabel={(option) => `${option.name}`}
                        noOptionsText={"No Results Found"}
                        renderInput={(params) => (
                          <TextField required {...params} label="Role" />
                        )}
                        onChange={(event, newValue) => {
                          setCurrentUserRole(newValue.roleId);
                        }}
                      />
                    </Box>
                  </>
                  )}


            
                  
                  {/* <Box pt={2} textAlign="left">
                    <FormControl fullWidth>
                      <InputLabel>Section *</InputLabel>
                      <Select
                        name="sections"
                        label="sectionList"
                        onChange={setCurrentUserSection}
                        id="demo-simple_select-helper"
                        labelId="demo-simple-select-helper-label"
                      >
                        {sections && sections.map((section) => (
                          <MenuItem value={section.id}>
                            {section.section}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>

                
                  <Box pt={2} textAlign="left">
                    <FormControl fullWidth>
                      <InputLabel>Role *</InputLabel>
                      <Select
                        name="roles"
                        label="rolesList"
                        onChange={setCurrentUserRole}
                        id="demo-simple_select-helper"
                        labelId="demo-simple-select-helper-label"
                      >
                        {roles && roles.map((role) => (
                          <MenuItem value={role.id}>
                            {role.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box> */}
              </Grid>
            </Grid>

            <Box pt={5} textAlign="center">
              <Button
                type="button"
                color="primary"
                variant="contained"
                onClick={validateInfo}
              >
                Update
              </Button>

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

          {errorUserMessage ? (
            <Alert severity="error" sx={{ justifyContent: 'center', py: "2vh" }}>
              <AlertTitle>Error</AlertTitle>
              <strong>{errorUserMessage}</strong>
            </Alert>
          ) : null}
        </Paper>
      </Grid>
    </Grid>
  );
}

export default EditUserForm;
