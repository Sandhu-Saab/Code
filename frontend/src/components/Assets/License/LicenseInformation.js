import React, { useState } from "react";
import {
  List,
  ListSubheader,
  ListItemButton,
  ListItemText,
  Collapse,
  Grid,
  TextField,
  Divider,
  InputAdornment,
  FormControl,
  InputLabel,
  Input,
  Select,
  MenuItem,
  Typography,
  FormHelperText,
} from "@mui/material";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/system";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";

/**
 * Returns the license information dropdown to create asset.
 * 
 * @param {Information required related to license information, errors and handler.} param0 
 * @returns The license information dropdown to create asset.
 */
function LicenseInformation({
        onLicenseInfoChange,
        startDateTime,
        endDateTime,
        currentStartDate,
        currentEndDate,
        errorAssetLicense
    }){
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
        <List
            sx={{ width: '100%', color: 'white', bgcolor: '#1e88e5', borderRadius: 2 }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader" />
            }
        >
            <ListItemButton onClick={handleCollapse}>
                <ListItemText primary="License Information" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={open} timeout="auto" unmountOnExit>
                <Box
                    p={4} component="div"
                    disablePadding
                    sx={{
                        color: 'black',
                        bgcolor: '#ffebee',
                        border: 0,
                        borderColor: 'primary.main' 
                    }}
                >
                    <Typography variant="h5" color="#525252" align='center'>
                        Vendor Details
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid item xs={1} />

                        <Grid item xs={4}>
                            <TextField
                                required
                                fullWidth
                                type="text"
                                margin="normal"
                                name="vendorName"
                                variant="outlined"
                                label="Vendor Name"
                                id="outlined-vendor-name"
                                onChange={onLicenseInfoChange}
                                error={errorAssetLicense.errorVendor}
                                helperText={errorAssetLicense.errorVendor}
                            />

                            <TextField
                                required
                                fullWidth
                                type="text"
                                margin="normal"
                                variant="outlined"
                                name="currentVersion"
                                label="Current Version"
                                id="outlined-current-version"
                                onChange={onLicenseInfoChange}
                                error={errorAssetLicense.errorVersion}
                                helperText={errorAssetLicense.errorVersion}
                            />
                        </Grid>

                        <Grid item xs={2} />

                        <Grid item xs={4}>
                            <TextField
                                required
                                fullWidth
                                type="text"
                                margin="normal"
                                variant="outlined"
                                name="productName"
                                label="Product Name"
                                id="outlined-product-name"
                                onChange={onLicenseInfoChange}
                                error={errorAssetLicense.errorProduct}
                                helperText={errorAssetLicense.errorProduct}
                            />

                            <Box pt={2}>
                                <FormControl error={errorAssetLicense.errorSupport} sx={{ width: '100%' }} required>
                                    <InputLabel id="vendorSupport">
                                        Vendor Support
                                    </InputLabel>

                                    <Select
                                        required
                                        name="vendorSupport"
                                        labelId="vendorSupport"
                                        id="vendorSupport"
                                        label="Vendor Support"
                                        onChange={onLicenseInfoChange}
                                    >
                                        <MenuItem value={true}>Yes</MenuItem>
                                        <MenuItem value={false}>No</MenuItem>
                                    </Select>
                                    <FormHelperText>{errorAssetLicense.errorSupport}</FormHelperText>
                                </FormControl>
                            </Box>
                        </Grid>
                    </Grid>

                    <br />
                    <Divider />

                    <Typography variant="h5" color="#525252" align='center' pt={2}>
                        License Details
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid item xs={1} />

                        <Grid item xs={4}>
                            <TextField
                                required
                                fullWidth
                                name="licenseName"
                                id="outlined-license-name"
                                label="License Name"
                                variant="outlined"
                                margin="normal"
                                type="text"
                                onChange={onLicenseInfoChange}
                                error={errorAssetLicense.errorName}
                                helperText={errorAssetLicense.errorName}
                            />
                        </Grid>

                        <Grid item xs={2} />

                        <Grid item xs={4}>
                            <TextField
                                required
                                fullWidth
                                type="text"
                                margin="normal"
                                name="licenseType"
                                variant="outlined"
                                label="License Type"
                                id="outlined-license-type"
                                onChange={onLicenseInfoChange}
                                error={errorAssetLicense.errorType}
                                helperText={errorAssetLicense.errorType}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={1} />

                        <Grid item xs={4}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    disablePast
                                    name="startDate"
                                    label="Start Date"
                                    value={currentStartDate}
                                    inputFormat="MM/dd/yyyy"
                                    // renderDay={customDayRenderer}
                                    onChange={onChangeStartDateHandler}
                                    renderInput={(params) => <TextField {...params} error={errorAssetLicense.errorStart} helperText={errorAssetLicense.errorStart} fullWidth margin='normal' />}
                                />
                            </LocalizationProvider>
                        </Grid>

                        <Grid item xs={2} />

                        <Grid item xs={4}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    disablePast
                                    name="startDate"
                                    label="End Date"
                                    value={currentEndDate}
                                    inputFormat="MM/dd/yyyy"
                                    onChange={onChangeEndDateHandler}
                                    renderInput={(params) => <TextField {...params} error={errorAssetLicense.errorEnd} helperText={errorAssetLicense.errorEnd} fullWidth margin='normal' />}
                                />
                            </LocalizationProvider>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={1}/>

                        <Grid item xs={4} sx={{ mt: "15px" }}>
                            <FormControl error={errorAssetLicense.errorCost} fullWidth variant="standard" required>
                                <InputLabel htmlFor="licenseCost">License Cost</InputLabel>
                                <Input
                                    name="licenseCost"
                                    id="licenseCost"
                                    onChange={onLicenseInfoChange}
                                    type="number"
                                    inputProps={{ min: 0 }}
                                    startAdornment={<InputAdornment position="end">$</InputAdornment>}
                                />
                                <FormHelperText>{errorAssetLicense.errorCost}</FormHelperText>
                            </FormControl>
                        </Grid>

                        {/* <Grid item xs={2} />

                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                type="text"
                                margin="normal"
                                name="licenseKey"
                                variant="outlined"
                                label="License Key"
                                id="outlined-license-key"
                            />
                        </Grid> */}
                    </Grid>

                    {/* <Box pt={2}>
                        <Grid container spacing={2}>
                            <Grid item xs={1} />

                            <Grid item xs={10} >
                                <TextField
                                    rows={5}
                                    fullWidth
                                    multiline
                                    maxRows={5}
                                    id="bulkLicense"
                                    variant="filled"
                                    name="bulkLicense"
                                    label="Bulk License"
                                    helperText={`Please enter a new license on a new line.`}
                                />
                            </Grid>
                            <Grid item xs={1} />
                        </Grid>
                    </Box> */}
                </Box>
            </Collapse>
        </List>
    )
}

export default LicenseInformation;
