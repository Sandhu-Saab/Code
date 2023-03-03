import axios from "axios";
import React, { useState, useEffect } from "react";

import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import MenuItem from "@mui/material/MenuItem";

import {
    Alert,
    AlertTitle,
    Box,
    Paper,
    Grid,
    Button,
    FormHelperText,
    TextField
} from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { isEmpty } from "../../../Functions/FormValidator";
import Modal from "./Modal";


const dataTypes=[ 
    'Incidents',
    'Problems',
    'Assets',
    'Changes',
    'Users'
  ];
const sec =[ 'All' , 'FTE-01', 'FTE-02', 'FTE-03'];
const status= [  'Any' ,'Resolved' , 'Unresolved'];
const useType =[ 
    'All',
    'Student 1',
    'Student 2',
    'Instructor 1',
    'Admin 1',
 ];



function ExportDataForm() {
    const [errorUsersMessage, setErrorUsersMessage] = useState("");
    const [errorStatusMessage, setErrorStatusMessage] = useState("");
    const [errorSectionsMessage, setErrorSectionsMessage] = useState("");
    const [errorDatatypeMessage, setErrorDatatypeMessage] = useState("");
    const [errorRoleMessage, setErrorRoleMessage] = useState("");

    const currentDate = new Date();
    const [user, setUser] = useState({
        statusData : "",
        sectionData : "",
        userData:"",
        typeData: "",
        // startDate : "",
        // endDate: "",

    });
    const [modalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
      setModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setModalOpen(false);
    };

    let token = sessionStorage.getItem("access");


  

    /**
     * Validates the form for all input fields.
     */
    function validateInfo(e) {
          hideAllErrors();

        if (!isValidate()) {
            e.preventDefault();
        } else {
           // postUser();
           handleOpenModal()
        }

    }

    /**
     * Hides all error messages.
     */
    function hideAllErrors() {
        setErrorStatusMessage("");
        setErrorSectionsMessage("");
        setErrorDatatypeMessage("");
        setErrorRoleMessage("");
    }

    /**
     * Validates all input fields.
     */
    function isValidate() {
        let isUserCorrect = true;

         let currentSection = user.sectionData;
        let currentuser = user.userData;
       let currentdataType = user.typeData ;
       let currentstatus = user.statusData;

    

        // If role is empty - (it wouldn't be a number if it was empty)

        if (isNaN(Number.parseInt(currentuser))) {
            isUserCorrect = false;
            setErrorRoleMessage("User is required!");
        }

        if (isNaN(Number.parseInt(currentSection))) {
            isUserCorrect = false;
            setErrorSectionsMessage("Section is required!");
        }

        if (isNaN(Number.parseInt(currentdataType))) {
            isUserCorrect = false;
            setErrorDatatypeMessage("Data type is required!");
        }
        if (isNaN(Number.parseInt(currentstatus))) {
            isUserCorrect = false;
            setErrorStatusMessage("Status is required!");
        }
      return   isUserCorrect
    }

    /**
     * Dowload post api 
     */
    // function postUser() {
    //     axios({
    //         method: "POST",
    //         url: "/api/users/",
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: `Bearer ${token}`,
    //         },

    //         data: {
    //          
    //         },
    //     })
    //         .then(() => {
    //             window.location.href = "../user/all";
    //         })
    //         .catch((error) => {
    //             if (error.response) {
    //                 console.log(error.response);
    //                 console.log(error.response.status);
    //                 console.log(error.response.headers);
    //             }
    //         });
    // }

    /**
     * Handles the changes of the input fields.
     * 
     * @param {*} event 
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
                           <h1>Export Data</h1>
                        </Box>

                        <Box textAlign="center">
                            <p>
                                Select which data type you 
                                would like exported to a .csv file
                            </p>
                        </Box>

                        <Grid container spacing={2}>
                            <Grid item xs={1} />

                            <Grid item xs={4}>
                            <FormControl error={errorDatatypeMessage} fullWidth>
                            <InputLabel id="demo-simple-select-helper-label">
                                Data Type
                            </InputLabel>

                            <Select
                                name="typeData"
                                label="typeData"
                                onChange={handleChange}
                                id="demo-simple-select-helper"
                                labelId="demo-simple-select-helper-label"
                            >
                                
                                {dataTypes && dataTypes.map((value,idx) => (
                                    <MenuItem value={idx}>
                                        {value}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>{errorDatatypeMessage}</FormHelperText>
                        </FormControl>

                                <Box pb={2} />

                                <FormControl error={errorSectionsMessage} fullWidth>
                                    <InputLabel id="demo-simple-select-helper-label">
                                        Section
                                    </InputLabel>

                                    <Select
                                        name="sectionData"
                                        label="sectionData"
                                        onChange={handleChange}
                                        id="demo-simple-select-helper"
                                        labelId="demo-simple-select-helper-label"
                                    >
                                        
                                        {sec && sec.map((value , idx) => (
                                            <MenuItem value={idx}>
                                                {value}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText>{errorSectionsMessage}</FormHelperText>
                                </FormControl>

                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    disablePast
                                    name="startDate"
                                    label="Start Date"
                                    value={currentDate}
                                    inputFormat="MM/dd/yyyy"
                                    // renderDay={customDayRenderer}
                                   // onChange={onChangeStartDateHandler}
                                    renderInput={(params) => <TextField {...params}  fullWidth margin='normal' />}
                                />
                            </LocalizationProvider>
                            </Grid>

                            <Grid item xs={2} />

                            <Grid item xs={4}>
                                <FormControl error={errorStatusMessage} fullWidth>
                                <InputLabel id="demo-simple-select-helper-label">
                                    Status
                                </InputLabel>

                                <Select
                                    name="statusData"
                                    id="demo-simple-select-helper"
                                    labelId="demo-simple-select-helper-label"
                                    label="statusData"
                                    onChange={handleChange}
                                >
                                    {status && status.map((value ,idx) => (
                                        <MenuItem value={idx}>
                                            {value}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>{errorStatusMessage}</FormHelperText>
                            </FormControl>

                                <Box pb={2} />

                                <FormControl error={errorRoleMessage} fullWidth>
                                    <InputLabel id="demo-simple-select-helper-label">
                                        User
                                    </InputLabel>

                                    <Select
                                        name="userData"
                                        id="demo-simple-select-helper"
                                        labelId="demo-simple-select-helper-label"
                                        label="Section"
                                        onChange={handleChange}
                                    >
                                        {useType && useType.map((value , idx) => (
                                            <MenuItem value={idx}>
                                                {value}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText>{errorRoleMessage}</FormHelperText>
                                </FormControl>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="End Date"
                                   value={currentDate}
                                    inputFormat="MM/dd/yyyy"
                                  //  onChange={onChangeEndDateHandler}
                                    renderInput={(params) => <TextField {...params}  fullWidth margin='normal' />}
                                />
                            </LocalizationProvider>

                            </Grid>

                            <Grid xs={1} />
                        </Grid>

                        <Box pt={3} pb={5} textAlign="center">
                            <Button
                                type="button"
                                color="primary"
                                variant="contained"
                                onClick={validateInfo}
                                className="classes.button"
                            >
                                Download
                            </Button>
                        </Box>
                    </form>

                    {errorUsersMessage ? (
                        <Alert severity="error" sx={{ px: "10vw", py: "2vh" }}>
                            <AlertTitle>Error</AlertTitle>
                            <strong>{errorUsersMessage}</strong>
                        </Alert>
                    ) : null}
                </Paper>
            </Grid>
            <Box >
            <Modal isOpen={modalOpen} onClose={handleCloseModal}>
               <h3>
               Would you like to download Selected type data?
              </h3>
           </Modal>
          </Box>

            <Grid item xs={2} />
        </Grid>
    )
}

export default ExportDataForm;