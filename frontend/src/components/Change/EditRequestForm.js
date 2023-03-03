import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
    StepButton,
} from "@mui/material";
import EditSelectedAsset from "./Asset/EditSelectedAsset";
import EditRequestDetails from "./Request/EditRequestDetails";
import EditBusinessJustification from "./Justification/EditBusinessJustification";
import EditRiskAssessment from "./Assessment/EditRiskAssessment";
import EditInstallPlan from "./Install/EditInstallPlan";
import EditBackOutPlan from "./BackOut/EditBackOutPlan";

function EditRequestForm({ 
    id,
    request,
    justification,
    assessment,
    install,
    backout,
    }) {
    let navigate = useNavigate();
    const [post, setPost] = useState(false);
    let token = sessionStorage.getItem("access");

    const currentUserId = sessionStorage.getItem("userId");
    const currentUserRoleId = sessionStorage.getItem("roleId");
    const currentUserSection = sessionStorage.getItem("section");

    /**
     * Verifies if the current user is admin, student, instructor, etc. and 
     * has permissions to edit the specified request ticket.
     */
    const verifyUser = () => {
        let editRequestUser = request.createdBy;
        let editRequestRole = request.requestOwnerRole;
        let editRequestSection = request.requestOwnerSection;

        // Instructor
        if (currentUserRoleId === "3") {
            // Instructor is editing another admin/technician/instructor/student request ticket from a different section.
            if (currentUserSection !== editRequestSection && (editRequestRole === 1 || editRequestRole === 2 || editRequestRole === 3 || editRequestRole === 4)) {
                navigate("/change/all");
            }
        }

        // Student
        if (currentUserRoleId === "4") {
            // Student is editing another admin/technician/instructor/student request ticket from a different section.
            if (currentUserSection !== editRequestSection && (editRequestRole === 1 || editRequestRole === 2 || editRequestRole === 3 || editRequestRole === 4)) {
                navigate("/change/all");
            }

            // Student is editing another student's from the same section
            if (currentUserSection === editRequestSection && Number.parseInt(currentUserId) !== editRequestUser) {
                navigate("/change/all");
            }
        }
    }

    useEffect(() => {
        verifyUser();
    }, []);

    /*** Change Request useStates ***/
    const [error, setError] = useState("");

    const [activeStatus, setActiveStatus] = useState(Number(request.status) - 1);
    const [type, setType] = useState(request.type);

    const [relatedAssets, setRelatedAssets] = useState(request.assets);

    // Request Details Form
    const [requestDetails, setRequestDetails] = useState({
        requestName: request.requestName,
        requestNumber: request.requestNumber,
        projectName: request.projectName,
        assignedTo: request.assignedTo,
        requestedBy: request.requestedById,
        department: request.department,
        requestContact: request.requestContact,
        impact: request.impact,
        urgency: request.urgency,
        priority: request.priority,
        description: request.description,
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

    // Business Justification Form
    const [justificationDetails, setJustificationDetails] = useState({
        justificationId: justification.id,
        startDate: justification.startDate,
        endDate: justification.endDate,
        purpose: justification.purpose,
        need: justification.need,
        duration: justification.duration,
        accessibility: justification.accessibility,
    });

    const [justificationError, setJustificationError] = useState({
        errorStart: "",
        errorEnd: "",
        errorPurpose: "",
        errorNeed: "",
        errorDuration: "",
        errorAccessibility: "",
    });

    // Risk Assessment Form
    const [assessmentDetails, setAssessmentDetails] = useState({
        assessmentId: assessment.id,
        backout: assessment.backout_plan,
        configuration: assessment.doc_config,
        environment: assessment.enviroment,
        maturity: assessment.enviroment_maturity,
        redundancy: assessment.redundancy,
        implement: assessment.time_to_implement,
        deployment: assessment.deployment_window,
        history: assessment.change_history,
        member: assessment.num_of_staff,
        production: assessment.testing,
        schedule: assessment.scheduling,
    });

    // Install Plan
    const [installDetails, setInstallDetails] = useState({
        file: "",
        installId: install.id,
        description: install.description,
    });

    const [installError, setInstallError] = useState({
        errorFile: "",
        errorDescription: "",
    });

    // BackOut Plan
    const [backOutDetails, setBackOutDetails] = useState({
        file: "",
        backoutId: backout.id,
        description: backout.description,
    });
    
    const [backOutError, setBackOutError] = useState({
        errorFile: "",
        errorDescription: "",
    });
    
    /*** Change Request Handlers ***/
    function handleSelectAssetChange(selectedAssets) {
        setRelatedAssets(selectedAssets);
        if(selectedAssets.length < 1){
            setRelatedAssets([0]);
        }
    }

    /**
     * Handles changes to the request status input field.
     * 
     * @param {*} step 
     */
    const handleRequestStatusChange = (step) => () => {
        setActiveStatus(step);
    };

    /**
     * Handles changes to the request type input field.
     * 
     * @param {*} event 
     */
    function handleRequestTypeChange(event) {
        const { value, name } = event.target;

        setType(value);
    }

    /**
     * Handles changes to request detail input fields.
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
     * Handles changes to the Assigned To input field.
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
     * Handles changes to the Requested By input field.
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
     * Handles changes to Business Justification input fields.
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
     * Handles changes to the Start Date input field.
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
     * Handles changes to the End Date input field.
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
     * Handles changes to Risk Assessment input fields.
     * 
     * @param {*} name 
     * @param {*} value 
     */
    function handleAssessmentChange(name, value) {
        console.log(value);
        setAssessmentDetails((prevRequestAssessment) => ({
            ...prevRequestAssessment,
            [name]: value,
        }));
    }

    /**
     * Handles changes to Install Plan input fields.
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
     * Handles changes to Backout Plan input fields.
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
     * Redirects user back to the user list.
     */
    const routeChangeBack = () => {
        let path = "/change/all";

        navigate(path);
    };

    /**
     * Validates the form for all input fields.
     */
    function validateInfo(e) {
        hideAllErrors();

        if (!isValidate()) {
            e.preventDefault();
            setError("An error Has occurred! Please check for any errors on the form and try again.");
        } else {
            patchChangeRequest();
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
        setInstallError("");
        setBackOutError("");
    }

    /**
     * Validates all input fields.
     */
    function isValidate() {
        let isRequestCorrect = true;

        /// Request Details Form
        let requestProjectName = requestDetails.projectName;
        let requestRequestName = requestDetails.requestName;
        let requestDepartment = requestDetails.department;
        let requestContact = requestDetails.requestContact;
        let requestDescription = requestDetails.description;

        /// Request Justification Form
        let requestStart = justificationDetails.startDate;
        let requestEnd = justificationDetails.endDate;
        let requestPurpose = justificationDetails.purpose;
        let requestNeed = justificationDetails.need;
        let requestDuration = justificationDetails.duration;
        let requestAccessibility = justificationDetails.accessibility;

        // Request Install Plan
        let requestInstallDescription = installDetails.description;

        // Request Back Out Plan
        let requestBackDescription = backOutDetails.description;

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
        if (isEmpty(requestDuration)) {
            isRequestCorrect = false;
            setJustificationError((prevRequestError) => ({
                ...prevRequestError,
                errorDuration: "Effect is required!",
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
     * Patch Change Request data to the change request table.
     */
    function patchChangeRequest() {
        axios({
            method: "PATCH",
            url: `/api/requestData/${id}/`,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            data: {
                status: Number.parseInt(activeStatus) + 1,
                requestType: type,
                assets: relatedAssets,
                requestName: requestDetails.requestName,
                projectName: requestDetails.projectName,
                assignedTo: requestDetails.assignedTo,
                requestedBy: requestDetails.requestedBy,
                department: requestDetails.department,
                requestContact: requestDetails.requestContact,
                impact: Number.parseInt(requestDetails.impact),
                urgency: Number.parseInt(requestDetails.urgency),
                priority: Number.parseInt(requestDetails.priority),
                description: requestDetails.description,
            },
        })
            .then(() => {
                patchChangeBusinessJustification();
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    console.log(relatedAssets);
                }
            });
    }

    /**
     * Post Change Request data to the change request details table.
     */
    function patchChangeBusinessJustification() {
        axios({
            method: "PATCH",
            url: `/api/businessData/${justificationDetails.justificationId}/`,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            data: {
                start_date: justificationDetails.startDate,
                end_date: justificationDetails.endDate,
                purpose: justificationDetails.purpose,
                need: justificationDetails.need,
                duration: justificationDetails.duration,
                accessibility: justificationDetails.accessibility,
            },
        })
            .then(() => {
                patchChangeRiskAssessment();
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
     * Post Change Request data to the change request table.
     */
    function patchChangeRiskAssessment() {
        axios({
            method: "PATCH",
            url: `/api/assessmentData/${assessmentDetails.assessmentId}/`,
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
            .then(() => {
                patchChangeInstall();
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
     * Post Change Request data to the change request table.
     */
    function patchChangeInstall() {
        axios({
            method: "PATCH",
            url: `/api/installPlanData/${installDetails.installId}/`,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            data: {
                description: installDetails.description,
            },
        })
            .then(() => {
                patchChangeBackOut();
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
     * Post Change Request data to the change request table.
     */
    function patchChangeBackOut() {
        axios({
            method: "PATCH",
            url: `/api/backoutPlanData/${backOutDetails.backoutId}/`,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            data: {
                description: backOutDetails.description,
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
                }
            });
    }

    return (
        <>
            {post ? (
                <div className="spinner">
                    <span>Updating. . .</span>
                    <div className="half-spinner"></div>
                </div>
            ) : (
                <Grid container spacing={2}>
                    <Grid item xs={2} />

                    <Grid item xs={8}>
                        <Paper elevation={10}>
                            <Box p={4}>
                                <Typography variant="h4" fontWeight="bold" color="#525252" align='center' pb={5}>Edit Change Request</Typography>

                                <Box pb={5} sx={{ width: "100%" }}>
                                    <Stepper nonLinear alternativeLabel activeStep={activeStatus}>
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
                                            <FormControl sx={{ width: '100%' }} required>
                                                <InputLabel id="category">
                                                    Request Type
                                                </InputLabel>

                                                <Select
                                                    label="Request Type"
                                                    fullWidth
                                                    id="requestType"
                                                    labelId="requestType"
                                                    margin="dense"
                                                    displayEmpty
                                                    name="requestType"
                                                    variant="outlined"
                                                    onChange={handleRequestTypeChange}
                                                    defaultValue={request.requestType}
                                                >
                                                    <MenuItem key={1} value={"None"}>None</MenuItem>
                                                    <MenuItem key={2} value={"Standard"}>Standard</MenuItem>
                                                    <MenuItem key={3} value={"Normal"}>Normal</MenuItem>
                                                    <MenuItem key={4} value={"Major"}>Major</MenuItem>
                                                    <MenuItem key={5} value={"Emergency"}>Emergency</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>

                                        <Grid item xs={1} />
                                    </Grid>
                                </Box>

                                <EditSelectedAsset
                                    assets={relatedAssets}
                                    onSelectAssetChange={handleSelectAssetChange}
                                />
                                <br />

                                <EditRequestDetails
                                    detailsId={id}
                                    requestDetails={requestDetails}
                                    onRequestDetailsChange={handleRequestDetailsChange}
                                    onRequestAssignChange={handleRequestAssignChange}
                                    onRequestRequestedByChange={handleRequestRequestedByChange}
                                    onPriorityChange={handlePriorityChange}
                                    priorityValue={requestDetails.priority}
                                    errorRequestDetails={requestError}
                                />                   
                                <br />

                                <EditBusinessJustification
                                    id={id}
                                    justificationDetails={justificationDetails}
                                    startDateTime={handleStartDateChange}
                                    endDateTime={handleEndDateChange}
                                    onRequestJustificationChange={handleRequestJustificationChange}
                                    errorJustificationDetails={justificationError}
                                />
                                <br />

                                <EditRiskAssessment
                                    id={id}
                                    assessmentDetails={assessmentDetails}
                                    onRequestAssessmentChange={handleAssessmentChange}
                                />
                                <br />

                                <EditInstallPlan
                                    installDetails={installDetails}
                                    onRequestInstallChange={handleInstallPlanChange}
                                    errorInstallPlan={installError}
                                />
                                <br />

                                <EditBackOutPlan
                                    backOutDetails={backOutDetails}
                                    onRequestBackChange={handleBackOutPlanChange}
                                    errorBackPlan={backOutError}
                                />

                                <Box pt={2} textAlign="center">
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        onClick={validateInfo}
                                    >
                                        Update
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

export default EditRequestForm;