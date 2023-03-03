import * as React from "react";
import { Grid } from "@mui/material";
import CreateAccountForm from "./CreateAccountForm"

function CreateAccount() {
  document.title = "Create Account - PiXELL-River";

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
        <CreateAccountForm />
      </Grid>   
    </Grid>
  )
}

export default CreateAccount;