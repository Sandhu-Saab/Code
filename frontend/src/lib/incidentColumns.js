import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import moment from "moment";
import { Link, ListItemButton } from "@mui/material";

function getTicketNumber(params) {
    return `INC` + String(params.row.ticketNumber).padStart(6, "0");
  }

  function getDateFormat(params) {
    return moment(params.row.reportDateTime).format("MMM Do YYYY, h:mm a");
  }

  export const incidentstudentColumns = [
    {
      field: "ticketNumber",
      headerName: "Incident Number",
      width: 200,
      valueGetter: getTicketNumber,
    },
    {
      field: "userId",
      headerName: "User",
      width: 140,
      //valueGetter: getUsername,
    },
    {
      field: "status",
      headerName: "Status",
      width: 180,
      //valueGetter: getStatus,
    },
    {
      field: "priority",
      headerName: "Priority",
      width: 130,
      //valueGetter: getPriority,
    },
    { field: "subject", headerName: "Subject", width: 200 },
    {
      field: "assignedTechId",
      headerName: "Assigned Technician",
      width: 200,
      //valueGetter: getAssignedTech,
    },
    {
      field: "ticketDateTime",
      headerName: "Ticket Creation Time",
      width: 250,
      valueGetter: getDateFormat,
    },
    {
      field: "View",
      width: 60,
      headerAlign: "center",
      align: "center",
      renderCell: (cellValues) => {
        return (
          <Link href={`/incident/view?incidentId=${cellValues.row.id}`}>
            <ListItemButton>
                <VisibilityIcon />
            </ListItemButton>
          </Link>  
        );
      },
    },
    {
      field: "Edit",
      width: 60,
      headerAlign: "center",
      align: "center",
      renderCell: (cellValues) => {
        return (
          <Link href={`/incident/edit?incidentId=${cellValues.row.id}`}>
            <ListItemButton>
              <EditIcon />    
            </ListItemButton>
          </Link>  
        );
      },
    },
  ];

  export const incidentadminColumns = [
    {
        field: "ticketNumber",
        headerName: "Incident Number",
        width: 200,
        valueGetter: getTicketNumber,
      },
      {
        field: "ticketOwnerId",
        headerName: "Created By",
        width: 200,
        //valueGetter: getCreatedBy,
      },
      {
        field: "userId",
        headerName: "User",
        width: 140,
        //valueGetter: getUsername,
      },
      {
        field: "status",
        headerName: "Status",
        width: 180,
        //valueGetter: getStatus,
      },
      {
        field: "priority",
        headerName: "Priority",
        width: 130,
        //valueGetter: getPriority,
      },
      { field: "subject", headerName: "Subject", width: 200 },
      {
        field: "assignedTechId",
        headerName: "Assigned Technician",
        width: 200,
        //valueGetter: getAssignedTech,
      },
      {
        field: "reportDateTime",
        headerName: "Report Date Time",
        width: 250,
        valueGetter: getDateFormat,
      },
      {
        field: "View",
        width: 60,
        headerAlign: "center",
        align: "center",
        renderCell: (cellValues) => {
          return (
            <Link href={`/incident/view?incidentId=${cellValues.row.id}`}>
              <ListItemButton>
                  <VisibilityIcon />
              </ListItemButton>
            </Link>
          );
        },
      },
      {
        field: "Edit",
        width: 60,
        headerAlign: "center",
        align: "center",
        renderCell: (cellValues) => {
          return (
            <Link href={`/incident/edit?incidentId=${cellValues.row.id}`}>
              <ListItemButton>
                  <EditIcon />    
              </ListItemButton>
            </Link>
          );
        },
      },
    ];

    export const viewProblemRelatedColumn = [
        {
            field: "ticketNumber",
            headerName: "Incident Number",
            width: 200,
            valueGetter: getTicketNumber,
          },
          {
            field: "ticketOwnerId",
            headerName: "Created By",
            width: 200,
            //valueGetter: getCreatedBy,
          },
          {
            field: "userId",
            headerName: "User",
            width: 140,
            //valueGetter: getUsername,
          },
          {
            field: "status",
            headerName: "Status",
            width: 180,
            //valueGetter: getStatus,
          },
          {
            field: "priority",
            headerName: "Priority",
            width: 130,
            //valueGetter: getPriority,
          },
          { field: "subject", headerName: "Subject", width: 200 },
          {
            field: "assignedTechId",
            headerName: "Assigned Technician",
            width: 200,
            //valueGetter: getAssignedTech,
          },
          {
            field: "reportDateTime",
            headerName: "Report Date Time",
            width: 250,
            valueGetter: getDateFormat,
          },
        ];