import React from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { Link, ListItemButton } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

/**
 * Returns the section class list based on the student's section.
 * 
 * @returns The section class list based on the student's section.
 */
function ClassDataGridStudent() {
  const [users, setStudentList] = useState([]);
  const [instructors, setInstructorList] = useState([]);
  const [roles, setRoles] = useState([]);
  const [sections, setSections] = useState([]);

  const [loading, setLoading] = useState(true);
  const [reloading, setReloading] = useState(false);

  let token = sessionStorage.getItem("access");

  const currentUserId = sessionStorage.getItem("userId");
  const currentUserSection = sessionStorage.getItem("section");

  /**
   *  Fetch all roles from the database and store it on Roles state.
   */
   function getRoles() {
    axios({
      method: "GET",
      url: "/api/roles/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const data = response.data;
        setRoles(data);
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
   * Fetch all users from the database and store it on Users state.
   */
  function getStudents() {
    axios({
      method: "GET",
      url: `/api/viewStudentData/`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const data = response.data;
        setStudentList(data)
        setReloading(false);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  function getInstructors() {
    axios({
      method: "GET",
      url: `/api/viewInstructorData/`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const data = response.data;
        setInstructorList(data)
        setReloading(false);
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
   * Fetch all sections from the database and store it on Sections state.
   */
  const getSections = async() => {
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
}

  useEffect(() => {
    getStudents();
    getInstructors();
    getRoles();
    getSections();
  }, []);

  useEffect(() => {
    getStudents();
    getInstructors();
  }, [reloading])

  useEffect(() => {
    if (users.length && roles.length) {
      setLoading(false);
    }
  });

    /**
   * Returns the role of the user.
   * 
   * @param {*} params 
   * @returns The role of the user.
   */
     function getClassRoleValue(params) {
      let value = "";
      // Loops through the roles to find exact value
      roles.forEach((role) => {
        if (role.roleId === params.row.role) {
          value = role.name;
        }
      });
  
      return value;
    }

  /**
   * Returns the section of the user.
   * 
   * @param {*} params 
   * @returns The section of the user.
   */
   function getSectionValue(params) {
    let sectionValue = "";

    sections.forEach((section) => {
      if (params.row.course_id === section.id) {
        sectionValue = section.section;
      }

      if (params.row.section === null) {
        sectionValue = "N/A";
      }
    });

    return sectionValue;
  }
  const instructorColumns = [
    { 
      field: "username",
      headerName: "Username",
      width: 180
    },
    { 
      field: "first_name",
      headerName: "First Name",
      width: 200
    },
    { 
      field: "last_name",
      headerName: "Last Name",
      width: 200
    },
    { 
      field: "email",
      headerName: "Email",
      width: 250
    },
    { 
      field: "role",
      headerName: "Role",
      width: 150,
      valueGetter: getClassRoleValue,
    },
    { 
      field: "section",
      headerName: "Section",
      width: 150,
      valueGetter: getSectionValue,
    },
    {
      field: "View",
      width: 80,
      headerAlign: "center",
      align: "center",
      renderCell: (cellValues) => {
        return (
          <Link href={`/user/view?userId=${cellValues.row.id}`}>
            <ListItemButton>
                <VisibilityIcon />
            </ListItemButton>
          </Link>  
        )
      },
    }
  ];

  const classColumns = [
    { 
      field: "username",
      headerName: "Username",
      width: 180
    },
    { 
      field: "first_name",
      headerName: "First Name",
      width: 200
    },
    { 
      field: "last_name",
      headerName: "Last Name",
      width: 200
    },
    { 
      field: "email",
      headerName: "Email",
      width: 250
    },
    { 
      field: "role",
      headerName: "Role",
      width: 150,
      valueGetter: getClassRoleValue,
    },
    { 
      field: "section",
      headerName: "Section",
      width: 150,
      valueGetter: getSectionValue,
    },
    {
      field: "View",
      width: 80,
      headerAlign: "center",
      align: "center",
      renderCell: (cellValues) => {
        return (
          <Link href={`/user/view?userId=${cellValues.row.id}`}>
            <ListItemButton>
                <VisibilityIcon />
            </ListItemButton>
          </Link>  
        )
      },
    },
    {
      field: "Edit",
      width: 80,
      headerAlign: "center",
      align: "center",
      renderCell: (cellValues) => {
        return (
          <>
            {cellValues.row.id === currentUserId &&
              <Link href={`/user/edit?userId=${cellValues.row.id}`}>
                <ListItemButton>
                    <EditIcon />
                </ListItemButton>
              </Link>  
            }
          </>
        )
      },
    }
  ];

  return (
    <>
      {loading || reloading ? (
        <div className="spinner">
          <span>Loading. . .</span>
          <div className="half-spinner"></div>
        </div>
      ) : (
        <>
            <div style={{ height: 163, width: "100%" }}>
                <DataGrid
                    rows={instructors}
                    getRowId={(instructors) => instructors.id}
                    columns={instructorColumns}
                    pageSize={1}
                    rowsPerPageOptions={[1]}
                    disableSelectionOnClick
                    initialState={{
                    sorting: {
                        sortModel: [
                        {
                            field: "userId",
                            sort: "desc",
                        },
                        ],
                    },
                    }}
                    />
            </div>

            <div style={{ height: 650, marginTop: "3vh", width: "100%" }}>
                <DataGrid
                    rows={users}
                    getRowId={(users) => users.id}
                    columns={classColumns}
                    pageSize={15}
                    rowsPerPageOptions={[10]}
                    disableSelectionOnClick
                    initialState={{
                      sorting: {
                          sortModel: [
                            {
                                field: "userId",
                                sort: "desc",
                            },
                          ],
                      },
                    }}
                />
            </div>
        </>
      )}
    </>
  );
}

export default ClassDataGridStudent;