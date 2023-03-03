import React, { useState, useEffect } from "react";

import axios from "axios";
import "../../layouts/preloader3.css";

import { useNavigate } from "react-router-dom";
import EditAssetDetails from './Details/EditAssetDetails';
import EditDependencies from './Dependency/EditDependencies';
import EditLicenseInformation from './License/EditLicenseInformation';

import {
    Box,
    Grid,
    Alert,
    Paper,
    Button,
    AlertTitle,
    Typography,
} from "@mui/material";

function EditAssetForm({ id, licenseId, asset, license }) {
    let navigate = useNavigate();
    const currentDate = new Date();
    const [post, setPost] = useState(false);

    const [error, setError] = useState("");
    const token = sessionStorage.getItem("access");
    
    const currentUserId = sessionStorage.getItem("userId");
    const currentUserRoleId = sessionStorage.getItem("roleId");
    const currentUserSection = sessionStorage.getItem("section");

    // /**
    //  * Verifies if the current user is admin, student, instructor, etc. and 
    //  * has permissions to edit the specified asset ticket.
    //  */
    // const verifyUser = () => {
    //     console.log(asset);

    //     let editAssetUser = asset.createdBy;
    //     let editAssetRole = asset.assetOwnerRole;
    //     let editAssetSection = asset.assetOwnerSection;

    //     // Instructor
    //     if (currentUserRoleId === "3") {
    //         // Instructor is editing another admin/technician/instructor/student request ticket from a different section.
    //         if (currentUserSection !== editAssetSection && (editAssetRole === 1 || editAssetRole === 2 || editAssetRole === 3 || editAssetRole === 4)) {
    //             navigate("/asset/all");
    //         }
    //     }

    //     // Student
    //     if (currentUserRoleId === "4") {
    //         // Student is editing another admin/technician/instructor/student request ticket from a different section.
    //         if (currentUserSection !== editAssetSection && (editAssetRole === 1 || editAssetRole === 2 || editAssetRole === 3 || editAssetRole === 4)) {
    //             navigate("/asset/all");
    //         }

    //         // Student is editing another student's from the same section
    //         if (currentUserSection === editAssetSection && (Number.parseInt(currentUserId) !== editAssetUser || editAssetRole === 3)) {
    //             navigate("/asset/all");
    //         }
    //     }
    // }

   
    const [assetDetails, setAssetDetails] = useState({
        id: asset.id,
        assetNumber: asset.asset_number,
        serialNumber: asset.serial_number,
        assetName: asset.asset_name,
        category: asset.category,
        ipAddress: asset.ip_address,
        status: asset.status,
        assignedTo: asset.assignedTo,
        location: asset.location,
        owner: asset.user_id,
        assetResources: asset.asset_resources,
        description: asset.description,
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
        vendorName: license.vendor_name,
        currentVersion: license.current_version,
        productName: license.product_name,
        vendorSupport: license.vendor_support,
        licenseName: license.license_name,
        licenseType: license.license_type,
        startDate: license.start_date,
        endDate: license.end_date,
        licenseCost: license.license_cost,
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

    const [dependencyList, setDependencyList] = useState(asset.asset_dependencies);

    /**
     * Redirects user back to the asset list.
     */
    const routeChangeBack = () => {
        let path = "/asset/all";

        navigate(path);
    };

    /*** Handles change events from the child components of the form ***/
    /**
     * Handles changes in the Asset Details Input Fields.
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
            category: newValue.props.value,
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
            status:  newValue.props.value,
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
     * Handles changes in the License Input Fields.
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
     * Handles changes in the Start Date Input Field.
     * @param {*} event 
     */
    function handleStartDateChange(event) {
        setLicenseInfo((prevLicenseDetails) => ({
            ...prevLicenseDetails,
            startDate: event,
        }));
    }

    /**
     * Handles changes in the End Date Input Field.
     * @param {*} event 
     */
    function handleEndDateChange(event) {
        setLicenseInfo((prevLicenseDetails) => ({
            ...prevLicenseDetails,
            endDate: event,
        }));
    }

    /**
     * Handles changes in the Asset Dependencies.
     * 
     * @param {*} event 
     */
    function handleDependenciesChange(dependencies) {
        setDependencyList(dependencies);
        if(dependencies.length < 1){
            setDependencyList([0]);
        }
    }

    /**
     * Validates the form for all input fields.
     */
    function validateInfo(e) {
        hideAllErrors();

        if (!isValidate()) {
            e.preventDefault();
            setError("An error Has occurred! Please check for any errors on the form and try again.");
        } else {
            updateAssetDetails();
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
        let detailAssetNumber = assetDetails.assetNumber;
        let detailSerialNumber = assetDetails.serialNumber;
        let detailAssetName = assetDetails.assetName;
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
     * PATCHes new given inputs into specified row on the Asset table.
     */
    function updateAssetDetails() {
        axios({
            method: "PATCH",
            url: `/api/assetData/${id}/`,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            data: {
                serial_number: assetDetails.serialNumber,
                asset_name: assetDetails.assetName,
                category: assetDetails.category,
                ip_address: assetDetails.ipAddress,
                status: assetDetails.status,
                assignedTo: assetDetails.assignedTo,
                user_id: assetDetails.owner,
                location: assetDetails.location,
                asset_resources: assetDetails.assetResources,
                description: assetDetails.description,
                asset_dependencies: dependencyList
            },
        })
            .then(() => {
                // console.log(assetDetails);
                // console.log(dependencyList);
                updateAssetLicense();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    /**
     * PATCHes new given inputs into specified row on the License table.
     */
    function updateAssetLicense() {
        axios({
            method: "PATCH",
            url: `/api/licenseData/${licenseId}/`,
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
            .then(() => {
                routeChangeBack();
            })
            .catch((error) => {
                console.log(error);
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
                                <Typography
                                    variant="h4"
                                    align="center"
                                    color="#525252"
                                    fontWeight="bold"
                                    pb={5}
                                >
                                    Edit Asset
                                </Typography>

                                <EditAssetDetails
                                    detail={assetDetails}
                                    onAssetDetailsChange={handleAssetDetailsChange}
                                    onAssetDetailCategoryChange={handleAssetDetailsCategoryChange}
                                    onAssetDetailStatusChange={handleAssetDetailsStatusChange}
                                    onAssetDetailAssignedToChange={handleAssetDetailsAssignedToChange}
                                    onAssetDetailOwnerChange={handleAssetDetailsOwnerChange}
                                    errorAssetDetails={detailError}
                                />
                                <br/>

                                <EditLicenseInformation
                                    license={licenseInfo}
                                    onLicenseInfoChange={handleLicenseInfoChange}
                                    startDateTime={handleStartDateChange}
                                    endDateTime={handleEndDateChange}
                                    errorAssetLicense={licenseError}
                                />
                                <br/>

                                <EditDependencies
                                    dependency={asset.asset_dependencies}
                                    onSelectionModelChange={handleDependenciesChange}
                                />

                                <Box pt={2} />

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
                                        style={{ margin: "20px" }}
                                        onClick={routeChangeBack}
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

export default EditAssetForm;