import React, { useState } from "react";

import {
    List,
    Grid,
    Input,
    Select,
    Divider,
    Collapse,
    MenuItem,
    TextField,
    InputLabel,
    Typography,
    FormControl,
    ListItemText,
    ListSubheader,
    ListItemButton,
    FormHelperText,
    InputAdornment,
  } from "@mui/material";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

import { Box } from "@mui/system";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

function EditLicenseInformation({
    license,
    onLicenseInfoChange,
    startDateTime,
    endDateTime,
    errorAssetLicense,
    }) {
    const [open, setOpen] = useState(false);

    /**
     * Handles the open and close of the asset forms.
     */
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
                    disablePadding
                    p={4} component="div"
                    sx={{
                        border: 0,
                        color: 'black',
                        bgcolor: '#ffebee',
                        borderColor: 'primary.main' 
                    }}
                >
                    <Typography variant="h5" color="#525252" align='center'>
                        License Information
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
                                defaultValue={license.vendorName}
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
                                defaultValue={license.currentVersion}
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
                                defaultValue={license.productName}
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
                                        defaultValue={license.vendorSupport}
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
                                defaultValue={license.licenseName}
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
                                defaultValue={license.licenseType}
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
                                    name="startDate"
                                    label="Start Date"
                                    value={license.startDate}
                                    inputFormat="MM/dd/yyyy"
                                    onChange={onChangeStartDateHandler}
                                    renderInput={(params) => <TextField {...params} error={errorAssetLicense.errorStart} helperText={errorAssetLicense.errorStart} fullWidth margin='normal' />}
                                />
                            </LocalizationProvider>
                        </Grid>

                        <Grid item xs={2} />

                        <Grid item xs={4}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="End Date"
                                    value={license.endDate}
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
                                    defaultValue={license.licenseCost}
                                    type="number"
                                    inputProps={{ min: 0 }}
                                    startAdornment={<InputAdornment position="end">$</InputAdornment>}
                                />
                                <FormHelperText>{errorAssetLicense.errorCost}</FormHelperText>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>
            </Collapse>
        </List>
    )
}

export default EditLicenseInformation;
