import React from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Grid,
  Avatar,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";

import ConfirmModal from "../../layouts/ConfirmModal";

//Start of the code
function AccountApprovalReview(props) {
  //Variables
  const query = new URLSearchParams(useLocation().search);
  const userId = query.get("userId");

  document.title = `Approval View #${userId} - PiXELL-River`;

  const [rolesList, setRolesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sections, setSections] = useState([]);

  const token = sessionStorage.getItem("access");
  const [dialogIsOpen, setDialogIsOpen] = React.useState(false);

  const currentDate = new Date();
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    username: "",
    password: "",
    email: "",
    course: "",
    role: "",
  });

  const [buttonSelected, setButtonSelected] = React.useState(0);

  // A variable for navigation
  let Navigate = useNavigate();

  // useEffects and handles
  useEffect(() => {
    getUser();
    getRoles();
    getSections();
  }, []);

  useEffect(() => {
    if (user && rolesList.length) {
      verifyUser();
      setLoading(false);
    }
  });

  const handleDialogOpenApprove = () => {
    setButtonSelected(1);
    setDialogIsOpen(true);
  };

  const handleDialogOpenDelete = () => {
    setButtonSelected(2);
    setDialogIsOpen(true);
  };

  const handleDialogClose = () => {
    setButtonSelected(0);
    setDialogIsOpen(false);
  };

  //Fetching data

  /**
   * Fetches the values of the users from the API.
   */
  const getUser = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `/api/viewSingleUser/?user=${userId}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.data;

      setUser({
        fname: data.first_name,
        lname: data.last_name,
        username: data.username,
        email: data.email,
        section: data.course_id,
        role: data.role,
      });
    } catch (error) {
      if (error.response) {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    }
  };

  /**
   * Fetches the values of the roles from the API.
   */
  const getRoles = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `/api/roles/`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.data;
      setRolesList(data);
    } catch (error) {
      if (error.response) {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    }
  };

  /**
   * Fetch all sections from the database and store it on Sections state.
   */
  const getSections = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: "/api/courses/",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.data;
      setSections(data);
    } catch (error) {
      if (error.response) {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    }
  };

  /**
   * Fetches the values of the sections from the API.
   *
   * @param {Section id of the user object} userSection
   * @returns The string value of the section id.
   */
  function getSection(userSection) {
    let sectionValue = "";
    
    sections.forEach((section) => {
      if (userSection === section.id) {
        sectionValue = section.section;
      }
      
      if (userSection === null) {
        sectionValue = "N/A";
      }
    });

    return sectionValue;
  }

  /**
   * Verifies if the current user is admin, student, instructor, etc.
   */
  const verifyUser = () => {
    let currentUserRole = sessionStorage.getItem("roleId");
    if (currentUserRole === "4") Navigate("/dash");
  };

  /**
   * Fetches the values of the roles from the API.
   *
   * @param {Role id of the user object} userRole
   * @returns The string value of the role id.
   */
  function getRole(userRole) {
    let value;

    // Loops through the roles to find exact value
    rolesList.forEach((role) => {
      if (role.roleId === userRole) {
        value = role.name;
      }
    });

    return value;
  }

  //Goes back to previous page
  function goBack() {
    Navigate("../user/approval");
  }

  /**
   * Deletes the user from the database.
   */
  function DeleteUser() {
    axios({
      method: "DELETE",
      url: `/api/users/${userId}/`,
      headers: {
        "Content-Type": "application/json",
      },
    });
    axios({
      method: "POST",
      url: `/api/sendRejectEmail/`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        email: user.email,
      }
    });
    setDialogIsOpen(false);
    goBack();
  }

  /**
   * A function that allows an admin or instructor to approve a user.
   * First it posts the temporary user into the user table proper using the data from a variable.
   * Then it deletes the original temporary user.
   */
  function ApproveUser() {
    axios({
      method: "PATCH",
      url: `/api/updateIsActive/${userId}/`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        is_active: true,
      },
    }).catch(function (error) {
      console.log(error);
    });

    axios({
      method: "POST",
      url: `/api/sendAcceptEmail/`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        email: user.email,
      }
    });

    setDialogIsOpen(false);
    goBack();
  }
  //The page itself
  return (
    <div>
      {loading ? (
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
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
                  <h3>View Account Request</h3>
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={1} />

                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      required
                      name="first_name"
                      id="outlined-fname"
                      label="First Name"
                      variant="filled"
                      margin="normal"
                      type="text"
                      value={String(user.fname)}
                      InputProps={{
                        readOnly: true,
                      }}
                    />

                    <TextField
                      fullWidth
                      required
                      name="username"
                      id="outlined-fname"
                      label="Username"
                      variant="filled"
                      margin="normal"
                      type="text"
                      value={String(user.username)}
                      InputProps={{
                        readOnly: true,
                      }}
                    />

                    <TextField
                      fullWidth
                      required
                      name="role"
                      id="outlined-fname"
                      label="Role"
                      variant="filled"
                      margin="normal"
                      type="text"
                      value={String(getRole(user.role))}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>

                  <Grid item xs={2} />

                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      required
                      name="last_name"
                      id="outlined-fname"
                      label="Last Name"
                      variant="filled"
                      margin="normal"
                      type="text"
                      value={String(user.lname)}
                      InputProps={{
                        readOnly: true,
                      }}
                    />

                    <TextField
                      fullWidth
                      required
                      name="email"
                      id="outlined-fname"
                      label="Email"
                      variant="filled"
                      margin="normal"
                      type="text"
                      value={user.email}
                      InputProps={{
                        readOnly: true,
                      }}
                    />

                    <TextField
                      fullWidth
                      required
                      name="section"
                      id="outlined-fname"
                      label="Section"
                      variant="filled"
                      margin="normal"
                      type="text"
                      value={String(getSection(user.section))}
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
                    style={{ margin: "20px" }}
                    onClick={() => {
                      handleDialogOpenApprove();
                    }}
                  >
                    Accept
                  </Button>

                  <Button
                    type="button"
                    color="primary"
                    variant="contained"
                    onClick={() => {
                      handleDialogOpenDelete();
                    }}
                  >
                    Reject
                  </Button>

                  <Button
                    type="button"
                    color="primary"
                    variant="contained"
                    style={{ margin: "20px" }}
                    onClick={() => {
                      goBack();
                    }}
                  >
                    Decide Later
                  </Button>
                </Box>
              </form>
            </Paper>
          </Grid>
        </Grid>
      )}

      {dialogIsOpen && buttonSelected === 1 && (
        <ConfirmModal
          title="Accept User"
          message="Are you sure you want to accept this user?"
          onCancel={handleDialogClose}
          onConfirm={ApproveUser}
        />
      )}
      
      {dialogIsOpen && buttonSelected === 2 && (
        <ConfirmModal
          title="Reject User"
          message="Are you sure you want to reject/delete this user?"
          onCancel={handleDialogClose}
          onConfirm={DeleteUser}
        />
      )}
    </div>
  );
}

export default AccountApprovalReview;
