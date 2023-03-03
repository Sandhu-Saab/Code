import axios from "axios";
import React, { useState } from "react";

import {
    Alert,
    AlertTitle,
    Box,
    Paper,
    Grid,
    Avatar,
    TextField,
    Button,

} from "@mui/material";
import { isEmpty } from "../../Functions/FormValidator";
import { useNavigate } from "react-router-dom";

function EditSectionForm({ section }) {
    let navigate = useNavigate();
    document.title = `Edit Section #${section.id} - PiXELL-River`;

    let sectionId = section.id;
    let token = sessionStorage.getItem("access");

    const [currentSection, setCurrentSection] = useState({
        section: section.section
    })

    const [errorSectionMessage, setErrorSectionMessage] = useState("");

    /**
  * Handles the changes of the input fields.
  *
  * @param {*} event
  */
    function handleChange(event) {
        const { value, name } = event.target;
        setCurrentSection((prevUser) => ({
            // setEditUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    }

    /**
   * Validates the form for all input fields.
   */
    function validateInfo(e) {
        hideAllErrors();

        if (!isValidate()) {
            e.preventDefault();
        } else {
            updateSection();
        }
    }

    /**
   * Redirects user back to the user list.
   */
    const routeChangeBack = () => {

        navigate("/section/all");
    };

    function updateSection(event) {
        axios({
            method: "PATCH",
            url: `/api/editSingleCourseList/${sectionId}/`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            data: {
                section: currentSection.section,
            },
        })
            .then(() => {
                window.location.href = "../section/all";
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            });

        event.preventDefault();
    }

    /**
   * Hides all error messages.
   */
    function hideAllErrors() {
        setErrorSectionMessage("");
    }


    function isValidate() {
        let isUserCorrect = true;
        let currentSectionV = currentSection.section;

        if (isEmpty(currentSectionV)) {
            isUserCorrect = false;
            setErrorSectionMessage('Section name is required!');
        }

        return isUserCorrect;
    }

    return (<>
        <Grid container spacing={2}>
            <Grid item xs={2} />
            <Grid item xs={8}>
                <Box pb={6} />
                <Paper elevation={10}>
                    <form>
                        <Box pt={5} display="flex" justifyContent="center">
                            <Avatar src="../src/static/images/ogo.png"></Avatar>
                        </Box>

                        <Box textAlign="center">
                            <h3>Edit Section</h3>
                        </Box>

                        <Box sx={{ mx: "auto", mt: 5, width: 520 }}>
                            <TextField
                                required
                                autoFocus
                                id="section"
                                fullWidth
                                type="text"
                                margin="normal"
                                name="section"
                                variant="outlined"
                                label="Section name"
                                onChange={handleChange}
                                error={errorSectionMessage}
                                autoComplete="section"
                                helperText={errorSectionMessage}
                            />
                        </Box>

                        <Box pt={5} textAlign="center">
                            <Button
                                type="button"
                                color="primary"
                                variant="contained"
                                onClick={validateInfo}
                            >
                                Update
                            </Button>

                            <Button
                                type="button"
                                color="primary"
                                variant="contained"
                                style={{ margin: "20px" }}
                                onClick={routeChangeBack}
                            >
                                Back
                            </Button>
                        </Box>
                    </form>

                    {errorSectionMessage ? (
                        <Alert severity="error" sx={{ justifyContent: 'center', py: "2vh" }}>
                            <AlertTitle>Error</AlertTitle>
                            <strong>{errorSectionMessage}</strong>
                        </Alert>
                    ) : null}
                </Paper>
            </Grid>
        </Grid>
    </>)
}

export default EditSectionForm;