import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ViewAssetDetails from "./Details/ViewAssetDetails";
import ViewDependencies from "./Dependency/ViewDependencies";
import ViewLicenseInformation from "./License/ViewLicenseInformation";
import { Box, Paper, Grid, Typography, Button } from "@mui/material";

/**
 * Returns the Asset View Form page.
 * 
 * @param {Asset Data object used to view the specific asset ID.} param0 
 * @returns The Asset View Form page.
 */
function ViewAssetForm({ id, asset }) {
    let navigate = useNavigate(); 

    const currentUserId = sessionStorage.getItem("userId");
    const currentUserRoleId = sessionStorage.getItem("roleId");
    const currentUserSection = sessionStorage.getItem("section");

    /**
     * Verifies if the current user is admin, student, instructor, etc. and 
     * has permissions to view the specified asset ticket.
     */
    // const verifyUser = () => {
    //     let viewAssetUser = asset.user_id;
    //     let viewAssetRole = asset.assetOwnerRole;
    //     let viewAssetSection = asset.course;
        
    //     // Instructor
    //     if (currentUserRoleId === "3") {
    //         // Instructor is viewing another instructor/student asset ticket from a different section.
    //         if (currentUserSection !== viewAssetSection && (viewAssetRole === 3 || viewAssetRole === 4)) {
    //             navigate("/asset/all");
    //         }
    //     }

    //     // Student
    //     if (currentUserRoleId === "4") {
    //         // Student is viewing another /instructor/student asset ticket from a different section.
    //         if (currentUserSection !== viewAssetSection && (viewAssetRole === 3 || viewAssetRole === 4)) {
    //             navigate("/asset/all");
    //         }

    //         // Student is viewing another student's from the same section
    //         if (currentUserSection === viewAssetSection && Number.parseInt(currentUserId) !== viewAssetUser && viewAssetRole !== 3) {
    //             navigate("/asset/all");
    //         }
    //     }
    // }


    /**
     * Redirects user to the edit page.
     */
     const routeChangeEdit = () =>{ 
        let path = "/asset/edit?assetId=" + id + "&licenseId=" + asset.license_id;

        navigate(path);
    }   

    /**
     * Redirects user back to the asset list.
     */
     const routeChangeBack = () =>{ 
        let path = "/asset/all";

        navigate(path);
    }

    return (
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
                            View Asset
                        </Typography>

                        <ViewAssetDetails detail={asset} />
                        <br />

                        <ViewLicenseInformation license_id={asset.license_id} />
                        <br />

                        <ViewDependencies dependency={asset.asset_dependencies} />

                        <Box pt={2} />

                        <Box pt={5} textAlign="center">
                            {/* Instructor should be able to edit their own and students from their own section */}
                            {currentUserRoleId === '3' && (asset.assetOwnerRole === 4 || asset.createdBy.id === Number.parseInt(currentUserId)) && (
                                <Button
                                    type="submit"
                                    variant="contained"
                                    onClick={routeChangeEdit}
                                >
                                    Edit
                                </Button>
                            )}

                            {/* students should only be able to edit their own asset tickets */}
                            {currentUserRoleId === "4" && asset.createdBy.id === Number.parseInt(currentUserId) && (
                                <Button
                                    type="submit"
                                    variant="contained"
                                    onClick={routeChangeEdit}
                                >
                                    Edit
                                </Button>
                            )}

                            {/* Admin/Technician have full access */}
                            {currentUserRoleId !== "3" && currentUserRoleId !== "4" && (
                                <Button
                                    type="submit"
                                    variant="contained"
                                    onClick={routeChangeEdit}
                                >
                                    Edit
                                </Button>
                            )}

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
                </Paper>
            </Grid>

            <Grid item xs={2} />
        </Grid>
    )
}

export default ViewAssetForm;