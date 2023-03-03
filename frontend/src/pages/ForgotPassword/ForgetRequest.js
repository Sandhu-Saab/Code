import React from 'react';
import { Box, Container } from "@mui/material";
import ForgetRequestForm from './ForgetRequestForm';

function ForgetRequest(props) {
  return(
    <Container>
      <Box pt={20}>
      <ForgetRequestForm />
      </Box>
    </Container>
  );
}

export default ForgetRequest;