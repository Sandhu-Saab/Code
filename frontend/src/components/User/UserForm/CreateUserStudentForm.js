import axios from "axios";
import React, { useState } from "react";

import { Alert, AlertTitle, Box, Paper, Grid, Avatar, TextField, Button } from "@mui/material";

import { isEmpty } from "../../../Functions/FormValidator";


function CreateUserStudentForm() {
    const [errorUserMessage, setErrorUserMessage] = useState("");
    const [errorPassMessage, setErrorPassMessage] = useState("");
    const [errorFNameMessage, setErrorFNameMessage] = useState("");
    const [errorLNameMessage, setErrorLNameMessage] = useState("");
    const [errorUNameMessage, setErrorUNameMessage] = useState("");
    const [errorEmailMessage, setErrorEmailMessage] = useState("");

    const currentDate = new Date();
    const [user, setUser] = useState({
        fname: "",
        lname: "",
        username: "",
        password: "",
        repeatPass: "",
        email: "",
        course_id: "",
        role: "",
    });

    let token = sessionStorage.getItem("access");

    /**
     * Validates the form for all input fields.
     */
    function validateInfo(e) {
        hideAllErrors();

        if (!isValidate()) {
            e.preventDefault();
        } else {
            postUser();
        }
    }

    /**
     * Hides all error messages.
     */
    function hideAllErrors() {
        setErrorFNameMessage("");
        setErrorLNameMessage("");
        setErrorUNameMessage("");
        setErrorEmailMessage("");
        setErrorPassMessage("");
        setErrorUserMessage("");
    }

    /**
     * Validates all input fields.
     */
    function isValidate() {
        let isUserCorrect = true;

        let currentFName = user.fname;
        let currentLName = user.lname;
        let currentEmail = user.email;
        let currentUName = user.username;
        let currentPassword = user.password;
        let currentRPassword = user.repeatPass;

        /**
         * RRC Password Policy Regex:
         * https://www.rrc.ca/its/help-resources/information-technology-policies/password-policy/#:~:text=All%20passwords%20must%20adhere%20to,part%2C%20of%20your%20account%20name.
         * - minimum of 8 characters long
         * - contains upper/lower letters
         * - numeric digits
         * - non-alphanumeric
         */
        let validPassword = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,}$/);

        // https://www.w3resource.com/javascript/form/email-validation.php
        let validEmail = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);


        // If first name is empty
        if (isEmpty(currentFName)) {
            isUserCorrect = false;
            setErrorFNameMessage("First Name is required!");
        }

        // If last name is empty
        if (isEmpty(currentLName)) {
            isUserCorrect = false;
            setErrorLNameMessage("Last Name is required!");
        }

        // If username is empty
        if (isEmpty(currentUName)) {
            isUserCorrect = false;
            setErrorUNameMessage("Username is required!");
        } 

        // If email is empty and valid
        if (isEmpty(currentEmail)) {
            isUserCorrect = false;
            setErrorEmailMessage("Email is required!");
        } else if (!validEmail.test(currentEmail)) {
            isUserCorrect = false;
            setErrorEmailMessage("Email is not valid!");
        }

        // If new password is empty
        if (isEmpty(currentPassword)) {
            isUserCorrect = false;
            setErrorPassMessage("Cannot be empty!");
        }

        // If new repeated password is empty
        if (isEmpty(currentRPassword)) {
            isUserCorrect = false;
            setErrorPassMessage("Cannot be empty!");
        }

        if (currentPassword !== "" && currentRPassword !== "") {
            // New Password does not match new repeated password
            if (currentPassword !== currentRPassword) {
                isUserCorrect = false;
                setErrorPassMessage("Passwords do not match!");
            }
            
            // New repeated password does not match new password
            if (currentRPassword !== currentPassword) {
                isUserCorrect = false;
                setErrorPassMessage("Passwords do not match!");
            }

            // If password must match RRC Password Policy
            if (!validPassword.test(currentPassword) && currentPassword === currentRPassword) {
                isUserCorrect = false;
                if (currentPassword === currentRPassword) {
                    setErrorPassMessage("Password is not strong enough!");
                }
                
                setErrorUserMessage("Password must contain upper/lower case letters, numeric digits, non-alphanumeric symbols and be a minimum of 8 characters! Please try again.");
            }
        }
        return isUserCorrect;
    }

    /**
     * Creates a new user.
     */
    function postUser() {
        axios({
            method: "POST",
            url: "/api/users/",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },

            data: {
                first_name: user.fname,
                last_name: user.lname,
                username: user.username,
                password: user.password,
                email: user.email,
                course_id: null,
                role: 5,
                date_joined: new Date(currentDate.toISOString()),
                is_active: true,
            },
        })
            .then(() => {
                window.location.href = "../user/class-all";
            })
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            });
    }

    /**
     * Handles the changes of the user input fields 
     * and updates the user state information.
     * 
     * @param {Event Handler} event 
     */
    function handleChange(event) {
        const { value, name } = event.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={2} />

            <Grid item xs={8}>
                <Box pb={10} />

                <Paper elevation={10}>
                    <form>
                        <Box pt={5} display="flex" justifyContent="center">
                            <Avatar src="../src/static/images/ogo.png"></Avatar>
                        </Box>

                        <Box textAlign="center">
                            <h3>Create User</h3>
                        </Box>

                        <Grid container spacing={2}>
                            <Grid item xs={1} />

                            <Grid item xs={4}>
                                <TextField
                                    required
                                    fullWidth
                                    autoFocus
                                    type="text"
                                    name="fname"
                                    margin="normal"
                                    label="First Name"
                                    variant="outlined"
                                    onChange={handleChange}
                                    error={errorFNameMessage}
                                    id="outlined-fname-input"
                                    helperText={errorFNameMessage}
                                />

                                <TextField
                                    required
                                    fullWidth
                                    type="text"
                                    margin="normal"
                                    name="username"
                                    label="Username"
                                    variant="outlined"
                                    onChange={handleChange}
                                    error={errorUNameMessage}
                                    id="outlined-username-input"
                                    helperText={errorUNameMessage}
                                />

                                <TextField
                                    required
                                    id="pass"
                                    fullWidth
                                    type="password"
                                    margin="normal"
                                    name="password"
                                    variant="outlined"
                                    label="New Password"
                                    onChange={handleChange}
                                    autoComplete="new-password"
                                    error={errorPassMessage}
                                    helperText={errorPassMessage}
                                />

                            </Grid>

                            <Grid item xs={2} />

                            <Grid item xs={4}>
                                <TextField
                                    required
                                    fullWidth
                                    name="lname"
                                    margin="normal"
                                    label="Last Name"
                                    variant="outlined"
                                    id="outlined-lname"
                                    onChange={handleChange}
                                    error={errorLNameMessage}
                                    helperText={errorLNameMessage}
                                />

                                <TextField
                                    required
                                    fullWidth
                                    name="email"
                                    type="email"
                                    label="Email"
                                    margin="normal"
                                    variant="outlined"
                                    autoComplete="email"
                                    onChange={handleChange}
                                    error={errorEmailMessage}
                                    id="outlined-email-input"
                                    helperText={errorEmailMessage}
                                />

                                <TextField
                                    required
                                    id="pass"
                                    fullWidth
                                    type="password"
                                    margin="normal"
                                    name="repeatPass"
                                    variant="outlined"
                                    onChange={handleChange}
                                    error={errorPassMessage}
                                    autoComplete="repeatPass"
                                    label="Repeat New Password"
                                    helperText={errorPassMessage}
                                />
                            </Grid>
                        </Grid>

                        <Box pt={3} pb={5} textAlign="center">
                            <Button
                                type="button"
                                color="primary"
                                variant="contained"
                                onClick={validateInfo}
                                className="classes.button"
                            >
                                Submit
                            </Button>
                        </Box>
                    </form>

                    {errorUserMessage ? (
                        <Alert severity="error" sx={{ px: "10vw", py: "2vh" }}>
                            <AlertTitle>Error</AlertTitle>
                            <strong>{errorUserMessage}</strong>
                        </Alert>
                    ) : null}
                </Paper>
            </Grid>

            <Grid item xs={2} />
        </Grid>
    )
}

export default CreateUserStudentForm;