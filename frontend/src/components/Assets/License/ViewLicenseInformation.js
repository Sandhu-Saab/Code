import React from "react";
import moment from 'moment';
import {
  List,
  Grid,
  Divider,
  Collapse,
  TextField,
  Typography,
  ListItemText,
  ListSubheader,
  ListItemButton,
} from "@mui/material";

import { Box } from '@mui/system';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useState, useEffect } from "react";
import axios from "axios";

/**
 * Returns the License Information dropdown view form.
 * 
 * @param {The ID for the license of the specified asset} license_id
 * @returns The License Information dropdown view form.
 */
function ViewLicenseInformation({ license_id }) {
    const [open, setOpen] = useState(false);
    const [license, setLicense] = useState();
    const token = sessionStorage.getItem("access");
    const [loading, setLoading] = useState(true);
    const [counter, setCounter] = useState(3);
    

    /**
     * Handles the open and close of the license information dropdown.
     */
    const handleCollapse = () => {
        setOpen(!open);
    };


    /**
     * Returns the specified license object using the license ID.
     * @returns The specified license object
     */
    const getLicense = async() => {
        try {
            const response = await axios({
                method: "GET",
                url: `/api/licenseData/${license_id}/`,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.data;

            setLicense(data);
            setLoading(false);
        } catch (error) {
            if(error.response) {
                console.log(error.response);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        }
    };

    useEffect(() => {
        getLicense();
    }, []);

    useEffect(() => {
        if (open) {
            counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
        }
    }, [counter, open]);

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
                        <ListItemText primary="License Information" />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>

                    <Collapse in={open} timeout="auto" unmountOnExit>

                    {loading ? (
                        <div className="spinner">
                            {counter !== 0 ? (
                                <>
                                <span>Loading. . .</span>
                                <div className="half-spinner"></div>
                                </>
                            ) : (
                                <h1>No License Info Found</h1>
                            )}
                        </div>
                    ) : (

                        <Box
                            p={4}
                            component="div"
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
                                        fullWidth
                                        type="text"
                                        margin="normal"
                                        name="vendorName"
                                        variant="outlined"
                                        label="Vendor Name"
                                        id="outlined-vendor-name"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        value={license.vendor_name}
                                    />

                                    <TextField
                                        fullWidth
                                        type="text"
                                        margin="normal"
                                        variant="outlined"
                                        name="currentVersion"
                                        label="Current Version"
                                        id="outlined-current-version"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        value={license.current_version}
                                    />
                                </Grid>

                                <Grid item xs={2} />

                                <Grid item xs={4}>
                                    <TextField
                                        fullWidth
                                        type="text"
                                        margin="normal"
                                        variant="outlined"
                                        name="productName"
                                        label="Product Name"
                                        id="outlined-product-name"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        value={license.product_name}
                                    />

                                    <TextField
                                        fullWidth
                                        type="text"
                                        margin="normal"
                                        variant="outlined"
                                        name="vendorSupport"
                                        id="outlined-vendor-support"
                                        label="Product Vendor Support"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        value={license.vendor_support}
                                    />
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
                                        fullWidth
                                        name="licenseName"
                                        id="outlined-license-name"
                                        label="License Name"
                                        variant="outlined"
                                        margin="normal"
                                        type="text"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        value={license.license_name}
                                    />
                                </Grid>

                                <Grid item xs={2} />

                                <Grid item xs={4}>
                                    <TextField
                                        fullWidth
                                        type="text"
                                        margin="normal"
                                        name="licenseType"
                                        variant="outlined"
                                        label="License Type"
                                        id="outlined-license-type"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        value={license.license_type}
                                    />
                                </Grid>
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid item xs={1} />

                                <Grid item xs={4}>
                                    <TextField
                                        fullWidth
                                        type="text"
                                        margin="normal"
                                        name="startDate"
                                        variant="outlined"
                                        label="Start Date"
                                        id="outlined-start-date"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        value={moment(license.start_date).format("MMM Do YYYY, h:mm a")}
                                    />
                                </Grid>

                                <Grid item xs={2} />

                                <Grid item xs={4}>
                                    <TextField
                                        fullWidth
                                        type="text"
                                        margin="normal"
                                        name="endDate"
                                        variant="outlined"
                                        label="End Date"
                                        id="outlined-end-date"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        value={moment(license.end_date).format("MMM Do YYYY, h:mm a")}
                                    />
                                </Grid>
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid item xs={1}/>

                                <Grid item xs={4}>
                                    <TextField
                                        fullWidth
                                        type="text"
                                        margin="normal"
                                        name="licenseCost"
                                        variant="outlined"
                                        label="License Cost"
                                        id="outlined-license-cost"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        value={"$" + license.license_cost}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                        )}
                    </Collapse>
                </List>
        </>
    )
}

export default ViewLicenseInformation;