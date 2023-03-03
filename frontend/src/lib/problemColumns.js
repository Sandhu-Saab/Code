import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import moment from "moment";
import { Link, ListItemButton } from "@mui/material";

export function getTicketNumber(params) {
    return `PRB` + String(params.row.ticketNumber).padStart(6, "0");
  }

  export function getDateFormat(params) {
    return moment(params.row.reportDateTime).format("MMM Do YYYY, h:mm a");
  }

  export const studentColumns = [
    {
      field: "id",
      headerName: "Problem Number",
      width: 200,
      valueGetter: getTicketNumber,
    },
    {
      field: "userId",
      headerName: "User",
      width: 200,
      //valueGetter: getUsername,
    },
    {
      field: "status",
      headerName: "Status",
      width: 200,
      //valueGetter: getStatus,
    },
    {
      field: "priority",
      headerName: "Priority",
      width: 150,
      //valueGetter: getPriority,
    },
    { field: "summary", headerName: "Summary", width: 200 },
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
          <Link href={`/problem/view?problemId=${cellValues.row.id}`}>
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
          <Link href={`/problem/edit?problemId=${cellValues.row.id}`}>
            <ListItemButton>
                <EditIcon />    
            </ListItemButton>
          </Link>
        );
      },
    },
  ];

  export const adminColumns = [
    {
      field: "problemId",
      headerName: "Problem Number",
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
      width: 200,
      //valueGetter: getUsername,
    },
    {
      field: "status",
      headerName: "Status",
      width: 200,
      //valueGetter: getStatus,
    },
    {
      field: "priority",
      headerName: "Priority",
      width: 150,
      //valueGetter: getPriority,
    },
    { field: "summary", headerName: "Summary", width: 200 },
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
          <Link href={`/problem/view?problemId=${cellValues.row.id}`}>
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
          <Link href={`/problem/edit?problemId=${cellValues.row.id}`}>
              <ListItemButton>
                  <EditIcon />    
              </ListItemButton>
          </Link>
        );
      },
    },
  ];