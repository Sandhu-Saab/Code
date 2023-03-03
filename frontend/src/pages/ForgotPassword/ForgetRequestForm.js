import { React, useState, useEffect} from "react";
import {Box,
  Paper,
  Grid,
  Avatar,
  TextField,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  } from "@mui/material";
import { useNavigate} from "react-router-dom";
import axios from "axios";


//The start of the code
function ForgetRequestForm() {

  //Variables

  const [dialogState, setDialogState] = useState(false);

  const[userInfo, setUserInfo] = useState({
    email: "",
  });

  let Navigation = useNavigate();
  
  // Functions

  function sendEmail(){
    axios
      .post("/api/passwordResetRequest/", {
        email: `${userInfo.email}`
      })
      .then(function(response){
      })
      .catch(function(error) {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });

    setDialogState(true);
  }




  /**
   * A function that handles the submission of the form.
   */
  function handleSubmit(event) {
    event.preventDefault();
    sendEmail();
  }

  function handleChange(event){
    const { value, name } = event.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  }

  function returnToLogin(){
    Navigation("/login");
  }

  //The Page
  return (
    <div>
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
                <h3>Password Reset Request</h3>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={4} />

              <Grid item xs={4}>
                <TextField
                  fullWidth
                  required
                  name="email"
                  id="outlined-fname"
                  label="Email"
                  variant="outlined"
                  margin="normal"
                  type="text"
                  onChange={handleChange}
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
                Send
              </Button>

              <Button
                  type="button"
                  color="primary"
                  variant="contained"
                  style={{ margin: "20px" }}
                  onClick={() => {
                    Navigation("/login");
                  }}
              >
                Back
              </Button>
            </Box>
          </form>
        </Paper>
        </Grid>
      </Grid>

      <Dialog
       open={dialogState}
       onClose={returnToLogin}>
        <DialogTitle>Reset Request Sent</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <p>If your email exists within the database, an email will be sent to it containing further instructions.</p>
            <p>Clicking on okay or the backdrop will return you to the login screen.</p>
          </DialogContentText>
          <DialogActions>
            <Button onClick={returnToLogin} autofocus>
              Okay
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ForgetRequestForm;