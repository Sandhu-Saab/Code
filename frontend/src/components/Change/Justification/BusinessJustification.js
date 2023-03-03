
import React, { useState } from "react";
import {
    List,
    Grid,
    Divider,
    Collapse,
    TextField,
    ListItemText,
    ListSubheader,
    ListItemButton,
} from "@mui/material";

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { Box } from '@mui/system';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

function BusinessJustification({
    startDateTime,
    endDateTime,
    currentStartDate,
    currentEndDate,
    onRequestJustificationChange,
    errorJustificationDetails,
}) {
    const [open, setOpen] = useState(false);

    const handleCollapse = () => {
        setOpen(!open);
    };

    /**
     * Handles changes to the Start Date input field.
     *
     * @param {Start Data Event Data} startDate 
     */
    function onChangeStartDateHandler(startDate) {
        startDateTime(startDate)
    }

    /**
     * Handles changes to the End Date input field. 
     * 
     * @param {End Data Event Data} endDate 
     */
    function onChangeEndDateHandler(endDate) {
        endDateTime(endDate)
    }
    
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
                    <ListItemText primary="Business Justification Form" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>

                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box p={4} component="div" disablePadding
                        sx={{ color: 'black', bgcolor: '#ffebee', border: 0, borderColor: 'primary.main' }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={1} />

                            <Grid item xs={4}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DateTimePicker
                                        label="Start Date"
                                        name="startDate"
                                        inputFormat="MM/dd/yyyy"
                                        value={currentStartDate}
                                        onChange={onChangeStartDateHandler}
                                        renderInput={(params) => <TextField {...params} error={errorJustificationDetails.errorStart} helperText={errorJustificationDetails.errorStart} fullWidth />}
                                    />
                                </LocalizationProvider>
                            </Grid>

                            <Grid item xs={2} />

                            <Grid item xs={4}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DateTimePicker
                                        label="End Date"
                                        name="endDate"
                                        inputFormat="MM/dd/yyyy"
                                        value={currentEndDate}
                                        onChange={onChangeEndDateHandler}
                                        renderInput={(params) => <TextField {...params} error={errorJustificationDetails.errorEnd} helperText={errorJustificationDetails.errorEnd} fullWidth />}
                                    />
                                </LocalizationProvider>
                            </Grid>

                            <Grid item xs={1} />
                        </Grid>

                        <br />
                        <Divider />

                        <Grid container spacing={2}>
                            <Grid item xs={1} />

                            <Grid item xs={4}>
                                <TextField
                                    margin='normal'
                                    id="purpose"
                                    label="What is it for?"
                                    variant="filled"
                                    multiline
                                    fullWidth
                                    name="purpose"
                                    rows={5}
                                    onChange={onRequestJustificationChange}
                                    error={errorJustificationDetails.errorPurpose}
                                    helperText={errorJustificationDetails.errorPurpose}
                                />
                            </Grid>

                            <Grid item xs={2} />

                            <Grid item xs={4}>
                                <TextField
                                    margin='normal'
                                    id="need"
                                    label="Why the change is needed?"
                                    variant="filled"
                                    multiline
                                    fullWidth
                                    name="need"
                                    rows={5}
                                    onChange={onRequestJustificationChange}
                                    error={errorJustificationDetails.errorNeed}
                                    helperText={errorJustificationDetails.errorNeed}
                                />
                            </Grid>

                            <Grid item xs={1} />
                        </Grid>

                        <br />
                        <Divider />

                        <Grid container spacing={2}>
                            <Grid item xs={1} />

                            <Grid item xs={4}>
                                <TextField
                                    margin='normal'
                                    id="security"
                                    label="How long will it be in effect?"
                                    variant="filled"
                                    multiline
                                    fullWidth
                                    name="security"
                                    rows={5}
                                    onChange={onRequestJustificationChange}
                                    error={errorJustificationDetails.errorSecurity}
                                    helperText={errorJustificationDetails.errorSecurity}
                                />
                            </Grid>

                            <Grid item xs={2} />

                            <Grid item xs={4}>
                                <TextField
                                    margin='normal'
                                    id="accessibility"
                                    label="Accessibility"
                                    variant="filled"
                                    multiline
                                    fullWidth
                                    name="accessibility"
                                    rows={5}
                                    onChange={onRequestJustificationChange}
                                    error={errorJustificationDetails.errorAccessibility}
                                    helperText={errorJustificationDetails.errorAccessibility}
                                />
                            </Grid>

                            <Grid item xs={1} />
                        </Grid>
                    </Box>
                </Collapse>
            </List>
        </>
    )
}

export default BusinessJustification;