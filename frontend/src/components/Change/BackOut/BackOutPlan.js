import React, { useState } from "react";
import {
  List,
  Collapse,
  TextField,
  ListItemText,
  ListSubheader,
  ListItemButton,
} from "@mui/material";

import { Box } from '@mui/system';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

/**
 * Returns the Back Out Plan Drop Down Component form.
 * 
 * @param {Back Out Plan On Change Handler} onRequestBackChange
 * @param {Back Out Plan Error Handler} errorBackPlan 
 * @returns The Back Out Plan Drop Down Component form.
 */
function BackOutPlan({ onRequestBackChange, errorBackPlan }) {
    const [open, setOpen] = useState(false);

    const handleCollapse = () => {
      setOpen(!open);
    };

    return (
        <>
            <List
                sx={{ width: '100%', color: 'white', bgcolor: '#1e88e5', borderRadius: 2 }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader" />
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
                    <TextField
                        id="description"
                        label="Description"
                        rows={4}
                        variant="filled"
                        multiline
                        fullWidth
                        name="description"
                        onChange={onRequestBackChange}
                        error={errorBackPlan.errorDescription}
                        helperText={errorBackPlan.errorDescription}
                    />
                    </Box>
                </Collapse>
            </List>
        </>
    )
}

export default BackOutPlan;