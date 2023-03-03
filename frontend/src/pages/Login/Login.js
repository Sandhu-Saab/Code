import React from 'react'
import { Grid } from "@mui/material";
import LoginForm from "./LoginForm"

// Page for Login Page
function Login() {
  document.title = "Login - PiXELL-River Financial";

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={3}>
        <LoginForm />
      </Grid>   
    </Grid>
  )
}

export default Login;