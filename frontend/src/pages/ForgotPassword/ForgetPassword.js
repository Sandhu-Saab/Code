import React from 'react';
import { Box, Container } from "@mui/material";
import ForgetPasswordForm from './ForgetPasswordForm';

function ForgetPassword() {
  return(
    <Container>
      <Box pt={20}>
      <ForgetPasswordForm />
      </Box>
    </Container>
  );
}

export default ForgetPassword;