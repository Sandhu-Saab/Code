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
 * Returns the Install Plan Drop Down Component form.
 * 
 * @param {Install Plan On Change Handler} onRequestInstallChange
 * @param {Install Plan Error Handler} errorInstallPlan 
 * @returns The Install Plan Drop Down Component form.
 */
function InstallPlan({ onRequestInstallChange, errorInstallPlan }) {
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
                    <ListItemText primary="Install Plan" />
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
                            onChange={onRequestInstallChange}
                            error={errorInstallPlan.errorDescription}
                            helperText={errorInstallPlan.errorDescription}
                        />
                    </Box>
                </Collapse>
            </List>
        </>
    )
}

export default InstallPlan;