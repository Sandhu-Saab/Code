import React from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { Link, ListItemButton} from "@mui/material";
import PreviewIcon from '@mui/icons-material/Preview';
import "../../layouts/preloader3.css";

// Start of the code.
function AccountApprovalGrid(props) {
  const [users, setNewUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [sections, setSections] = useState([]);

  const [loading, setLoading] = useState(true);
  const [reloading, setReloading] = useState(false);
  const [counter, setCounter] = useState(3);
  const [open, setOpen] = useState(true);

  let token = sessionStorage.getItem("access");

  useEffect(() => {
    getUnapprovedUsers();
    getRoles();
    getSections();
  }, []);

  useEffect(() => {
    getUnapprovedUsers();
  }, [reloading])

  useEffect(() => {
    if (users.length && roles.length) {
      setLoading(false);
    }
  });

  useEffect(() => {
    if (open) {
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }
}, [counter, open]);

  /**
   * Fetch all users from the database and store it on Users state.
   */
  function getUnapprovedUsers() {
    axios({
      method: "GET",
      url: `/api/unapprovedUsers/`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const data = response.data;
        setNewUsers(data);
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

      if(params.row.course_id === null){
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
      field: "section",
      headerName: "Section",
      width: 200,
      valueGetter: getSectionValue,
    },
    {
      field: "Review",
      width: 100,
      headerAlign: "center",
      align: "center",
      renderCell: (cellValues) => {
        return (
          <Link href={`/user/review?userId=${cellValues.row.id}`}>
            <ListItemButton>
              <PreviewIcon />
            </ListItemButton>
          </Link>
        )
      },
    }
  ];

  return (
    <>
      {loading || reloading ? (
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
                    field: "?",
                    sort: "desc",
                  },
                ],
              },
            }}
          />
        </div>
      )}
    </>
  );
}

export default AccountApprovalGrid;