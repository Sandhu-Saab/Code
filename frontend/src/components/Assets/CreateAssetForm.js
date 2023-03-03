import React, { useState, useEffect } from "react";

import axios from "axios";
import "../../layouts/preloader3.css";

import AssetDetails from "./Details/AssetDetails";
import Dependencies from "./Dependency/Dependencies";
import LicenseInformation from "./License/LicenseInformation";

import {
    Box,
    Grid,
    Alert,
    Paper,
    Button,
    AlertTitle,
    Typography,
} from "@mui/material";

/**
 * Returns the new asset form to create a new asset ticket.
 * 
 * @returns The new asset form to create a new asset ticket.
 */
function CreateAssetForm() {
    const currentDate = new Date();
    const [post, setPost] = useState(false);
    const [assetId, setAssetId] = useState("");
    const [counter, setCounter] = useState(0);
    const [open, setOpen] = useState(true);    

    const [assetDetails, setAssetDetails] = useState({
        serialNumber: "",
        name: "",
        category: "",
        ipAddress: "",
        status: "",
        assignedTo: "",
        location: "",
        owner: "",
        assetResources: "",
        description: "",
    });

    const [detailError, setDetailError] = useState({
        errorSerial: "",
        errorName: "",
        errorCategory: "",
        errorIP: "",
        errorStatus: "",
        errorAssign: "",
        errorLocation: "",
        errorOwner: "",
        errorResource: "",
        errorDescription: "",
    });

    const [licenseInfo, setLicenseInfo] = useState({
        vendorName: "",
        currentVersion: "",
        productName: "",
        vendorSupport: "",
        licenseName: "",
        licenseType: "",
        startDate: (new Date(currentDate.toISOString())),
        endDate: (new Date(currentDate.toISOString())),
        licenseCost: "",
    });

    const [licenseError, setLicenseError] = useState({
        errorVendor: "",
        errorVersion: "",
        errorProduct: "",
        errorSupport: "",
        errorName: "",
        errorType: "",
        errorStart: "",
        errorEnd: "",
        errorCost: "",
    });

    const [dependencyList, setDependencyList] = useState([0]);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const token = sessionStorage.getItem("access");
    const currentUserId = sessionStorage.getItem("userId");
    const currentUserRole = sessionStorage.getItem("roleId");
    const currentUserSection = sessionStorage.getItem("section");


    /*** Handles change events from the child components of the form ***/
    /**
     * Handles the Asset Details Input Fields.
     * 
     * @param {*} event 
     */
    function handleAssetDetailsChange(event) {
        const { value, name } = event.target;

        setAssetDetails((prevAssetDetails) => ({
            ...prevAssetDetails,
            [name]: value,
        }));
    }

    /**
     * Handles changes in the Category Input Field
     * @param {*} event 
     * @param {*} newValue 
     */
    function handleAssetDetailsCategoryChange(event, newValue) {
        setAssetDetails((prevAssetDetails) => ({
            ...prevAssetDetails,
            category: newValue,
        }));
    }

    /**
     * Handles changes in the Status Input Field
     * @param {*} event 
     * @param {*} newValue 
     */
    function handleAssetDetailsStatusChange(event, newValue) {
        setAssetDetails((prevAssetDetails) => ({
            ...prevAssetDetails,
            status: newValue.asset_status_id,
        }));
    }
    
    /**
     * Handles changes in the Assigned To Input Field
     * @param {*} event 
     * @param {*} newValue 
     */
    function handleAssetDetailsAssignedToChange(event, newValue) {
        setAssetDetails((prevAssetDetails) => ({
            ...prevAssetDetails,
            assignedTo: newValue.id,
        }));
    }

    /**
     * Handles changes in the Owner Input Field
     * @param {*} event 
     * @param {*} newValue 
     */
    function handleAssetDetailsOwnerChange(event, newValue) {
        setAssetDetails((prevAssetDetails) => ({
            ...prevAssetDetails,
            owner: newValue.id,
        }));
    }

    /**
     * Handles the License Information Input Fields.
     * 
     * @param {*} event 
     */
    function handleLicenseInfoChange(event) {
        const { value, name } = event.target;

        setLicenseInfo((prevLicenseDetails) => ({
            ...prevLicenseDetails,
            [name]: value,
        }));
    }

    /**
     * Handles changes in the Start Date Input Field
     * @param {*} event 
     */
    function handleStartDateChange(event) {
        setLicenseInfo((prevLicenseDetails) => ({
            ...prevLicenseDetails,
            startDate: event,
        }));
    }

    /**
     * Handles changes in the End Date Input Field
     * @param {*} event 
     */
    function handleEndDateChange(event) {
        setLicenseInfo((prevLicenseDetails) => ({
            ...prevLicenseDetails,
            endDate: event,
        }));
    }

    /**
     * Handles the Asset Dependencies.
     * 
     * @param {*} event 
     */
    function handleDependenciesChange(dependencies) {
        setDependencyList(dependencies);
        // console.log(dependencies);

        if(dependencies.length < 1){
            setDependencyList([0]);
            // console.log("Used");
        }

    }

    /**
     * Gets all current assets to determine the next asset's asset_number value.
     */
    function getAssetId() {
        axios({
            method: "GET",
            url: "/api/assetData/",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                const data = response.data;

                let maxId = setNextAssetNumber(data);

                setAssetId(maxId);
                setLoading(false);
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
     * Calculates the next asset_number based on the given assets.
     * 
     * @param {All Assets fetched from the database} data 
     * @return The next asset_number value
     */
    function setNextAssetNumber(data) {
        let maxArray = [];

        for (let i = 0; i < data.length; i++) {
            maxArray.push(data[i].asset_number);
        }

        let maxId = Math.max(...maxArray) + 1;

        if (maxId === -Infinity) {
            maxId = 1;
        }
 
        return maxId;
    }

    useEffect(() => {
        getAssetId();
    }, []);

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
            postAssetLicense();
            setPost(true);
        }
    }

    /**
     * Hides all error messages.
     */
    function hideAllErrors() {
        setError("");
        setDetailError("");
        setLicenseError("");
    }

    /**
     * Validates all input fields.
     */
    function isValidate() {
        let isAssetCorrect = true;

        // Asset Details
        let detailSerialNumber = assetDetails.serialNumber;
        let detailAssetName = assetDetails.name;
        let detailCategory = assetDetails.category;
        let detailIpAddress = assetDetails.ipAddress;
        let detailStatus = assetDetails.status;
        let detailAssigned = assetDetails.assignedTo;
        let detailLocation = assetDetails.location;
        let detailOwner = assetDetails.owner;
        let detailResources = assetDetails.assetResources;
        let detailDescription = assetDetails.description;

        // Asset License
        let licenseVendor = licenseInfo.vendorName;
        let licenseProduct = licenseInfo.productName;
        let licenseVersion = licenseInfo.currentVersion;
        let licenseSupport = licenseInfo.vendorSupport;
        let licenseName = licenseInfo.licenseName;
        let licenseType = licenseInfo.licenseType;
        let licenseStart = licenseInfo.startDate;
        let licenseEnd = licenseInfo.endDate;
        let licenseCost = licenseInfo.licenseCost;
        
        /**
         * Valid IP Address:
         * https://stackoverflow.com/questions/4460586/javascript-regular-expression-to-check-for-ip-addresses
         */
        let validIpAddress = new RegExp(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/);

        // Check if serial number is empty.
        if (isEmpty(detailSerialNumber)) {
            isAssetCorrect = false;
            setDetailError((prevDetailErrors) => ({
                ...prevDetailErrors,
                errorSerial: "Serial Number is required!",
            }));
        }

        // Check if serial is not a number and is not empty.
        if (isNaN(Number.parseInt(detailSerialNumber)) && !isEmpty(detailSerialNumber)) {
            isAssetCorrect = false;
            setDetailError((prevDetailErrors) => ({
                ...prevDetailErrors,
                errorSerial: "Serial Number is not valid!",
            }));
        }

        // Check if asset name is empty
        if (isEmpty(detailAssetName)) {
            isAssetCorrect = false;
            setDetailError((prevDetailErrors) => ({
                ...prevDetailErrors,
                errorName: "Asset Name is required!",
            }));
        }

        // Check if category is empty
        if (isEmpty(detailCategory)) {
            isAssetCorrect = false;
            setDetailError((prevDetailErrors) => ({
                ...prevDetailErrors,
                errorCategory: "Category is required!",
            }));
        }

        // Check if ip address is empty
        if (isEmpty(detailIpAddress)) {
            isAssetCorrect = false;
            setDetailError((prevDetailErrors) => ({
                ...prevDetailErrors,
                errorIP: "IP Address is required!",
            }));
        }

        // Check if ip address is valid
        if (!validIpAddress.test(detailIpAddress)) {
            isAssetCorrect = false;
            setDetailError((prevDetailErrors) => ({
                ...prevDetailErrors,
                errorIP: "IP Address is not valid!",
            }));
        }

        // Check if status is empty
        if (isEmpty(detailStatus)) {
            isAssetCorrect = false;
            setDetailError((prevDetailErrors) => ({
                ...prevDetailErrors,
                errorStatus: "Status is required!",
            }));
        }

        // Check if assigned to is empty
        if (isEmpty(detailAssigned)) {
            isAssetCorrect = false;
            setDetailError((prevDetailErrors) => ({
                ...prevDetailErrors,
                errorAssign: "Assigned To Asset is required!",
            }));
        }

        // Check if location to is empty
        if (isEmpty(detailLocation)) {
            isAssetCorrect = false;
            setDetailError((prevDetailErrors) => ({
                ...prevDetailErrors,
                errorLocation: "Location is required!",
            }));
        }

        // Check if owner to is empty
        if (isEmpty(detailOwner)) {
            isAssetCorrect = false;
            setDetailError((prevDetailErrors) => ({
                ...prevDetailErrors,
                errorOwner: "Owner To Asset is required!",
            }));
        }

        // Check if resources to is empty
        if (isEmpty(detailResources)) {
            isAssetCorrect = false;
            setDetailError((prevDetailErrors) => ({
                ...prevDetailErrors,
                errorResource: "Asset Resources is required!",
            }));
        }

        // Check if description to is empty
        if (isEmpty(detailDescription)) {
            isAssetCorrect = false;
            setDetailError((prevDetailErrors) => ({
                ...prevDetailErrors,
                errorDescription: "Description is required!",
            }));
        }

        // Check if vendor to is empty
        if (isEmpty(licenseVendor)) {
            isAssetCorrect = false;
            setLicenseError((prevDetailErrors) => ({
                ...prevDetailErrors,
                errorVendor: "Vendor Name is required!",
            }));
        }   

        // Check if product to is empty
        if (isEmpty(licenseProduct)) {
            isAssetCorrect = false;
            setLicenseError((prevDetailErrors) => ({
                ...prevDetailErrors,
                errorProduct: "Product Name is required!",
            }));
        }

        // Check if license version to is empty
        if (isEmpty(licenseVersion)) {
            isAssetCorrect = false;
            setLicenseError((prevDetailErrors) => ({
                ...prevDetailErrors,
                errorVersion: "Asset Version is required!",
            }));
        }

        // Check if license version to is valid
        if (isNaN(licenseVersion) && !isEmpty(licenseVersion)) {
            isAssetCorrect = false;
            setLicenseError((prevDetailErrors) => ({
                ...prevDetailErrors,
                errorVersion: "Asset Version is not valid!",
            }));
        }

        // Check if support to is empty
        if (isEmpty(licenseSupport)) {
            isAssetCorrect = false;
            setLicenseError((prevDetailErrors) => ({
                ...prevDetailErrors,
                errorSupport: "Asset Support is required!",
            }));
        }

        // Check if license name to is empty
        if (isEmpty(licenseName)) {
            isAssetCorrect = false;
            setLicenseError((prevDetailErrors) => ({
                ...prevDetailErrors,
                errorName: "License Name is required!",
            }));
        }

        // Check if license type to is empty
        if (isEmpty(licenseType)) {
            isAssetCorrect = false;
            setLicenseError((prevDetailErrors) => ({
                ...prevDetailErrors,
                errorType: "License Type is required!",
            }));
        }

        // Check if end date is greater than start date to is empty
        if (licenseEnd < licenseStart) {
            isAssetCorrect = false;
            setLicenseError((prevDetailErrors) => ({
                ...prevDetailErrors,
                errorEnd: "End Date cannot be less then start date!",
            }));
        }

        // Check if license cost to is empty
        if (isEmpty(licenseCost)) {
            isAssetCorrect = false;
            setLicenseError((prevDetailErrors) => ({
                ...prevDetailErrors,
                errorCost: "License Cost is required!",
            }));
        }

        return isAssetCorrect;
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
     * POSTs all inputs into the Asset table.
     */
    function postAssetDetails(licenseId) {
        axios({
            method: "POST",
            url: "/api/assetData/",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            data: {
                asset_number: assetId,
                serial_number: assetDetails.serialNumber,
                asset_name: assetDetails.name,
                category: assetDetails.category,
                ip_address: assetDetails.ipAddress,
                status: assetDetails.status,
                assignedTo: assetDetails.assignedTo,
                user_id: assetDetails.owner,
                location: assetDetails.location,
                asset_resources: assetDetails.assetResources,
                description: assetDetails.description,
                createdBy: currentUserId,
                asset_dependencies: dependencyList,
                course: currentUserSection,
                license_id: licenseId

            },
        })
            .then(() => {
                window.location.href = "/asset/all";
            })
            .catch((error) => {
                console.log(error);
                // console.log(assetDetails);
                // console.log(dependencyList);
                // console.log(currentUserSection);
                // console.log(assetId);
            });

    }

    /**
     * POSTs all inputs into License table.
     */
    function postAssetLicense() {
        axios({
            method: "POST",
            url: "/api/licenseData/",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            data: {
                vendor_name: licenseInfo.vendorName,
                product_name: licenseInfo.productName,
                current_version: licenseInfo.currentVersion,
                vendor_support: licenseInfo.vendorSupport,
                license_name: licenseInfo.licenseName,
                license_type: licenseInfo.licenseType,
                start_date: licenseInfo.startDate,
                end_date: licenseInfo.endDate,
                license_cost: licenseInfo.licenseCost
            },
        })
            .then((response) => {
                const licenseId = response.data.id;

                postAssetDetails(licenseId);
            })
            .catch((error) => {
                console.log(error);
            });
    }


    return (
        <>
        
            {loading || post ? (
                <div className="spinner">
                  <>
                    <span>Loading. . .</span>
                    <div className="half-spinner"></div>
                  </>
              </div>
            ) : (
                <Grid container spacing={2}>
                    <Grid item xs={2} />

                    <Grid item xs={8}>
                        <Paper elevation={10}>
                            <Box p={4}>
                                <Typography
                                    variant="h4"
                                    fontWeight="bold"
                                    color="#525252"
                                    align="center"
                                    pb={5}
                                >
                                    New Asset
                                </Typography>

                                <AssetDetails
                                    onAssetDetailsChange={handleAssetDetailsChange}
                                    onAssetDetailCategoryChange={handleAssetDetailsCategoryChange}
                                    onAssetDetailStatusChange={handleAssetDetailsStatusChange}
                                    onAssetDetailAssignedToChange={handleAssetDetailsAssignedToChange}
                                    onAssetDetailOwnerChange={handleAssetDetailsOwnerChange}
                                    assetId={assetId}
                                    errorAssetDetails={detailError}
                                />
                                <br />

                                <LicenseInformation
                                    onLicenseInfoChange={handleLicenseInfoChange}
                                    startDateTime={handleStartDateChange}
                                    endDateTime={handleEndDateChange}
                                    currentStartDate={licenseInfo.startDate}
                                    currentEndDate={licenseInfo.endDate}
                                    errorAssetLicense={licenseError}
                                />
                                <br />

                                <Dependencies onDependenciesChange={handleDependenciesChange} token={token} />

                                <Box pt={2} />

                                <Box pt={2} textAlign="center">
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

export default CreateAssetForm;