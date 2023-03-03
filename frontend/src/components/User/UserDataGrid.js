import React from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { Link, ListItemButton } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from "@mui/icons-material/Visibility";

import "../../layouts/preloader3.css";
import ConfirmModal from "../../layouts/ConfirmModal";

function UserDataGrid() {
  const [roles, setRoles] = useState([]);
  const [users, setNewUsers] = useState([]);
  const [sections, setSections] = useState([]);

  const [loading, setLoading] = useState(true);

  const [dialogIsOpen, setDialogIsOpen] = React.useState(false);
  const [selectedRowId, setSelectedRowId] = React.useState(null);
  const [counter, setCounter] = useState(3);
  const [open, setOpen] = useState(true);

  const currentUserId = sessionStorage.getItem("userId");
  const currentUserRole = sessionStorage.getItem("roleId");

  let token = sessionStorage.getItem("access");

  /**
   * Fetch all users from the database and store it on Users state.
   */
  function getUsers() {
    axios({
      method: "GET",
      url: `/api/viewUserList/`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const data = response.data;
        setNewUsers(data);
        setLoading(false);
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
    getUsers();
    getRoles();
    getSections();
  }, []);

  useEffect(() => {
    if (roles.length && users.length && sections.length) {
      setLoading(false);
    }
  });

  useEffect(() => {
      if (open) {
          counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
      }
  }, [counter, open]);

  const handleDialogOpen = (props) => {
    setDialogIsOpen(true);
    setSelectedRowId(props.id);
  };

  const handleDialogClose = () => {
    setDialogIsOpen(false);
  };

  /**
   * Deletes the user from the database.
   */
  function DeleteUser() {
    axios({
      method: "DELETE",
      url: `/api/users/${selectedRowId}/`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      getUsers();
    });

    setDialogIsOpen(false);
  }

  // **************Value Getter ******************
  /**
   * Returns the role of the user.
   * 
   * @param {*} params 
   * @returns The role of the user.
   */
  function getRoleValue(params) {
    let value = "";

    // Loops through the roles to find exact value
    roles.forEach((role) => {
      if (role.roleId === Number.parseInt(params.row.role_id)) {
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
      if (params.row.course_id_id === section.id) {
        sectionValue = section.section;
      }

      if (params.row.section === null) {
        sectionValue = "N/A";
      }
    });

    return sectionValue;
  }
 
  const columns = [
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
      field: "role_id",
      headerName: "Role",
      width: 150,
      valueGetter: getRoleValue,
    },
    { 
      field: "course_id_id",
      headerName: "Section",
      width: 150,
      valueGetter: getSectionValue,
    },
    {
      field: "View",
      width: 60,
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
      width: 60,
      headerAlign: "center",
      align: "center",
      renderCell: (cellValues) => {
        return (
                <div>
            {
                (() => {
                    if(currentUserRole === "1") {
                            return (
                            <Link href={`/user/edit?userId=${cellValues.row.id}`}>
                              <ListItemButton>
                                <EditIcon />
                              </ListItemButton>
                            </Link>
                            )
                        } else if (currentUserRole === "2") {
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
                        } 
                })()  
            } 
                </div>
        );
      },
    },
    {
      field: "Delete",
      width: 75,
      headerAlign: "center",
      align: "center",
      renderCell: (cellValues) => {
        return (

            <Link
              onClick={() => {
                handleDialogOpen({id: cellValues.row.id});
              }}>
              <ListItemButton>
                <DeleteIcon />
              </ListItemButton>
            </Link>      
        );
      },
    },
  ];

  document.title = "All Users " + "- PiXELL-River";

  return (
    <>
      {loading ? (
        <div className="spinner">
          {counter !== 0 ? (
          <>
              <span>Loading. . .</span>
              <div className="half-spinner"></div>
          </>
          ) : (
          <h1>No Users Found</h1>
          )}
        </div>
      ) : (
        <div style={{ height: 800, width: "100%" }}>
          <DataGrid
            rows={users}
            getRowId={(users) => users.id}
            columns={columns}
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
          { dialogIsOpen &&  <ConfirmModal  title="Delete User" message="Are you sure you want to delete user?" selectedRowId={selectedRowId} onCancel={handleDialogClose} onConfirm={DeleteUser} /> }
        </div>
      )}
    </>
  );
}

export default UserDataGrid;
