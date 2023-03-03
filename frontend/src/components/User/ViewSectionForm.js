import React, { useState } from "react";
import { Box, Paper, Grid, Avatar, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";


function ViewSectionForm({ section }) {
    let navigate = useNavigate();

    document.title = `View Section #${section.id} - PiXELL-River`;
    const routeChangeBack = () => {
        let path = "/section/all";

        navigate(path);
    };

    const routeChangeEdit = () => {
        let path = "/section/edit?courseId=" + section.id;
        // let path = "/user/all";
        navigate(path);
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={2} />

            <Grid item xs={8}>
                <Box pb={10} />

                <Paper elevation={10}>
                    <form>
                        <Box pt={5} display="flex" justifyContent="center">
                            <Avatar src="../src/assets/logo.png"></Avatar>
                        </Box>

                        <Box textAlign="center">
                            <h3>View Section</h3>
                        </Box>

                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <TextField
                                    fullWidth
                                    required
                                    name="section"
                                    id="outlined-fname"
                                    label="Section"
                                    variant="filled"
                                    margin="normal"
                                    type="text"
                                    value={String(section.section)}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                        </Grid>

                        <Box pt={5} textAlign="center">

                            <Button
                                type="button"
                                color="primary"
                                variant="contained"
                                onClick={routeChangeEdit}
                            >
                                Edit
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
                </Paper>
            </Grid>
        </Grid>
    )
}

export default ViewSectionForm;