import { React, useState } from "react";
import { TextField, Button, Paper, Box, Alert, AlertTitle } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Link from '@mui/material/Link';
import logo_small from "../../assets/logo_small.png";

/**
 * Returns the Login Form of PiXELL-River 
 *
 * @returns The Login Form of PiXELL-River
 */
function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  /**
   * Handles the username inputted by the user.
   *
   * @param {Text Field Handler} event 
   */
  const handleUsername = (event) => {
    setUsername(event.target.value);
    if (error === true) {
      setError(false);
    }
  };

  /**
   * Handles the password inputted by the user.
   *
   * @param {Text Field Handler} event 
   */
  const handlePassword = (event) => {
    setPassword(event.target.value);
    if (error === true) {
      setError(false);
    }
  };

  let Navigate = useNavigate();

  /**
   * Sends request to API to generate token for proof
   * of approved user information and generates a token.
   */
  function Login() {
    axios
      .post("/api/login/", {
        username: `${username}`,
        password: `${password}`,
      })
      .then(function (response) {
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("access", response.data.access);
        sessionStorage.setItem("refresh", response.data.refresh);
        Navigate("/login.success/");
      })
      .catch(function (error) {
        console.log(error);
        setError(true);
      });
    }
    

  return (
    <>
      <Paper elevation={10} >
        <form>
          <Box pt={5} justifyContent="flex" textAlign="center">
            <img alt="logo" src={logo_small} sx={{ width: 100, height: 100 }} />
          </Box>

          <Box textAlign="center">
              <h2>Login</h2>
          </Box>
          <Box
            sx={{
              mx: 'auto',
              width: "20vw",
              pt: 4,
              px: 5,
              pb: 3,
            }}
            alignItems="center"
          >
            <TextField
              autoFocus
              style={{ width: "100%" }}
              justifyContent="center"
              text-align="center"
              margin="auto"
              id="outlined-username-input"
              label="Username"
              variant="outlined"
              autoComplete="username"
              onChange={handleUsername}
              onKeyDown={(e) => e.key === "Enter" && Login()}
            />

            <Box pb={3}/>

            <TextField
              style={{ width: "100%" }}
              justifyContent="center"
              text-align="center"
              margin="auto"
              id="outlined-password-input"
              label="Password"
              variant="outlined"
              type="password"
              autoComplete="new-password"
              onChange={handlePassword}
              onKeyDown={(e) => e.key === "Enter" && Login()}
            />

            <Box
              sx={{
                mt: 2
              }}
            >
              <Link href="/forget/request" underline="hover">
                Forgot password?
              </Link>
            </Box>

            <Button
              startIcon={<LoginIcon />}
              color="primary"
              sx={{
                mt: 4,
                height: "5vh",
                width: "100%",
              }}
              variant="contained"
              onClick={() => {
                Login();
              }}
            >
              Login
            </Button>

            <Box
              sx={{
                pt: 2,
              }}
              textAlign="center"
            >
              Don't have an account? <Link href="/create/account" underline="hover" color="primary"><strong>Request Account</strong></Link>
            </Box>
          </Box>
        </form>

        {error ? (
          <Alert severity="error" sx={{ px: 8, py: 2 }}>
            <AlertTitle>Error</AlertTitle>
            Unable to Sign In - <strong>Invalid username or password</strong>
          </Alert>
        ) : null}
      </Paper>
    </>
  )
}

export default LoginForm;