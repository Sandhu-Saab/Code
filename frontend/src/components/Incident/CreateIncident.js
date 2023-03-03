import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import {
  TextField,
  Box,
  Switch,
  FormControlLabel,
  Slider,
  Divider,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
//import IncidentViewGroups from "./Security Group/IncidentViewGroups";

const marks = [
  {
    value: 1,
    label: "1 - Critical",
  },
  {
    value: 2,
    label: "2 - High",
  },
  {
    value: 3,
    label: "3 - Medium",
  },
  {
    value: 4,
    label: "4 - Low",
  },
];

function valuetext(value) {
  return `${value}`;
}

function valueLabelFormat(value) {
  return marks.findIndex((mark) => mark.value === value) + 1;
}


/**
 * Default Export function for creating Inident ticket
 */
function CreateIncident() {
  const [maxid, setMaxid] = useState([{incidentId:"placeholder"}]);
  const [user, setUser] = useState();
  const [userList, setUserList] = useState([]);
  const [isMultipleAffected, setIsMultipleAffected] = useState(false);
  const [impact, setImpact] = useState(4);
  const [urgency, setUrgency] = useState(4);
  const [priority, setPriority] = useState(4);
  const currentDate = new Date();
  const [reportDateTime, setReportDateTime] = useState(
    new Date(currentDate.toISOString())
  );
  const [ticketOwner, setTicketOwner] = useState();
  const [technician, setTechnician] = useState();
  const [ticketType, setTicketType] = useState();
  const [technicianList, setTechnicianList] = useState([]);
  const [ticketTypeList, setTicketTypeList] = useState([]);
  const [ticket, setTicket] = useState({
    subject: "",
    details: "",
    affectedUserSize: 0,
  });

  let token = sessionStorage.getItem("access");
  let loginUser = sessionStorage.getItem("username");
  let loginUserSection = sessionStorage.getItem("section");
  if (loginUserSection == "null"){
    loginUserSection = null
  }
  if (loginUserSection == "None"){
    loginUserSection = null
  }
  const [status, setStatus] =  useState([]);
  const [steps, setSteps] = useState([]);
  const [incidentGroup, setIncidentGroup] = useState();
  const currentUserRole = sessionStorage.getItem("roleId");
  const [group, setGroup]= useState();
  const [isAssigned, setisAssigned] = useState(false);
  useEffect(() => {
    getMaxid();
    getUsers();
    getTechnicians();
    getTicketTypes();
    getGroups();
    getStatus();
  }, []);

  useEffect(()=> {
    getStatusList();
  },[status])

  useEffect(() => {
    handleChangePriority();
  }, [impact, urgency]);

  useEffect(() => {}, [isMultipleAffected]); 

  /**
   * POST the ticket data to the incident table on the database
   */
  function postTicket(event) {
    axios({
      method: "POST",
      url: "/api/incident/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        userId: user,
        status: 1,
        reportDateTime: reportDateTime,
        multipleAffectedUser: isMultipleAffected,
        affectedUserSize: ticket.affectedUserSize,
        impact: impact,
        urgency: urgency,
        priority: priority,
        ticketOwnerId: ticketOwner,
        ticketOwnerSection: loginUserSection,
        ticketOwnerRole: Number.parseInt(currentUserRole),
        assignedTechId: technician,
        ticketType: ticketType,
        subject: ticket.subject,
        details: ticket.details,
        security_group: incidentGroup,
        isAssigned: isAssigned
      },
    })
      .then((response) => {
        window.location.href = "../incident/all";
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
        }
      });

    event.preventDefault();
  }

  /**
   *  Fetch all users from the api_user table and store it on userList state
   */
  function getUsers() {
    axios({
      method: "GET",
      url: "/api/userFast/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const data = response.data;
        setUserList(data);
        // Fetch ticket owner ID
        setTicketOwner(
          data.find((element) => element.username === loginUser).id
        );
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }


  const getStatus = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `/api/incidentStatus/`,
        headers: {
          "Content-Type": "application/json",
          Authorization : `Bearer ${token}`,
        },
      });
      const data = await response.data;
      setStatus(data);
    } catch(error){
      if (error.response){
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    }
  }

  function getStatusList(){
    setSteps([])
    status.map((e) =>{
      setSteps(current => [...current, e.status_name])
    })
  }

  /**
   * Fetch maxId from the incident table
   */
  function getMaxid() {
    axios({
      method: "GET",
      url: "/api/incidentData/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const data = response.data;

        let maxTicket = data.length;
        let maxId = maxTicket + 1;
        maxId = maxId.toString().padStart(6, "0");
        setMaxid("INC" + maxId);
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
   * Fetch the groups from the security group table
   */
  const getGroups = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `/api/securitygroups/`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.data;
      setGroup(data);
    } catch (error) {
      if (error.response) {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    }
  };

  /**
   *  Fetch all users with the role technician (1) from the database and store it on technicianList state
   */
  function getTechnicians() {
    axios({
      method: "GET",
      url: "/api/getTechnician/?role_id=2",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const data = response.data;
        setTechnicianList(data);
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
   *  Fetch all users with the role technician (1) from the database and store it on technicianList state
   */
  function getTicketTypes() {
    axios({
      method: "GET",
      url: "/api/tickettype/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const data = response.data;
        setTicketTypeList(data);
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
   * Handles priority change when Impact/Urgency is adjusted according to the ITIL matrix
   */
  const handleChangePriority = () => {
    if (urgency === 4) {
      setPriority(4);
    } else {
      if (urgency === 3) {
        if (impact !== 1) {
          setPriority(3);
        } else {
          setPriority(2);
        }
      } else {
        if (urgency === 2) {
          if (impact === 1) {
            setPriority(1);
          } else if (impact === 4) {
            setPriority(3);
          } else {
            setPriority(2);
          }
        } else {
          if (urgency === 1) {
            if (impact < 3) {
              setPriority(1);
            } else {
              setPriority(2);
            }
          }
        }
      }
    }
  };

  /**
   * Handles change event  when incident ticket field are change
   */
  function handleChangeField(event) {
    const { name, value } = event.target;
    setTicket((prevTicket) => ({
      ...prevTicket,
      [name]: value,
    }));
  }

  const handleGroup = (event) => {
    setIncidentGroup(event.target.value);
  };

  document.title = "New Incident Ticket " + "- PiXELL-River";

  /**
   * Function to navigate the page back to the all list.
   */
   const routeCreateProblem = () => {
     let path = "/problem/new";
     window.open(path);
   };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={2} />
        <Grid item xs={8}>
          <Paper elevation={10}>
            <form onSubmit={postTicket}>
              <Box p={4}>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  color="#525252"
                  align="center"
                  pb={5}
                >
                  New Incident
                </Typography>
                <Box pb={5} sx={{ width: "100%" }}>
                  <Stepper activeStep={0} alternativeLabel>
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Box>
                <Box pb={4}>
                  <Grid container spacing={2}>
                    <Grid item xs={1} />

                    <Grid item xs={4}>
                      <TextField
                        id="ticketNumber"
                        label="Ticket Number"
                        variant="filled"
                        name="ticketNumber"
                        margin="normal"
                        type="text"
                        value={maxid}
                        disabled
                        fullWidth
                      />
                      <Box pt={2}>
                        <Autocomplete
                          id="grouped-userList"
                          options={userList}
                          groupBy={(option) => option.first_name[0]}
                          getOptionLabel={(option) =>
                            `${option.first_name} ${option.last_name}`
                          }
                          noOptionsText={"No Results Found"}
                          renderInput={(params) => (
                            <TextField required {...params} label="User" />
                          )}
                          // value={user}
                          onChange={(event, newValue) => {
                            setUser(newValue.id);
                            //console.log(user)
                          }}
                        />
                      </Box>
                      <Box pt={3}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DateTimePicker
                            label="Report Date Time"
                            value={reportDateTime}
                            onChange={(newValue) => {
                              setReportDateTime(newValue);
                            }}
                            renderInput={(params) => (
                              <TextField
                                required
                                {...params}
                                sx={{ width: "100%" }}
                              />
                            )}
                          />
                        </LocalizationProvider>
                      </Box>
                      <Box pt={5}>
                        <FormControlLabel
                          control={<Switch color="primary" />}
                          label="Multiple Affected User"
                          labelPlacement="start"
                          checked={isMultipleAffected}
                          name="multipleUserAffected"
                          onChange={(event) => {
                            setIsMultipleAffected(event.target.checked);
                            setTicket({ ...ticket, affectedUserSize: 0 });
                          }}
                        />
                      </Box>
                    </Grid>

                    <Grid item xs={2} />

                    <Grid item xs={4}>
                      <Typography textAlign="center">Impact</Typography>
                      <Slider
                        size="small"
                        aria-label="Restricted values"
                        defaultValue={4}
                        valueLabelFormat={valueLabelFormat}
                        getAriaValueText={valuetext}
                        step={null}
                        valueLabelDisplay="auto"
                        marks={marks}
                        min={1}
                        max={4}
                        value={impact}
                        onChange={(event, newValue) => {
                          setImpact(newValue);
                        }}
                        name="impact"
                      />
                      <Typography textAlign="center">Urgency</Typography>
                      <Slider
                        size="small"
                        aria-label="Restricted values"
                        defaultValue={4}
                        valueLabelFormat={valueLabelFormat}
                        getAriaValueText={valuetext}
                        step={null}
                        valueLabelDisplay="auto"
                        marks={marks}
                        min={1}
                        max={4}
                        value={urgency}
                        onChange={(event, newValue) => {
                          setUrgency(newValue);
                        }}
                        name="urgency"
                      />
                      <Typography textAlign="center">Priority</Typography>
                      <Slider
                        size="small"
                        aria-label="Restricted values"
                        defaultValue={4}
                        valueLabelFormat={valueLabelFormat}
                        getAriaValueText={valuetext}
                        step={null}
                        valueLabelDisplay="auto"
                        marks={marks}
                        min={1}
                        max={4}
                        disabled
                        value={priority}
                      />
                      {isMultipleAffected && (
                        <Box pt={2}>
                          <FormControl sx={{ width: "100%" }}>
                            <InputLabel id="number-user-affected-label">
                              No. of User Affected
                            </InputLabel>
                            <Select
                              name="affectedUserSize"
                              labelId="number-user-affected"
                              id="number-user-affected"
                              label="No. of User Affected"
                              value={ticket.affectedUserSize}
                              onChange={handleChangeField}
                            >
                              <MenuItem value={0}>
                                <em>None</em>
                              </MenuItem>
                              <MenuItem value={1}>1-50</MenuItem>
                              <MenuItem value={2}>51-100</MenuItem>
                              <MenuItem value={3}>101+</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                      )}
                    </Grid>
                    <Grid item xs={1} />
                  </Grid>

                  <br />
                  <Divider />

                  <Box pt={3}>
                    <Grid container spacing={2}>
                      <Grid item xs={1} />

                      <Grid item xs={4}>
                        <TextField
                          id="ticketOpenedBy"
                          label="Ticket Open By"
                          variant="filled"
                          value={loginUser}
                          disabled
                          fullWidth
                        />
                        {currentUserRole !== "4" && (
                          <Box pt={2}>                           
                           <FormControl fullWidth>
                          <InputLabel>Security Group</InputLabel>
                           <Select
                            name="security_group"
                            label="SecurityGroup"
                            onChange={handleGroup}
                            id="demo-simple_select-helper"
                            labelId="demo-simple-select-helper-label"
                           >

                            {group && group.map((security_group)=>(
                              <MenuItem value={security_group.securityGroupId}>
                                {security_group.name}
                              </MenuItem>
                            ))}
                            </Select>
                            </FormControl>
                          </Box>
                        )}
                        <Box pt={2}>
                          <Autocomplete
                            id="grouped-techncianList"
                            options={technicianList}
                            groupBy={(option) => option.first_name[0]}
                            getOptionLabel={(option) =>
                              `${option.first_name} ${option.last_name}`
                            }
                            getOptionSelected={(option, value) =>
                              option.value === value.value
                            }
                            noOptionsText={"No Results Found"}
                            renderInput={(params) => (
                              <TextField
                                required
                                {...params}
                                label="Assigned Technician"
                              />
                            )}
                            onChange={(event, newValue) => {
                              setTechnician(newValue.id);
                            }}
                          />
                        </Box>
                      </Grid>

                      <Grid item xs={2} />

                      <Grid item xs={4}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DateTimePicker
                            label="Ticket Created At"
                            value={currentDate.toISOString()}
                            renderInput={(params) => (
                              <TextField {...params} sx={{ width: "100%" }} />
                            )}
                            disabled
                          />
                        </LocalizationProvider>
                        <Box pt={3}>
                          <Autocomplete
                            name="ticketType"
                            id="grouped-ticketType"
                            options={ticketTypeList}
                            groupBy={(option) => option.category}
                            getOptionLabel={(option) => `${option.type}`}
                            getOptionSelected={(option, value) =>
                              option.value === value.value
                            }
                            noOptionsText={"No Results Found"}
                            renderInput={(params) => (
                              <TextField
                                required
                                {...params}
                                label="Ticket Type"
                              />
                            )}
                            // value={technician}
                            onChange={(event, newValue) => {
                              setTicketType((newValue.id));
                              //console.log(newValue.TypeId)
                            }}
                          />
                        </Box>
                        {currentUserRole == 3 &&(
                        <Box pt={5}>
                        <FormControlLabel
                          control={<Switch color="primary" />}
                          label="Viewable for Students?"
                          labelPlacement="start"
                          checked={isAssigned}
                          name="isAssigned"
                          onChange={(event) => {
                            setisAssigned(event.target.checked);
                          }}
                        />
                      </Box>
                        )}
                      </Grid>
                      <Grid item xs={1} />
                    </Grid>
                  </Box>

                  <br />
                  <Divider />

                  <Box pt={2}>
                    <Grid container spacing={2}>
                      <Grid item xs={1} />

                      <Grid item xs={10}>
                        <TextField
                          required
                          id="subject"
                          label="Summary"
                          variant="filled"
                          fullWidth
                          name="subject"
                          onChange={handleChangeField}
                        />
                        <Box pt={3}>
                          <TextField
                            required
                            id="details"
                            label="Details"
                            variant="filled"
                            multiline
                            maxRows={100}
                            fullWidth
                            name="details"
                            onChange={handleChangeField}
                          />
                        </Box>
                      </Grid>

                      <Grid item xs={1} />
                    </Grid>
                  </Box>

                  <Box pt={5} textAlign="center">
                    <Button type="submit" variant="contained">
                      Submit
                    </Button>

                    <Button style={{ margin: "20px" }} variant="contained" onClick={routeCreateProblem}>
                      Create Problem
                    </Button>
                  </Box>
                </Box>
              </Box>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={2} />
      </Grid>
    </div>
  );
}

export default CreateIncident;