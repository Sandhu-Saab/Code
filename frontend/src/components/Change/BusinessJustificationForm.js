import React, { useState } from 'react'
import {
    List,
    ListSubheader,
    ListItemButton,
    ListItemText,
    Collapse,
    Grid,
    TextField,
    Divider,
} from "@mui/material";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/system';

/**
 * BusinessJustification dropdown form component for CreateRequest page
 * Parent component: CreateRequest
 */
function BusinessJustificationForm(props) {
    const [open, setOpen] = React.useState(false);
    const currentDate = new Date();
    const [startDateTime, setStartDateTime] = useState(
        new Date(currentDate.toISOString())
    );
    const [endDateTime, setEndDateTime] = useState(
        new Date(currentDate.toISOString())
    );
    const [justificationDetails, setJustificationDetails] = useState({
        startDate: startDateTime,
        endDate: endDateTime,
        purpose: "",
        need: "",
        security: "",
        accessibility: "",
    });
    const handleCollapse = () => {
        setOpen(!open);
    };

    /**
   * Handles change event  when justificationDetails field are change
   * Passing the props to the parent component
   */
    function handleChange(event) {
        const { value, name } = event.target;
        setJustificationDetails((prevJustificationDetails) => ({
            ...prevJustificationDetails,
            [name]: value,
        }));
        props.onJustificationDetailsChange(justificationDetails);
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
                                <DatePicker
                                    label="Start Date"
                                    inputFormat="MM/dd/yyyy"
                                    value={startDateTime}
                                    onChange={(newValue) => {
                                        setStartDateTime(newValue);
                                        setJustificationDetails({ ...justificationDetails, startDate: newValue });
                                    }}
                                    renderInput={(params) => <TextField {...params} fullWidth />}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={2} />
                        <Grid item xs={4}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="End Date"
                                    inputFormat="MM/dd/yyyy"
                                    value={endDateTime}
                                    onChange={(newValue) => {
                                        setEndDateTime(newValue);
                                        setJustificationDetails({ ...justificationDetails, endDate: newValue });
                                    }}
                                    renderInput={(params) => <TextField {...params} fullWidth />}
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
                                value={justificationDetails.purpose}
                                onChange={handleChange}
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
                                value={justificationDetails.need}
                                onChange={handleChange}
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
                                value={justificationDetails.security}
                                onChange={handleChange}
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
                                value={justificationDetails.accessibility}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={1} />
                    </Grid>
                </Box>
            </Collapse>
        </List>
    );
}

export default BusinessJustificationForm;