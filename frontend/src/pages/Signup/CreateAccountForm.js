import { React, useState, useEffect } from "react";

import {
  TextField,
  Button,
  Paper,
  Box,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  AlertTitle, 
  Select,
} from "@mui/material";

import axios from "axios";
import Link from '@mui/material/Link';
import { useNavigate } from "react-router-dom";
import logo_small from "../../assets/logo_small.png";

//The main code
function CreateAccountForm() {
  //Variables
  let passwordRequirements = "https://www.rrc.ca/its/help-resources/information-technology-policies/password-policy/";
  const [dialogState, setDialogState] = useState(false);

  const [errorPasswordStrength, setErrorPasswordStrength] = useState("");
  const [passwordErrorState, setPasswordErrorState] = useState(false);
  const [errorPassMessage, setErrorPassMessage] = useState("");
  const [errorRepeatMessage, setErrorRepeatMessage] = useState("");

  const [emailErrorState, setEmailErrorState] = useState(false);
  const [errorEmailMessage, setErrorEmailMessage] = useState("");

  const [usernameErrorState, setUsernameErrorState] = useState(false);
  const [errorUsernameMessage, setErrorUsernameMessage] = useState(false);

  const [sections, setNewSections] = useState(null);
  const [tempUsers, setTempUsers] = useState(null);

  const currentDate = new Date();
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    username: "",
    password: "",
    repeat: "",
    email: "",
    section: "",
    role: "",
  });


  useEffect(() => {
    getUsers();
    getSection();
  }, []);

  //Functions

  function getUsers() {
    axios({
      method: "GET",
      url: "/api/users/",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        const data = response.data;
        setTempUsers(data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  function getSection() {
    axios({
      method: "GET",
      url: "/api/courses/",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        const data = response.data;
        setNewSections(data);
        console.log(sections[0].id)
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  //A variable for navigation
  let Navigate = useNavigate();

  function returnToLogin(){
    Navigate("../login");
  }

  // Creates the user.
  function sendAccountRequest(event) {
    axios({
      method: "POST",
      url: "/api/users/",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        first_name: user.fname,
        last_name: user.lname,
        username: user.username,
        password: user.password,
        email: user.email,
        course_id: user.course_id,
        role: 4, //Should later change this to default to whatever ID is for the student role.
        date_joined: new Date(currentDate.toISOString()),
        is_active: false,
      },
    })
      .then((response) => {
        console.log(response);
        setDialogState(true);
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

  function validateUsername() {
    setUsernameErrorState(false);
    setErrorUsernameMessage("");

    tempUsers.forEach(tempUser => {
      if (tempUser.username === user.username) {
        setUsernameErrorState(true);
        setErrorUsernameMessage("That username is already taken.");
      }
    });
  }

  function validatePassword(){
    let validPassword = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,}$/);

    setPasswordErrorState(false);
    setErrorPassMessage("");
    setErrorRepeatMessage("");
    setErrorPasswordStrength("");

    // If the two passwords don't match
    if(user.password !== user.repeat) {
      setPasswordErrorState(true);
      setErrorRepeatMessage("The two passwords do not match.");
    }

    //If the passwords aren't of the proper regex
    if(!validPassword.test(user.password)) {
      setPasswordErrorState(true);
      setErrorPassMessage("Your current password is not strong enough.");
      setErrorPasswordStrength("Password must contain upper/lower case letters, numeric digits, non-alphanumeric symbols and be a minimum of 8 characters! Please try again.")
    }
  }

  function validateEmail(){
    let validEmail = new RegExp(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    );

    setEmailErrorState(false);
    setErrorEmailMessage("");

    if(!validEmail.test(user.email)){
      setEmailErrorState(true);
      setErrorEmailMessage("This is not a valid email.");
    }

    tempUsers.forEach(tempUser => {
      if (tempUser.email === user.email) {
        setEmailErrorState(true);
        setErrorEmailMessage("This email is already taken.");
      }
    });
  }

  /**
   * Name: handleChange
   * Need to figure exactly how to reproduce the prevUser variable for other files.
   * Oh, you just need make it almost exactly the same, jus replace preUser with anything you need it to be.
   * @param {*} event [The instance that triggers this function]
   */
  function handleChange(event) {
    const { value, name } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  }

  /*
   * Function that handles the submission of the form.
   */
  function handleSubmit(event){
    event.preventDefault();
    let isError = false;

    if(usernameErrorState) isError = true;
    if(passwordErrorState) isError = true;
    if(emailErrorState) isError = true;

    //If all checks have passed
    if(!isError) sendAccountRequest();
  }

//The page or rather the actual contents of the page
return (
  <>
    <Paper elevation={10}>
      <form onSubmit={handleSubmit}>
        <Box pt={5} justifyContent="flex" textAlign="center">
          <img alt="logo" src={logo_small} sx={{ width: 100, height: 100 }} />
        </Box>

        <Box textAlign="center">
          <h2>Create your Account</h2>
        </Box>

        <Box
          sx={{
            mx: 'auto',
            width: "35vw",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={1} />
            
            <Grid item xs={4}>
              <TextField
                autoFocus
                fullWidth
                required
                name="fname"
                id="outlined-fname"
                label="First Name"
                variant="outlined"
                margin="normal"
                type="text"
                onChange={handleChange}
              />

              <TextField
                fullWidth
                required
                name="username"
                id="outlined-username-input"
                label="Username"
                variant="outlined"
                margin="normal"
                autoComplete="username"
                type="text"
                error={usernameErrorState}
                helperText={errorUsernameMessage}
                onChange={handleChange}
                onBlur={validateUsername}
              />

              <TextField
                fullWidth
                required
                name="password"
                id="outlined-title-input"
                label="Password"
                variant="outlined"
                type="password"
                autoComplete="new-password"
                margin="normal"
                error={passwordErrorState}
                helperText={errorPassMessage}
                onChange={handleChange}
                onBlur={validatePassword}
              />

              <Link
                pl={2}
                href={passwordRequirements}
                underline="hover"
                target="_blank"
              >
                <i>RRC Password Requirements*</i>
              </Link>
            </Grid>

            <Grid item xs={2} />

            <Grid item xs={4}>
              <TextField
                required
                fullWidth
                name="lname"
                id="outlined-lname"
                label="Last Name"
                variant="outlined"
                margin="normal"
                onChange={handleChange}
              />

              <TextField
                fullWidth
                required
                name="email"
                id="outlined-email-input"
                label="Email"
                variant="outlined"
                type="email"
                autoComplete="email"
                margin="normal"
                error={emailErrorState}
                helperText={errorEmailMessage}
                onChange={handleChange}
                onBlur={validateEmail}
              />

              <TextField
                fullWidth
                required
                name="repeat"
                id="outlined-password-input"
                label="Repeat Password"
                variant="outlined"
                type="password"
                autoComplete="password"
                margin="normal"
                error={passwordErrorState}
                helperText={errorRepeatMessage}
                onChange={handleChange}
                onBlur={validatePassword}
              />

              <Box pb={2} />

              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-helper-label">
                  Class Section
                </InputLabel>

                <Select
                  name="course_id"
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  label="Class Section"
                  onChange={handleChange}
                  
                >
                  {sections &&
                    sections.map((course_id) => (
                      <MenuItem value={course_id.id}>
                        {course_id.section}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Box pt={3} textAlign="center">
            <Button
              color="primary"
              variant="contained"
              type="submit"
              style={{ margin: "20px" }}
            >
              Sign Up
            </Button>

            <Button
              color="primary"s
              variant="contained"
              style={{ margin: "20px" }}
              onClick={returnToLogin}
            >
              Cancel
            </Button>
          </Box>

          {errorPasswordStrength ? (
            <Alert severity="error" sx={{ px: 8, py: 2 }}>
              <AlertTitle>Error</AlertTitle>
                <strong>{errorPasswordStrength}</strong>
            </Alert>
          ) : null}
        </Box>
      </form>
    </Paper>

    <Dialog
      open={dialogState}
      onClose={returnToLogin}
    >
      <DialogTitle>Request Sent</DialogTitle>

      <DialogContent>
        <DialogContentText>
          <p>It will take a while for the instructor to process your request and thus they'll contact you when you've been accepted.</p>
          <p>Clicking on okay or the backdrop will send you back to the login menu.</p>
        </DialogContentText>

        <DialogActions>
          <Button onClick={returnToLogin} autofocus>
            Okay
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  </>
)

}

export default CreateAccountForm;