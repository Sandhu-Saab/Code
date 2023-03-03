import { React, useState, useEffect } from "react";
import {
  TextField,
  Button,
  Paper,
  Box,
  Grid,
  CircularProgress,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";


function ForgetPasswordForm() {
  const [loading, setLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [dialogState, setDialogState] = useState(false);
  const [passwordErrorState, setPasswordErrorState] = useState(false);
  const [errorPassMessage, setErrorPassMessage] = useState("");
  const [errorRepeatMessage, setErrorRepeatMessage] = useState("");

  const[passwordInfo, setPasswordInfo] = useState({
    password: "",
    repeat: "",
  });
  
  let Navigate = useNavigate();

  // Get the id from the router url, in this case :hashed_user_id
  const { hashed_user_id } = useParams()

  // this is to decode the hased_user_id from base64 that we set it from the backend 
  // to a regular user id as you know
  // atob() is to decode
  var dehashedUserId = atob(hashed_user_id);

  useEffect(() => {
    if (isValid) {
      setLoading(false);
    }
  });

  //Functions

  function goToLogin(){
    Navigate("/login");
  }

  function UpdateNewPassword() {
    axios({
      method: "PATCH",
      url: `/api/changePassword/${dehashedUserId}/`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        password: passwordInfo.password
      },
    })
    .then(() => {

    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    });  
    setDialogState(true);
  }

  function validatePassword(){
    let validPassword = new RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,}$/
    );

    setPasswordErrorState(false);
    setErrorPassMessage("");
    setErrorRepeatMessage("");

    // If the two passwords don't match
    if(passwordInfo.password !== passwordInfo.repeat) {
      setPasswordErrorState(true);
      setErrorRepeatMessage("The two passwords do not match.");
    }

    //If the passwords aren't of the proper regex
    if(!validPassword.test(passwordInfo.password)) {
      setPasswordErrorState(true);
      setErrorPassMessage("Your current password is not strong enough.");
    }
  }

  function handleChange(event){
    const { value, name } = event.target;
    setPasswordInfo((prevPasswordInfo) => ({
      ...prevPasswordInfo,
      [name]: value,
    }));
  }

  /**
   * A function that handles the submission of the form.
   */
   function handleSubmit(event) {
    event.preventDefault();

    let isError = false;

    if(passwordErrorState) isError = true;

    //If all checks have passed
    if(!isError) UpdateNewPassword();
  }

  //The Page
  return (
    <div>
      {/* {loading ?  (
      <Box sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center', }}>
        <CircularProgress /> */}
      {/* </Box>) : ( */}
        <Grid container spacing={2}>
          <Grid item xs={2} />
          <Grid item xs={8}>
          <Box pb={10} />
          <Paper elevation={10}>
            <form onSubmit={handleSubmit}>
              <Box pt={5} display="flex" justifyContent="center">
                  <Avatar src="../src/static/images/ogo.png"></Avatar>
              </Box>
              <Box textAlign="center">
                  <h3>Reset Password</h3>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={1} />

                <Grid item xs={4}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    id="outlined-password-input"
                    label="Password"
                    variant="outlined"
                    type="password"
                    error={passwordErrorState}
                    helperText={errorPassMessage}
                    onChange={handleChange}
                    onBlur={validatePassword}
                  />
                </Grid>

                <Grid item xs={2} />

                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    required
                    name="repeat"
                    id="outlined-password-input"
                    label="Repeat Password"
                    variant="outlined"
                    type="password"
                    error={passwordErrorState}
                    helperText={errorRepeatMessage}
                    onChange={handleChange}
                    onBlur={validatePassword}
                    />
                </Grid>
              </Grid>

              <Box pt={5} textAlign="center">
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  style={{ margin: "20px" }}
                  >
                  Submit
                </Button>
              </Box>
            </form>
          </Paper>
          </Grid>
        </Grid>
      
      <Dialog
       open={dialogState}
       onClose={goToLogin}>
        <DialogTitle>Reset Request Sent</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <p>Your password has been changed.</p>
            <p>Clicking on okay or the backdrop will return you to the login screen.</p>
          </DialogContentText>
          <DialogActions>
            <Button onClick={goToLogin} autofocus>
              Okay
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>

    </div>
  );
}

export default ForgetPasswordForm;