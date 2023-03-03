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
} from "@mui/material";

import SelectAsset from "./SelectAsset";
import SelectedAsset from "./Asset/SelectedAsset";
import RequestForm from "./RequestForm";
import RequestDetails from "./Request/RequestDetails";
import BusinessJustificationForm from "./BusinessJustificationForm";
import BusinessJustification from "./Justification/BusinessJustification";
import RiskAssessment from "./Assessment/RiskAssessment";
import InstallPlan from "./Install/InstallPlan";
import BackOutPlan from "./BackOut/BackOutPlan";

function CreateRequestForm() {
    const currentDate = new Date();
    const [status, setStatus] = useState([]);
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState(false);
    const [requestId, setRequestId] = useState("");

    // Use States that handles the data for creating new change request
    const [error, setError] = useState("");
    const [requestType, setRequestType] = useState("");
    const [typeError, setTypeError] = useState("");
    const [counter, setCounter] = useState(3);
    const [open, setOpen] = useState(true);  

    const currentUserId = sessionStorage.getItem("userId");
    const currentUserRole = sessionStorage.getItem("roleId");
    const currentUserSection = sessionStorage.getItem("section");

    const [relatedAsset, setRelatedAsset] = useState([]);

    const [requestDetails, setRequestDetails] = useState({
        requestName: "",
        projectName: "",
        assignedTo: "",
        requestedBy: "",
        department: "",
        requestContact: "",
        impact: 4,
        urgency: 4,
        priority: 4,
        description: "",
        changeId: requestId,
    });

    const [requestError, setRequestError] = useState({
        errorName: "",
        errorProject: "",
        errorAssign: "",
        errorRequest: "",
        errorDepartment: "",
        errorContact: "",
        errorDescription: "",
    });

    const [justificationDetails, setJustificationDetails] = useState({
        startDate: (new Date(currentDate.toISOString())),
        endDate: (new Date(currentDate.toISOString())),
        purpose: "",
        need: "",
        security: "",
        accessibility: "",
    });

    const [justificationError, setJustificationError] = useState({
        errorStart: "",
        errorEnd: "",
        errorPurpose: "",
        errorNeed: "",
        errorSecurity: "",
        errorAccessibility: "",
    });
    
    const [assessmentDetails, setAssessmentDetails] = useState({
        backout: "",
        configuration: "",
        environment: "",
        maturity: "",
        redundancy: "",
        implement: "",
        deployment: "",
        history: "",
        member: "",
        production: "",
        schedule: "",
    });
    
    const [assessmentError, setAssessmentError] = useState({
        errorBackout: "",
        errorConfiguration: "",
        errorEnvironment: "",
        errorMaturity: "",
        errorRedundancy: "",
        errorImplement: "",
        errorDeployment: "",
        errorHistory: "",
        errorMember: "",
        errorProduction: "",
        errorSchedule: "",
    });

    const [installDetails, setInstallDetails] = useState({
        file: "",
        description: "",
    });

    const [installError, setInstallError] = useState({
        errorFile: "",
        errorDescription: "",
    });

    const [backOutDetails, setBackOutDetails] = useState({
        file: "",
        description: "",
    });
    
    const [backOutError, setBackOutError] = useState({
        errorFile: "",
        errorDescription: "",
    });

    let token = sessionStorage.getItem("access");

    /**
     * Handles changes to the selected asset.
     * 
     * @param {*} selectedAsset 
     */
    function handleSelectAssetChange(selectedAsset) {
        setRelatedAsset(selectedAsset);
    }

    /**
     * Handles changes to request details input fields.
     * 
     * @param {*} event 
     */
    function handleRequestDetailsChange(event) {
        const { value, name } = event.target;

        setRequestDetails((prevRequestDetails) => ({
            ...prevRequestDetails,
            [name]: value,
        }));
    }
    
    /**
     * Handles changes to the assigned to input field.
     * 
     * @param {*} event 
     * @param {*} newValue 
     */
    function handleRequestAssignChange(event, newValue) {
        setRequestDetails((prevRequestDetails) => ({
            ...prevRequestDetails,
            assignedTo: newValue.id,
        }));
    }

    /**
     * Handles changes to the requested by input field.
     * 
     * @param {*} event 
     * @param {*} newValue 
     */
    function handleRequestRequestedByChange(event, newValue) {
        setRequestDetails((prevRequestDetails) => ({
            ...prevRequestDetails,
            requestedBy: newValue.id,
        }));
    }

    /**
     * Calculates the value of the priority based on changes to impact and urgency.
     * 
     * @param {*} event 
     */
    function handlePriorityChange(event) {
        const { value, name } = event.target;

        setRequestDetails((prevRequestDetails) => ({
            ...prevRequestDetails,
            [name]: Number.parseInt(value),
        }));

        let impact = requestDetails.impact;
        let urgency = requestDetails.urgency;
        let priorityValue = 0;

        if (urgency === 4) {
            priorityValue = 4;
        } else {
            if (urgency === 3) {
                if (impact !== 1) {
                    priorityValue = 3;
                } else {
                    priorityValue = 2;
                }
            } else {
                if (urgency === 2) {
                    if (impact === 1) {
                        priorityValue = 1;
                    } else if (impact === 4) {
                        priorityValue = 3;
                    } else {
                        priorityValue = 2;
                    }
                } else {
                    if (urgency === 1) {
                        if (impact < 3) {
                            priorityValue = 1;
                        } else {
                            priorityValue = 2;
                        }
                    }
                }
            }
        }

        setRequestDetails((prevRequestDetails) => ({
            ...prevRequestDetails,
            priority: Number.parseInt(priorityValue),
        }));
    }

    /**
     * Handles changes to business justification input fields.
     * 
     * @param {*} event 
     */
    function handleRequestJustificationChange(event) {
        const { value, name } = event.target;

        setJustificationDetails((prevRequestJustification) => ({
            ...prevRequestJustification,
            [name]: value,
        }));
    }

    /**
     * Handles changes to the start date input field.
     * 
     * @param {*} event 
     */
    function handleStartDateChange(event) {
        setJustificationDetails((prevRequestJustification) => ({
            ...prevRequestJustification,
            startDate: event,
        }));
    }

    /**
     * Handles changes to the end date input field.
     * 
     * @param {*} event 
     */
    function handleEndDateChange(event) {
        setJustificationDetails((prevRequestJustification) => ({
            ...prevRequestJustification,
            endDate: event,
        }));
    }

    /**
     * Handles changes to risk assessment input fields.
     * 
     * @param {*} event 
     * @param {*} newValue 
     */
    function handleAssessmentChange(event, newValue) {
        const { value, name } = event.target;

        console.log(value);

        setAssessmentDetails((prevRequestAssessment) => ({
            ...prevRequestAssessment,
            [name]: value,
        }));
    }

    /**
     * Handles changes to install plan input fields.
     * 
     * @param {*} event 
     * @param {*} newValue 
     */
    function handleInstallPlanChange(event, newValue) {
        const { value, name } = event.target;

        setInstallDetails((prevInstallDetails) => ({
            ...prevInstallDetails,
            [name]: value,
        }));
    }
    
    /**
     * Handles changes to backout plan input fields.
     * 
     * @param {*} event 
     * @param {*} newValue 
     */
    function handleBackOutPlanChange(event, newValue) {
        const { value, name } = event.target;

        setBackOutDetails((prevBackoutDetails) => ({
            ...prevBackoutDetails,
            [name]: value,
        }));
    }

    /**
     * Fetch maxId from the changeRequest table and set to requestId
     */
    function getRequestId() {
        axios({
            method: "GET",
            url: "/api/requestData/",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                const data = response.data;

                let maxid = (data.length) + 1;

                setRequestId(maxid);
                console.log(maxid);
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            });
    }

    useEffect(() => {
        getRequestId();
    }, []);

    useEffect(() => {
        if (requestId) {
            setLoading(false);
        }
    });

    useEffect(() => {
        if (open) {
            counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
        }
    }, [counter, open]);

    /**
     * Validates the form for all input fields.
     */
    function validateInfo(e) {
        hideAllErrors();

        if (!isValidate()) {
            e.preventDefault();
            setError("An error Has occurred! Please check for any errors on the form and try again.");
        } else {
            postChangeBusinessJustification();
            setPost(true);
        }
    }

    /**
     * Hides all error messages.
     */
    function hideAllErrors() {
        setError("");
        setRequestError("");
        setJustificationError("");
        setAssessmentError("");
        setInstallError("");
        setBackOutError("");
        setTypeError("");
    }

    /**
     * Validates all input fields.
     */
    function isValidate() {
        let isRequestCorrect = true;

        /// Request Details Form
        let requestProjectName = requestDetails.projectName;
        let requestRequestName = requestDetails.requestName;
        let requestAssign = requestDetails.assignedTo;
        let requestRequestedBy = requestDetails.requestedBy;
        let requestDepartment = requestDetails.department;
        let requestContact = requestDetails.requestContact;
        let requestDescription = requestDetails.description;

        /// Request Justification Form
        let requestStart = justificationDetails.startDate;
        let requestEnd = justificationDetails.endDate;
        let requestPurpose = justificationDetails.purpose;
        let requestNeed = justificationDetails.need;
        let requestSecurity = justificationDetails.security;
        let requestAccessibility = justificationDetails.accessibility;

        /// Request Risk Assessment Form
        let requestBackout = assessmentDetails.backout;
        let requestConfiguration = assessmentDetails.configuration;
        let requestEnvironment = assessmentDetails.environment;
        let requestMaturity = assessmentDetails.maturity;
        let requestRedundancy = assessmentDetails.redundancy;
        let requestImplement = assessmentDetails.implement;
        let requestDeployment = assessmentDetails.deployment;
        let requestHistory = assessmentDetails.history;
        let requestMember = assessmentDetails.member;
        let requestProduction = assessmentDetails.production;
        let requestSchedule = assessmentDetails.schedule;

        // Request Install Plan
        let requestInstallDescription = installDetails.description;

        // Request Back Out Plan
        let requestBackDescription = backOutDetails.description;

        // Check if Request Type is empty
        if (isEmpty(requestType)) {
            isRequestCorrect = false;
            setTypeError("Request Type is required!");
        }

        // Check if project name is empty
        if (isEmpty(requestProjectName)) {
            isRequestCorrect = false;
            setRequestError((prevRequestError) => ({
                    ...prevRequestError,
                errorProject: "Project Name is required!",
            }));
        }

        // Check if request name is empty
        if (isEmpty(requestRequestName)) {
            isRequestCorrect = false;
            setRequestError((prevRequestError) => ({
                    ...prevRequestError,
                errorName: "Request Name is required!",
            }));
        }

        // Check if assigned to is empty
        if (isEmpty(requestAssign)) {
            isRequestCorrect = false;
            setRequestError((prevRequestError) => ({
                ...prevRequestError,
                errorAssign: "Assigned To is required!",
            }));
        }

        // Check if requested by is empty
        if (isEmpty(requestRequestedBy)) {
            isRequestCorrect = false;
            setRequestError((prevRequestError) => ({
                ...prevRequestError,
                errorRequest: "Requested By is required!",
            }));
        }

        // Check if department name is empty
        if (isEmpty(requestDepartment)) {
            isRequestCorrect = false;
            setRequestError((prevRequestError) => ({
                ...prevRequestError,
                errorDepartment: "Department Name is required!",
            }));
        }

        // Check if request contact is empty
        if (isEmpty(requestContact)) {
            isRequestCorrect = false;
            setRequestError((prevRequestError) => ({
                ...prevRequestError,
                errorContact: "Contact Name is required!",
            }));
        }

        // Check if request description is empty
        if (isEmpty(requestDescription)) {
            isRequestCorrect = false;
            setRequestError((prevRequestError) => ({
                ...prevRequestError,
                errorDescription: "Description is required!",
            }));
        }

        // Check if end date is greater than start date to is empty
        if (requestEnd < requestStart) {
            isRequestCorrect = false;
            setJustificationError((prevDetailErrors) => ({
                ...prevDetailErrors,
                errorEnd: "End Date cannot be less then Start Date!",
            }));
        }
        
        // Check if request purpose is empty
        if (isEmpty(requestPurpose)) {
            isRequestCorrect = false;
            setJustificationError((prevRequestError) => ({
                ...prevRequestError,
                errorPurpose: "Purpose is required!",
            }));
        }

        // Check if request change is empty
        if (isEmpty(requestNeed)) {
            isRequestCorrect = false;
            setJustificationError((prevRequestError) => ({
                ...prevRequestError,
                errorNeed: "Change is required!",
            }));
        }

        // Check if request effect is empty
        if (isEmpty(requestSecurity)) {
            isRequestCorrect = false;
            setJustificationError((prevRequestError) => ({
                ...prevRequestError,
                errorSecurity: "Effect is required!",
            }));
        }

        // Check if request accessibility is empty
        if (isEmpty(requestAccessibility)) {
            isRequestCorrect = false;
            setJustificationError((prevRequestError) => ({
                ...prevRequestError,
                errorAccessibility: "Accessibility is required!",
            }));
        }

        // Check if request backout is empty
        if (isEmpty(requestBackout)) {
            isRequestCorrect = false;
            setAssessmentError((prevAssessmentError) => ({
                ...prevAssessmentError,
                errorBackout: "Backout Plan is required!",
            }));
        }

        // Check if request configuration is empty
        if (isEmpty(requestConfiguration)) {
            isRequestCorrect = false;
            setAssessmentError((prevAssessmentError) => ({
                ...prevAssessmentError,
                errorConfiguration: "Configuration is required!",
            }));
        }

        // Check if request environment is empty
        if (isEmpty(requestEnvironment)) {
            isRequestCorrect = false;
            setAssessmentError((prevAssessmentError) => ({
                ...prevAssessmentError,
                errorEnvironment: "Environment is required!",
            }));
        }

        // Check if request environment maturity is empty
        if (isEmpty(requestMaturity)) {
            isRequestCorrect = false;
            setAssessmentError((prevAssessmentError) => ({
                ...prevAssessmentError,
                errorMaturity: "Environment Maturity is required!",
            }));
        }

        // Check if request redundancy is empty
        if (isEmpty(requestRedundancy)) {
            isRequestCorrect = false;
            setAssessmentError((prevAssessmentError) => ({
                ...prevAssessmentError,
                errorRedundancy: "Redundancy is required!",
            }));
        }

        // Check if request time to implement is empty
        if (isEmpty(requestImplement)) {
            isRequestCorrect = false;
            setAssessmentError((prevAssessmentError) => ({
                ...prevAssessmentError,
                errorImplement: "Time to Implement is required!",
            }));
        }

        // Check if request deployment window is empty
        if (isEmpty(requestDeployment)) {
            isRequestCorrect = false;
            setAssessmentError((prevAssessmentError) => ({
                ...prevAssessmentError,
                errorDeployment: "Deployment Window is required!",
            }));
        }

        // Check if request change history is empty
        if (isEmpty(requestHistory)) {
            isRequestCorrect = false;
            setAssessmentError((prevAssessmentError) => ({
                ...prevAssessmentError,
                errorHistory: "Change History is required!",
            }));
        }

        // Check if request number of staff/teams is empty
        if (isEmpty(requestMember)) {
            isRequestCorrect = false;
            setAssessmentError((prevAssessmentError) => ({
                ...prevAssessmentError,
                errorMember: "Num. of Staff/Teams is required!",
            }));
        }

        // Check if request pre-production testing is empty
        if (isEmpty(requestProduction)) {
            isRequestCorrect = false;
            setAssessmentError((prevAssessmentError) => ({
                ...prevAssessmentError,
                errorProduction: "Pre-Production Testing is required!",
            }));
        }

        // Check if request change scheduling is empty
        if (isEmpty(requestSchedule)) {
            isRequestCorrect = false;
            setAssessmentError((prevAssessmentError) => ({
                ...prevAssessmentError,
                errorSchedule: "Change of Scheduling is required!",
            }));
        }

        // Check if install plan description is empty
        if (isEmpty(requestInstallDescription)) {
            isRequestCorrect = false;
            setInstallError((prevInstallError) => ({
                ...prevInstallError,
                errorDescription: "Description is required!",
            }));
        }

        // Check if back out plan description is empty
        if (isEmpty(requestBackDescription)) {
            isRequestCorrect = false;
            setBackOutError((prevBackError) => ({
                ...prevBackError,
                errorDescription: "Description is required!",
            }));
        }

        return isRequestCorrect;
    }

    /**
     * Checks if input field is empty, undefined or null.
     * 
     * @param {Input Field value} data 
     * @returns True if empty, false if not.
     */
    function isEmpty(data) {
        let dataEmpty = false;

        if (data === null || data === "" || data === undefined) {
            dataEmpty = true;
        }

        return dataEmpty;
    }

    /**
     * Post Change Request data to the change request table.
     */
    function postChangeRequest(justificationId, assessmentId, installPlanId, backoutPlanId) {
        axios({
            method: "POST",
            url: "/api/requestData/",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            data: {
                // Status set to 1 by default
                status: 1,
                requestType: requestType,
                assets: relatedAsset,
                requestName: requestDetails.requestName,
                projectName: requestDetails.projectName,
                requestOwnerSection: currentUserSection,
                assignedTo: requestDetails.assignedTo,
                ownerId: currentUserId,
                requestedById: requestDetails.requestedBy,
                department: requestDetails.department,
                requestContact: requestDetails.requestContact,
                impact: Number.parseInt(requestDetails.impact),
                urgency: Number.parseInt(requestDetails.urgency),
                priority: Number.parseInt(requestDetails.priority),
                description: requestDetails.description,
                requestNumber: Number.parseInt(requestId),
                business_justification: justificationId,
                risk_assesment: assessmentId,
                install_plan: installPlanId,
                backout_plan: backoutPlanId,
                requestDateTime: (new Date(currentDate.toISOString())),
            },
        })
            .then(() => {
                window.location.href = "/change/all";
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    console.log(requestDetails);
                    console.log(justificationId);
                    console.log(assessmentId);
                    console.log(installPlanId);
                    console.log(backoutPlanId);
                    console.log(relatedAsset);
                    console.log(requestId);
                    console.log(Number.parseInt(requestId));
                }
            });
    }


    /**
     * Post Business Justification data to the Business Justification table.
     */
    function postChangeBusinessJustification() {
        axios({
            method: "POST",
            url: "/api/businessData/",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            data: {
                start_date: justificationDetails.startDate,
                end_date: justificationDetails.endDate,
                purpose: justificationDetails.purpose,
                need: justificationDetails.need,
                duration: justificationDetails.security,
                accessibility: justificationDetails.accessibility,
            },
        })
            .then((response) => {
                const justificationId = response.data.id;

                postChangeRiskAssessment(justificationId);
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            });
    }

    /**
     * Post Risk Assessment data to the Risk Assessment table.
     */
    function postChangeRiskAssessment(justificationId) {
        axios({
            method: "POST",
            url: "/api/assessmentData/",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            data: {
                backout_plan: assessmentDetails.backout,
                doc_config: assessmentDetails.configuration,
                enviroment: assessmentDetails.environment,
                enviroment_maturity: assessmentDetails.maturity,
                redundancy: assessmentDetails.redundancy,
                time_to_implement: assessmentDetails.implement,
                deployment_window: assessmentDetails.deployment,
                change_history: assessmentDetails.history,
                num_of_staff: assessmentDetails.member,
                testing: assessmentDetails.production,
                scheduling: assessmentDetails.schedule,
            },
        })
            .then((response) => {
                const assessmentId = response.data.id;

                postChangeInstall(justificationId, assessmentId);
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            });
    }

    /**
     * Post Install Plan data to the Install Plan table.
     */
    function postChangeInstall(justificationId, assessmentId) {
        axios({
            method: "POST",
            url: "/api/installPlanData/",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            data: {
                description: installDetails.description,
            },
        })
            .then((response) => {
                const installPlanId = response.data.id;

                postChangeBackOut(justificationId, assessmentId, installPlanId);
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            });
    }

    /**
     * Posts Backout Plan data to the Backout Plan table.
     */
    function postChangeBackOut(justificationId, assessmentId, installPlanId) {
        axios({
            method: "POST",
            url: "/api/backoutPlanData/",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            data: {
                description: installDetails.description,
            },
        })
            .then((response) => {
                const backoutPlanId = response.data.id;

                postChangeRequest(justificationId, assessmentId, installPlanId, backoutPlanId);
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            });
    }

    return (
        <>
            {loading || post ? (
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
                                <Typography variant="h4" fontWeight="bold" color="#525252" align='center' pb={5}>New Change Request</Typography>

                                <Box pb={5} sx={{ width: "100%" }}>
                                    <Stepper alternativeLabel activeStep={Number(1) - 1}>
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
                                            <FormControl error={typeError} sx={{ m: 0, minWidth: 300 }} variant="filled">
                                                <InputLabel id="RequestType">
                                                    Request Type
                                                </InputLabel>

                                                <Select
                                                    name="requestType"
                                                    label="Request Type"
                                                    onChange={(event) => {
                                                        setRequestType(event.target.value);
                                                    }}
                                                    id="demo-simple-select-helper"
                                                    labelId="demo-simple-select-helper-label"
                                                    defaultValue={''}
                                                >
                                                    <MenuItem key={1} value={"None"}>None</MenuItem>
                                                    <MenuItem key={2} value={"Standard"}>Standard</MenuItem>
                                                    <MenuItem key={3} value={"Normal"}>Normal</MenuItem>
                                                    <MenuItem key={4} value={"Major"}>Major</MenuItem>
                                                    <MenuItem key={5} value={"Emergency"}>Emergency</MenuItem>
                                                </Select>
                                                <FormHelperText>{typeError}</FormHelperText>
                                            </FormControl>
                                        </Grid>

                                        <Grid item xs={1} />
                                    </Grid>
                                </Box>

                                <SelectedAsset onSelectAssetChange={handleSelectAssetChange} />
                                <br />

                                <RequestDetails
                                    requestId={requestId}
                                    onRequestAssignChange={handleRequestAssignChange}
                                    onRequestRequestedByChange={handleRequestRequestedByChange}
                                    onRequestDetailsChange={handleRequestDetailsChange}
                                    onPriorityChange={handlePriorityChange}
                                    errorRequestDetails={requestError}
                                    priorityValue={requestDetails.priority}
                                />
                                <br />

                                <BusinessJustification
                                    startDateTime={handleStartDateChange}
                                    endDateTime={handleEndDateChange}
                                    currentStartDate={justificationDetails.startDate}
                                    currentEndDate={justificationDetails.endDate}
                                    onRequestJustificationChange={handleRequestJustificationChange}
                                    errorJustificationDetails={justificationError}
                                />
                                <br />

                                <RiskAssessment
                                    onRequestAssessmentChange={handleAssessmentChange}
                                    errorAssessmentDetails={assessmentError}
                                />
                                <br />

                                <InstallPlan
                                    onRequestInstallChange={handleInstallPlanChange}
                                    errorInstallPlan={installError}
                                />
                                <br />

                                <BackOutPlan
                                    onRequestBackChange={handleBackOutPlanChange}
                                    errorBackPlan={backOutError}
                                />

                                <Box pt={5} textAlign="center">
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        onClick={validateInfo}
                                    >
                                        Submit
                                    </Button>
                                </Box>
                            </Box>

                            {error ? (
                                <Alert severity="error" sx={{ justifyContent: 'center', py: "2vh" }}>
                                    <AlertTitle>Error</AlertTitle>
                                    <strong>{error}</strong>
                                </Alert>
                            ) : null}
                        </Paper>
                    </Grid>

                    <Grid item xs={2} />
                </Grid>
            )}
        </>
    )
}

export default CreateRequestForm;