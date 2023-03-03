import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
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
  StepButton,
  Grid,
  stepClasses,
} from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import IncidentComments from "./IncidentComments";

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

function EditIncidentData({
  incidents,
  userLists,
  technicianLists,
  ticketTypeLists,
  secGroup,
  incStatus,
}) {
  let navigate = useNavigate();
  const [incidentData, setIncidentData] = useState(incidents);
  const query = new URLSearchParams(useLocation().search);
  const incidentId = query.get("incidentId");
  const token = sessionStorage.getItem("access");
  const [technician, setTechnician] = useState(userLists.find((item) => item.id === incidents.assignedTechId));
  const [ticketType, setTicketType] = useState();
  const [impact, setImpact] = useState(4);
  const [urgency, setUrgency] = useState(4);
  const [priority, setPriority] = useState(4);
  const currentDate = new Date();
  const [reportDateTime, setReportDateTime] = useState(
    new Date(currentDate.toISOString())
  );
  const [activeStatus, setActiveStatus] = useState();
  const [ticketNum, setTicketNum] = useState();
  const [ticket, setTicket] = useState({
    subject: "",
    details: "",
    affectedUserSize: "",
  });
  const [isMultipleAffected, setIsMultipleAffected] = useState(false);
  const [user, setUser] = useState(
    userLists.find((item) => item.id === incidentData.userId)
  );
  
  const [incidentGroup, setIncidentGroup] = useState();
  const [status, setStatus] = useState();
  const currentUserId = sessionStorage.getItem("userId");
  const currentUserRole = sessionStorage.getItem("roleId");
  const currentUserSection = sessionStorage.getItem("section");
  const [steps, setSteps] = useState([]);
  const [isAssigned, setisAssigned] = useState();
  /**
   * Sets the states from the fetched Incident Data
   */
  function setData() {
    setReportDateTime(incidentData.reportDateTime);
    setImpact(Number(incidentData.impact));
    setUrgency(Number(incidentData.urgency));
    setPriority(Number(incidentData.priority));
    setIsMultipleAffected(incidentData.multipleAffectedUser);
    setTicketNum(incidentData.ticketNumber);
    setTicket({
      ...ticket,
      affectedUserSize: Number(incidentData.affectedUserSize),
      subject: String(incidentData.subject),
      details: String(incidentData.details),
    });
    if(incidentData.status > 2){
      setActiveStatus(Number(incidentData.status - 4))
      setStatus(Number(incidentData.status - 1));
    }else{
    setActiveStatus(Number(incidentData.status) - 1);
    setStatus(Number(incidentData.status - 1));
    }
    setTicketType(incidentData.ticketType_id)
    setisAssigned(incidentData.isAssigned)
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
   * Handle onChange for subject and details field
   */
  function handleChangeField(event) {
    const { name, value } = event.target;
    setTicket((prevTicket) => ({
      ...prevTicket,
      [name]: value,
    }));
  }

  /**
   * When the user clicks on a step, set the active status to the step that was clicked on.
   * @param step - The step number that you want to set as active.
   */
  const handleStatusStep = (step) => () => {
    if(step < 2){
    setStatus(step);
    setActiveStatus(step);
    }else{
      setStatus(step + 3)
      setActiveStatus(step);
    } 
  };


  useEffect(() => {
    //verifyUser();
    setData();
    setStatusData();
    // console.log(technicianLists)
    // console.log(incidentData.assignedTechId)
  }, []);

  useEffect(() => {
    setStatusData();
  }, [incStatus]);

  useEffect(() => {
    handleChangePriority();
    // console.log(impact)
    // console.log(technician)
  }, [impact, urgency]);

  useEffect(() => {}, [isMultipleAffected]);

  //const ticketNumber = "INC" + ticketNum.toString().padStart(6, "0");
  /**
   * PUT the ticket data to the incident table on the database. Updating the fields that are edited
   */
  function putTicket(event) {
    axios({
      method: "PUT",
      url: `/api/editIncident/?incidentId=${incidentId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        ticketNumber: ticketNum,
        userId: user.id,
        status: status + 1,
        reportDateTime: reportDateTime,
        multipleAffectedUser: isMultipleAffected,
        affectedUserSize: ticket.affectedUserSize,
        impact: impact,
        urgency: urgency,
        priority: priority,
        ticketOwnerId: incidentData.ticketOwnerId,
        ticketDateTime: incidentData.ticketDateTime,
        assignedTechId: technician.id,
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
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });

    event.preventDefault();
  }

  function setStatusData(){
    // console.log(incStatus)
    setSteps([])
    incStatus.map((e) =>{
      setSteps(current => [...current, e.status_name])
    })
  }

  function handleGroup(incidentGroup) {
    setIncidentGroup(incidentGroup);
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
              Incident
            </Typography>

            <Box pb={5} sx={{ width: "100%" }}>
              <Stepper nonLinear alternativeLabel activeStep={activeStatus}>
                {steps.map((label, index) => (
                  <Step key={label}>
                    <StepButton
                      color="inherit"
                      onClick={handleStatusStep(index)}
                    >
                      <StepLabel>{label}</StepLabel>
                    </StepButton>
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
                    value={(ticketNum)}
                    disabled
                    fullWidth
                  />

                  <Box pt={2}>
                    <Autocomplete
                      defaultValue={user}
                      id="grouped-userList"
                      options={userLists}
                      groupBy={(option) => option.first_name[0]}
                      getOptionLabel={(option) =>
                        `${option.first_name} ${option.last_name}`
                      }
                      noOptionsText={"No Results Found"}
                      renderInput={(params) => (
                        <TextField required {...params} label="User" />
                      )}
                      onChange={(event, newValue) => {
                        setUser(newValue);
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
                      value={
                        userLists.find(
                          (item) => item.id === incidentData.ticketOwnerId
                        ).username
                      }
                      disabled
                      fullWidth
                    />

                    {currentUserRole !== "4" && (
                      <Box pt={2}>
                          <Autocomplete
                          defaultValue={secGroup.find(
                            (item) =>
                              item.securityGroupId === incidents.security_group
                          )}

                          id="securityGroup"
                          disableClearable
                          options={secGroup}
                          getOptionLabel={(option) => `${option.name}`}
                          noOptionsText={"No Results Found"}
                          renderInput={(params) => (
                            <TextField
                              name="securityGroup"
                              required
                              {...params}
                              label="Security Groups"
                            />
                          )}

                          onChange={(event, newValue) => {
                            handleGroup(newValue.securityGroupId);
                          }}
                        />
                      </Box>
                    )}

                    <Box pt={2.7}>
                      <Autocomplete
                        defaultValue={technician}
                        id="grouped-techncianList"
                        disableClearable
                        options={technicianLists}
                        getOptionSelected={(option, value) =>
                          option.value === value.value
                        }
                        groupBy={(option) => option.first_name[0]}
                        getOptionLabel={(option) =>
                          `${option.first_name} ${option.last_name}`
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
                          setTechnician(newValue);
                        }}
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={2} />

                  <Grid item xs={4}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DateTimePicker
                        label="Ticket Created At"
                        value={incidentData.ticketDateTime}
                        renderInput={(params) => (
                          <TextField {...params} sx={{ width: "100%" }} />
                        )}
                        disabled
                      />
                    </LocalizationProvider>

                    <Box pt={3}>
                      <Autocomplete
                        defaultValue={ticketTypeLists.find(
                          (item) => String(item.id) === String(incidentData.ticketType)
                        )}
                        name="ticketType"
                        id="grouped-ticketType"
                        options={ticketTypeLists}
                        groupBy={(option) => option.category}
                        getOptionLabel={(option) => `${option.type}`}
                        getOptionSelected={(option, value) =>
                          option.value === value.value
                        }
                        noOptionsText={"No Results Found"}
                        renderInput={(params) => (
                          <TextField required {...params} label="Ticket Type" />
                        )}
                        onChange={(event, newValue) => {
                          setTicketType(newValue.id);
                        }}
                      />
                    </Box>
                    {currentUserRole == 3 &&(
                    <Box pt={5}>
                        <FormControlLabel
                          control={<Switch color="primary" />}
                          label="Viewable to Students?"
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
                      label="Subject"
                      variant="filled"
                      fullWidth
                      defaultValue={String(incidentData.subject)}
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
                        defaultValue={String(incidentData.details)}
                        name="details"
                        onChange={handleChangeField}
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={1} />
                </Grid>
              </Box>

              <Box pt={5} textAlign="center">
                <Button type="submit" variant="contained" onClick={putTicket}>
                  Update
                </Button>
              </Box>

              <br />
              <Divider />

              <IncidentComments />
            </Box>
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={2} />
    </Grid>
  );
}

export default EditIncidentData;
