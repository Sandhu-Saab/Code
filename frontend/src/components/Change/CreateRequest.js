import React, { useState, useEffect } from "react";
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
    Step,
    StepLabel,
} from "@mui/material";
import SelectAsset from "./SelectAsset";
import RequestForm from "./RequestForm";
import BusinessJustificationForm from "./BusinessJustificationForm";
import RiskAssessmentForm from "./RiskAssessmentForm";
import axios from "axios";
import InstallPlan from "./InstallPlan";
import BackOutPlan from "./BackOutPlan";
import "../layout/preloader3.css";

import CreateRequestForm from "./CreateRequestForm";

const steps = [
    "New",
    "Pending",
    "Approved",
];

/**
 * Default Export function for creating change request
 * Child components: SelectAsset, RequestForm, BusinessJustificationForm, 
 *                                RiskAssessmentForm, InstallPlan, BackOutPlan
 */
function CreateRequest() {
    const [requestType, setRequestType] = useState("");
    const [requestDetails, setRequestDetails] = useState();
    const [justificationDetails, setJustificationDetails] = useState();
    const [selectedAsset, setSelectedAsset] = useState([0]);
    const [error, setError] = useState(false);
    const currentDate = new Date();
    const [requestId, setRequestId] = React.useState();
    const [loading, setLoading] = useState(true);
    const [requestDateTime, setRequestDateTime] = useState(
        new Date(currentDate.toISOString())
    );

    let token = sessionStorage.getItem("access");

    const currentUserId = sessionStorage.getItem("userId");
    const currentUserRole = sessionStorage.getItem("roleId");
    let currentUserSection;
    
    if (currentUserRole === null || currentUserRole === "") {
        currentUserSection = "N/A";
    } else {
        currentUserSection = sessionStorage.getItem("section");
    }

    useEffect(() => {
        getRequestId();
    }, []);

    useEffect(() => {
        if (requestId === undefined) {
            setLoading(false);
        }
    });


    /**
   * Fetch maxId from the changeRequest table and set to requestId
   */
    function getRequestId() {
        axios({
            method: "GET",
            url: "/api/api/changerequests/",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                const data = response.data;

                let maxArray = [];
                for (let i = 0; i < data.length; i++) {
                    maxArray.push(data[i].requestId);
                }

                let maxid = Math.max(...maxArray) + 1;
                if (maxid === -Infinity) {
                    maxid = 1;
                }
                setRequestId(maxid);
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            });
    };

    /**
   * POST the requestDetails data to the changerequest table on the database
   */
    function postRequestDetails(event) {
        axios({
            method: "POST",
            url: "/api/api/changerequests/",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            data: {
                status: 1,
                requestType: requestType,
                requestDateTime: requestDateTime,
                requestName: requestDetails.requestName,
                projectName: requestDetails.projectName,
                assignedTo: requestDetails.assignedTo,
                ownerId: Number.parseInt(currentUserId),
                requestOwnerSection: String(currentUserSection),
                department: requestDetails.department,
                requestedById: requestDetails.requestedById,
                requestContact: requestDetails.requestContact,
                impact: requestDetails.impact,
                urgency: requestDetails.urgency,
                priority: requestDetails.priority,
                description: requestDetails.description,
                assetId: selectedAsset,
            },
        }).then((response) => {
            postJustificationDetails();
        });

        event.preventDefault();
    };

    /**
       * POST the justificationDetails data to the businessJustification table on the database
       */
    function postJustificationDetails(event) {
        axios({
            method: "POST",
            url: "/api/api/businessjustifications/",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            data: {
                requestId: requestId,
                startDate: justificationDetails.startDate,
                endDate: justificationDetails.endDate,
                purpose: justificationDetails.purpose,
                need: justificationDetails.need,
                security: justificationDetails.security,
                accessibility: justificationDetails.accessibility,
            },
        }).then((response) => {
            window.location.href = "../change/all";
        });

        event.preventDefault();
    };

    return (
        <>
            {/* {loading ? (
                <div className="spinner">
                    <span>Loading. . .</span>
                    <div className="half-spinner"></div>
                </div>
            ) : (
                <Grid container spacing={2}>
                    <Grid item xs={2} />
                    <Grid item xs={8}>
                        <Paper elevation={10}>
                            <Box p={4}>
                                <Typography variant="h4" fontWeight="bold" color="#525252" align='center' pb={5}>New Request</Typography>
                                <Box pb={5} sx={{ width: "100%" }}>
                                    <Stepper activeStep={0} alternativeLabel>
                                        {steps.map((label) => (
                                            <Step key={label}>
                                                <StepLabel>{label}</StepLabel>
                                            </Step>
                                        ))}
                                    </Stepper>
                                </Box>
                                <Box pb={4}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={1} />
                                        <Grid item xs={4} >
                                            <FormControl sx={{ m: 0, minWidth: 300 }} variant="filled">
                                                <InputLabel id="RequestType">
                                                    Request Type
                                                </InputLabel>
                                                <Select
                                                    name="requestType"
                                                    labelId="requestType"
                                                    id="requestType"
                                                    value={requestType}
                                                    onChange={(event) => {
                                                        setRequestType(event.target.value);
                                                    }}
                                                    label="requestType"
                                                >
                                                    <MenuItem value=""><em>None</em></MenuItem>
                                                    <MenuItem value={1} >Standard (Pre-Approved)</MenuItem>
                                                    <MenuItem value={2} >Normal (Minor)</MenuItem>
                                                    <MenuItem value={3} >Major (Requires CAB)</MenuItem>
                                                    <MenuItem value={4} >Emergency</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={2} />
                                        <Grid item xs={4} >

                                        </Grid>
                                        <Grid item xs={1} />
                                    </Grid>
                                </Box>
                                <SelectAsset onSelectAssetChange={handleSelectAssetChange} />
                                <br />
                                <RequestForm onRequestDetailsChange={handleRequestDetailsChange} />
                                <br />
                                <BusinessJustificationForm onJustificationDetailsChange={handleJustificationDetailsChange} />
                                <br />
                                <RiskAssessmentForm />
                                <br />
                                <InstallPlan />
                                <br />
                                <BackOutPlan />
                                <Box pt={2} />
                                {error ? (
                                    <Alert severity="warning">All required fields must be filled out</Alert>
                                ) : null}
                                <Box pt={5} textAlign="center">
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        onClick={checkBlank}
                                    >
                                        Submit
                                    </Button>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={2} />
                </Grid>
            )} */}

            <CreateRequestForm/>
        </>


    );
}

export default CreateRequest