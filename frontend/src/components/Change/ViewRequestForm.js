import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../layouts/preloader3.css";

import {
    Box,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    Paper,
    Grid,
    Button,
    Typography,
    Alert,
    Stepper,
    AlertTitle,
    Step,
    StepLabel,
    FormHelperText,
    TextField,
} from "@mui/material";
import ViewSelectedAsset from "./Asset/ViewSelectedAsset";
import ViewRequestDetails from "./Request/ViewRequestDetails";
import ViewBusinessJustification from "./Justification/ViewBusinessJustification";
import ViewRiskAssessment from "./Assessment/ViewRiskAssessment";
import ViewInstallPlan from "./Install/ViewInstallPlan";
import ViewBackOutPlan from "./BackOut/ViewBackOutPlan";
import { useNavigate, useLocation } from "react-router-dom";

function ViewRequestForm({ id, status, type, request }) {
    let navigate = useNavigate();    
    const [users, setUsers] = useState([]);
    const token = sessionStorage.getItem("access");

    const currentUserId = sessionStorage.getItem("userId");
    const currentUserRoleId = sessionStorage.getItem("roleId");
    const currentUserSection = sessionStorage.getItem("section");


    /**
     * Fetches users object from API.
     */
    const getUsers = async() => {
        try {
            const response = await axios({
                method: "GET",
                url: `/api/users/`,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.data;
            // console.log(data, "ViewRequestForm.js");
            setUsers(data);
        } catch (error) {
            if (error.response) {
                console.log(error.response);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        }
    }


    useEffect(() => {
        getUsers();
        console.log(request);
    }, []);

    

    

    /**
     * Redirects user to the edit page.
     */
    const routeChangeEdit = () =>{ 
        let path = "/change/edit?requestId=" + id;

        navigate(path);
    }   

    /**
     * Redirects user back to the asset list.
     */
     const routeChangeBack = () =>{ 
        let path = "/change/all";

        navigate(path);
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={2} />

                <Grid item xs={8}>
                    <Paper elevation={10}>
                        <Box p={4}>
                            <Typography variant="h4" fontWeight="bold" color="#525252" align='center' pb={5}>View Change Request</Typography>

                            <Box pb={5} sx={{ width: "100%" }}>
                                <Stepper alternativeLabel activeStep={Number(request.status) - 1}>
                                    <Step key={1}>
                                        <StepLabel>New</StepLabel>
                                    </Step>
                                    <Step key={2}>
                                        <StepLabel>Pending</StepLabel>
                                    </Step>
                                    <Step key={3}>
                                        <StepLabel>Approved</StepLabel>
                                    </Step>
                                </Stepper>
                            </Box>

                            <Box pb={4}>
                                <Grid container spacing={2}>
                                    <Grid item xs={1} />

                                    <Grid item xs={4} >
                                        <TextField
                                            type="text"
                                            margin="normal"
                                            id="requestType"
                                            variant="filled"
                                            name="requestType"
                                            label="Request Type"
                                            value={type}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={1} />
                                </Grid>
                            </Box>

                            <ViewSelectedAsset
                                assets={request.assets}
                                users={users}
                            />
                            <br />

                            <ViewRequestDetails
                                id={id}
                                users={users}
                            />
                            <br />
                            
                            <ViewBusinessJustification
                                id={request.business_justification}
                            />
                            <br />

                            <ViewRiskAssessment
                                id={request.risk_assesment}
                            />
                            <br />
                            
                            <ViewInstallPlan
                                id={request.install_plan}
                            />
                            <br />

                            <ViewBackOutPlan
                                id={request.backout_plan}
                            />

                            <Box pt={5} textAlign="center">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    onClick={routeChangeEdit}
                                >
                                    Edit
                                </Button>

                                <Button
                                    type="submit"
                                    variant="contained"
                                    onClick={routeChangeBack}
                                    style={{ margin: "20px" }}
                                >
                                    Back
                                </Button>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}

export default ViewRequestForm;