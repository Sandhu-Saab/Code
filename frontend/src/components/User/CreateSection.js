import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState, useEffect } from "react";

import { Navigate } from "react-router-dom";
import { Alert, AlertTitle, Box, Paper, Grid, Avatar, TextField, Button } from "@mui/material";

/**
 * Displays the section page.
 * 
 * @returns The section page.
 */
function CreateSection() {
    const [maxId, setMaxId] = useState();
    const [sections, setSections] = useState([]);
    const [section, setSection] = useState();
    const [loading, setLoading] = useState(true);
    const [counter, setCounter] = useState(3);
    const [open, setOpen] = useState(true);

    let token = sessionStorage.getItem("access");

    /**
     * Fetches the sections and stores in a useState to display in datagrid.
     */
    const getSections = async() => {
        try {
            const response = await axios({
                method: "GET",
                url: `/api/courses/`,
                headers: {
                    "Content-Type": "application/json",
                },
            });
    
            const data = await response.data;

            setSections(data);
            setLoading(false);
        } catch (error) {   
            if (error.response) {
                console.log(error.response);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        }
    }

    /**
     * Determines the next possible number for a new section in the database.
     * 
     * @param {Sections Data Object from database.} data 
     * @returns The next ID value in the database.
     */


    useEffect(() => {
        getSections();
    }, [sections.length]);

    useEffect(() => {
    if (open) {
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
        }
    }, [counter, open]);


    /**
     * Column data used to display the section data grid.
     */
    const columns = [
        {
            field: "section",
            headerName: "Section",
            width: 150,
        },
    ]

    function handleChangeField(event) {
        const { name, value } = event.target;
        setSection((prevTicket) => ({
          ...prevTicket,
          [name]: value,
        }));
      }

    /**
     * Create the new section to the database. 
     */
    function createSection() {

        axios({
            method: "POST",
            url: "/api/courses/",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },

            data: {
                section:section.section,
                name: "null",
                term: 1
                // sectionId: Number.parseInt(maxId),
                // name: newSection
            },
        })
            .then((response) => {
                window.location.reload(false);
                // Possible feature of having Snackbar showing successful 
                // Section creation
            })
            .catch(function (error) {
                // console.log(CryptoJS.SHA1(user.password).toString())
                // 2022-03-17 20:37:50.431971+00
                console.log(error);
            });
    }

    return (
        <>
            <Paper elevation={10} 
                sx={{ 
                    mt: '5vh',
                    mx: 'auto',
                    textAlign: "center",
                    px: 8,
                    py: 3,
                    width: '70%' 
                }}
            >
                {counter !== 0 || loading ? (
                    <div className="spinner" style={{ height: 487 }}>
                        <span>Loading. . .</span>
                        <div className="half-spinner"></div>
                    </div>                    
                ) : (
                    <>
                        <Box>
                            <h2>New Section</h2>    
                        </Box>                

                        <Box>
                            <DataGrid
                                rows={sections}
                                getRowId={(sections) => sections.id}
                                sx={{height: 400}}
                                columns={columns}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                disableColumnSelector
                                disableSelectionOnClick
                                initialState={{
                                    sorting: {
                                        sortModel: [
                                            {
                                                field: "sectionId",
                                                sort: "asc",
                                            },
                                        ],
                                    },
                                }}
                            />
                        </Box>

                        <Box sx={{ mt: 3 }}>
                            <TextField 
                            required
                            id="section"
                            label="Section"
                            variant="filled"
                            name="section"
                            onChange={handleChangeField}
                            />
                            <Button
                                type="button"
                                color="primary"
                                variant="contained"
                                onClick={createSection}
                            >
                                Create
                            </Button>
                        </Box>
                    </>
                )}
            </Paper>
        </>
    )
}

export default CreateSection;
