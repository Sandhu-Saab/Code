import React from 'react'
import {
  List,
  ListSubheader,
  ListItemButton,
  ListItemText,
  Collapse,
  TextField,
  Button,
  Stack,
} from "@mui/material";

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const Input = styled('input')({
  display: 'none',
});

/**
 * BackOutPlan dropdown form component for CreateRequest page
 * Parent component: CreateRequest
 * (ongoing)
 */
function BackOutPlan() {
  const [open, setOpen] = React.useState(false);

  const handleCollapse = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 1200, color: 'white', bgcolor: '#1e88e5', borderRadius: 2 }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
        </ListSubheader>
      }
    >
      <ListItemButton onClick={handleCollapse}>
        <ListItemText primary="Back Out Plan" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box p={4} component="div" disablePadding
          sx={{ color: 'black', bgcolor: '#ffebee', border: 0, borderColor: 'primary.main' }}
        >
          <Stack direction="row" alignItems="center" spacing={2} pb={2}>
            <label htmlFor="contained-button-file">
              <Input accept="" id="contained-button-file" multiple type="file" />
              <Button variant="contained" component="span">
                <UploadFileIcon />
                Upload
              </Button>
            </label>
          </Stack>
          <TextField
            id="decsription"
            label="Description"
            rows={4}
            variant="filled"
            multiline
            maxRows={100}
            fullWidth
            name="description"
          />
        </Box>
      </Collapse>
    </List>
  );
}

export default BackOutPlan;