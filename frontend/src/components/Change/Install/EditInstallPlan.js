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
 * Returns the edit install plan form for specified request ticket.
 * @param {Install Plan Object} backOutDetails
 * @param {Install Plan onChange Handler} onRequestInstallChange
 * @param {Install Plan error Handler} errorInstallPlan 
 * @returns The edit install plan form for specified request ticket.
 */
function EditInstallPlan({
    installDetails,
    onRequestInstallChange,
    errorInstallPlan,
    }) {
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
                            value={installDetails.description}
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

export default EditInstallPlan;