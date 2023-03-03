import React from "react";
import { Link } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ListItemButton from "@mui/material/ListItemButton";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import AddTaskIcon from "@mui/icons-material/AddTask";
import classes from "./Sidebar.module.css";

//ICONS
import WarningIcon from "@mui/icons-material/Warning";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import InventoryIcon from "@mui/icons-material/Inventory";
import SwapHorizontalCircleIcon from "@mui/icons-material/SwapHorizontalCircle";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import AddBoxIcon from "@mui/icons-material/AddBox";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import ReportIcon from "@mui/icons-material/Report";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LockIcon from "@mui/icons-material/Lock";

import Navbar from "./Navbar";

// Width of the sidebar (px)
const drawerWidth = 280;

// Animation Functions
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(7)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

// Sub List items on the Side Bar LockIcon
const StudentIncidentSubNav = [
  {
    title: "New Incident",
    icon: <ConfirmationNumberIcon />,
    url: "/incident/new",
  },
  {
    title: "Incident Ticket List",
    icon: <FormatListBulletedIcon />,
    url: "/incident/all",
  },
  {
    title: "Open Incident Ticket",
    icon: <FindInPageIcon />,
    url: "/incident/open",
  },
  {
    title: "Resolved Incident Ticket",
    icon: <AssignmentTurnedInIcon />,
    url: "/incident/resolved",
  },
];

const AdminIncidentSubNav = [
  {
    title: "New Security Group",
    icon: <LockIcon />,
    url: "/incident/securitygroup/new",
  },
  {
    title: "New Incident",
    icon: <ConfirmationNumberIcon />,
    url: "/incident/new",
  },
  {
    title: "Incident Ticket List",
    icon: <FormatListBulletedIcon />,
    url: "/incident/all",
  },
  {
    title: "Open Incident Ticket",
    icon: <FindInPageIcon />,
    url: "/incident/open",
  },
  {
    title: "Resolved Incident Ticket",
    icon: <AssignmentTurnedInIcon />,
    url: "/incident/resolved",
  },
];

const ProblemSubNav = [
  {
    title: "New Problem",
    icon: <ConfirmationNumberIcon />,
    url: "/problem/new",
  },
  {
    title: "Problem Ticket List",
    icon: <FormatListBulletedIcon />,
    url: "/problem/all",
  },
  {
    title: "Open Problem Ticket",
    icon: <FindInPageIcon />,
    url: "/problem/open",
  },
  {
    title: "Resolved Problem Ticket",
    icon: <AssignmentTurnedInIcon />,
    url: "/problem/resolved",
  },
];

const AssetSubNav = [
  { title: "New Asset", icon: <AddBoxIcon />, url: "/asset/new" },
  { title: "Asset List", icon: <FormatListBulletedIcon />, url: "/asset/all" },
];

const ChangeSubNav = [
  { title: "New Change Request", icon: <RequestPageIcon />, url: "/change/new" },
  {
    title: "Change Request List",
    icon: <FormatListBulletedIcon />,
    url: "/change/all",
  },
];
const ExportSubNav = [
  { title: "Export Data", icon: <RequestPageIcon />, url: "/export/new" },
];

const AdminUserSubNav = [
  { title: "New User", icon: <PersonAddIcon />, url: "/user/new" },
  { title: "New Section", icon: <GroupAddIcon />, url: "/section/new" }, // Added
  { title: "User List", icon: <FormatListBulletedIcon />, url: "/user/all" },
  { title: "Section List", icon: <FormatListBulletedIcon />, url: "/section/all" },
  { title: "Account Approval List", icon: <AddTaskIcon />, url: "/user/approval", },
];

const InstructorUserSubNav = [
  { title: "New User", icon: <PersonAddIcon />, url: "/user/new" },
  { title: "Class List", icon: <PeopleAltIcon />, url: "/user/class-all" },
  { title: "Account Approval List", icon: <AddTaskIcon />, url: "/user/approval", },
]
const TechnicianSubNav = [
  { title: "New User", icon: <PersonAddIcon />, url: "/user/new" },
  { title: "User List", icon: <PeopleAltIcon />, url: "/user/all" },
];
const StudentSubNav = [
  { title: "New User", icon: <PersonAddIcon />, url: "/user/new" },
  { title: "Class List", icon: <PeopleAltIcon />, url: "/user/class-all" },
];

function Sidebar2({content, breadcrumbs}) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [openIncidentManagement, setOpenIncidentManagement] =
    React.useState(false);
  const [openProblemManagement, setOpenProblemManagement] =
    React.useState(false);
  const [openAssetManagement, setOpenAssetManagement] = React.useState(false);
  const [openChangeManagement, setOpenChangeManagement] = React.useState(false);
  const [openUserManagement, setOpenUserManagement] = React.useState(false);
  const [openExportData, setOpenExportData] = React.useState(false);

  let userBasedSubNav;
  let userBasedIncidentSubNav;
  let currentUserRole = sessionStorage.getItem("roleId");

  // Side Bar Incident Management Navigation permissions based on user role.
  if (currentUserRole === "4") {
    userBasedIncidentSubNav = StudentIncidentSubNav;
  } else {
    userBasedIncidentSubNav = AdminIncidentSubNav;
  }
  // Side Bar User Management Navigation permissions based on user role.
  if (currentUserRole === "4") {
    userBasedSubNav = StudentSubNav;
  } else if (currentUserRole === "3") {
    userBasedSubNav = InstructorUserSubNav;
  } else if (currentUserRole === "2") {
    userBasedSubNav = TechnicianSubNav;
  } else {
    userBasedSubNav = AdminUserSubNav;
  }


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClickIncidentManagement = () => {
    setOpenIncidentManagement(!openIncidentManagement);
  };

  const handleClickProblemManagement = () => {
    setOpenProblemManagement(!openProblemManagement);
  };

  const handleClickAssetManagement = () => {
    setOpenAssetManagement(!openAssetManagement);
  };

  const handleClickChangeManagement = () => {
    setOpenChangeManagement(!openChangeManagement);
  };

  const handleClickUserManagement = () => {
    setOpenUserManagement(!openUserManagement);
  };
  const handleClickExportData = () => {
    setOpenExportData(!openExportData);
  };


  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* DRAWER STARTS */}
      <Drawer variant="permanent" open={open}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Navbar breadcrumbs={breadcrumbs}/>
          </Toolbar>
          
        </AppBar>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem button onClick={handleClickIncidentManagement}>
            <ListItemIcon>
              <WarningIcon />
            </ListItemIcon>
            <ListItemText primary="Incident Management" />
            {openIncidentManagement ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openIncidentManagement} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {userBasedIncidentSubNav.map((subNav) => (
                <Link to={subNav.url} className={classes.link}>
                  <ListItemButton>
                    <ListItemIcon>{subNav.icon}</ListItemIcon>
                    <ListItemText primary={subNav.title} />
                  </ListItemButton>
                </Link>
              ))}
            </List>
          </Collapse>
          <Divider />

          <ListItem button onClick={handleClickProblemManagement}>
            <ListItemIcon>
              <ReportIcon />
            </ListItemIcon>
            <ListItemText primary="Problem Management" />
            {openProblemManagement ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openProblemManagement} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {ProblemSubNav.map((subNav) => (
                <Link to={subNav.url} className={classes.link}>
                  <ListItemButton>
                    <ListItemIcon>{subNav.icon}</ListItemIcon>
                    <ListItemText primary={subNav.title} />
                  </ListItemButton>
                </Link>
              ))}
            </List>
          </Collapse>
          <Divider />

          <ListItem button onClick={handleClickAssetManagement}>
            <ListItemIcon>
              <InventoryIcon />
            </ListItemIcon>
            <ListItemText primary="Asset Management" />
            {openAssetManagement ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openAssetManagement} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {AssetSubNav.map((subNav) => (
                <Link to={subNav.url} className={classes.link}>
                  <ListItemButton>
                    <ListItemIcon>{subNav.icon}</ListItemIcon>
                    <ListItemText primary={subNav.title} />
                  </ListItemButton>
                </Link>
              ))}
            </List>
          </Collapse>
          <Divider />

          <ListItem button onClick={handleClickChangeManagement}>
            <ListItemIcon>
              <SwapHorizontalCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Change Management" />
            {openChangeManagement ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openChangeManagement} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {ChangeSubNav.map((subNav) => (
                <Link to={subNav.url} className={classes.link}>
                  <ListItemButton>
                    <ListItemIcon>{subNav.icon}</ListItemIcon>
                    <ListItemText primary={subNav.title} />
                  </ListItemButton>
                </Link>
              ))}
            </List>
          </Collapse>
          <Divider />

          <ListItem button onClick={handleClickUserManagement}>
            <ListItemIcon>
              <ManageAccountsIcon />
            </ListItemIcon>
            <ListItemText primary="User Management" />
            {openUserManagement ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openUserManagement} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {userBasedSubNav.map((subNav) => (
                <Link to={subNav.url} className={classes.link}>
                  <ListItemButton>
                    <ListItemIcon>{subNav.icon}</ListItemIcon>
                    <ListItemText primary={subNav.title} />
                  </ListItemButton>
                </Link>
              ))}
            </List>
          </Collapse>
          <Divider />
          <ListItem button onClick={handleClickExportData}>
          <ListItemIcon>
            <ManageAccountsIcon />
          </ListItemIcon>
          <ListItemText primary="Export Data" />
          {openExportData ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openExportData} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {ExportSubNav.map((subNav) => (
              <Link to={subNav.url} className={classes.link}>
                <ListItemButton>
                  <ListItemIcon>{subNav.icon}</ListItemIcon>
                  <ListItemText primary={subNav.title} />
                </ListItemButton>
              </Link>
            ))}
          </List>
        </Collapse>
        <Divider />
        </List>
      </Drawer>
      {/* END DRAWER */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {/* CONTENTS HERE */}
        {content}
      </Box>
    </Box>
  );
}

export default Sidebar2;
