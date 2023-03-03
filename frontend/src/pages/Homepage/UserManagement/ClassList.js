import React from "react";
import { Box } from "@mui/material";
import Sidebar2 from "../../../layouts/Sidebar2";
import ClassDataGridStudent from "../../../components/User/ClassDataGridStudent";
import ClassDataGridInstructor from "../../../components/User/ClassDataGridInstructor";
import Typography from "@mui/material/Typography";

// Page for User List

function ClassList() {
  let sidebar;
  const currentUserRole = sessionStorage.getItem("roleId");
  const currentUserSection = sessionStorage.getItem("section");


  const breadcrumbs = [
    <Typography key="3">User Management</Typography>,
    <Typography key="3" color="text.primary">
      Section {currentUserSection} Class List
    </Typography>,
  ];

  if (currentUserRole === "4") {
    sidebar = <Sidebar2 content={<ClassDataGridStudent />} breadcrumbs={breadcrumbs}/>
  }
   else {
    sidebar = <Sidebar2 content={<ClassDataGridInstructor />} breadcrumbs={breadcrumbs}/>
  }

  document.title = `${currentUserSection} Class - PiXELL-River`;  

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        {sidebar}
      </Box>
    </div>
  );
}

export default ClassList;
