import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Link, ListItemButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

function ViewSecurityGroupUsers() {
  let token = sessionStorage.getItem("access");
  const [group, setGroup] = useState([]);
  const [users, setUsers] = useState([]);
  const query = new URLSearchParams(useLocation().search);
  const securityGroupId = query.get("securityGroupId");
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(3);
  const [open, setOpen] = useState(true);

  /**
   * Fetches the groups and stores in a useState to display in datagrid.
   */
  function getGroups() {
    axios({
      method: "GET",
      url: `/api/securitygroupsusers/${securityGroupId}/`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const data = response.data;
        setGroup(data.name);
        setUsers(data.users);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  useEffect(() => {
    getGroups();
  }, []);

  useEffect(() => {
    if (group.length) {
      setLoading(false);
    }
  });

  const columns = [
    {
      field: "username",
      headerName: "Username",
      width: 180,
    },
    {
      field: "first_name",
      headerName: "First Name",
      width: 200,
    },
    {
      field: "last_name",
      headerName: "Last Name",
      width: 200,
    },
    {
        field: "Edit",
        width: 60,
        headerAlign: "center",
        align: "center",
        renderCell: (cellValues) => {
          return (
            <Link href={`/user/edit?userId=${cellValues.row.id}`}>
              <ListItemButton>
                  <EditIcon />    
              </ListItemButton>
            </Link>
          );
        },
      },
    ];

    useEffect(() => {
      if (open) {
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
      }
    }, [counter, open]);

  document.title = "Security Group " + group + ": All Users " + "- PiXELL-River";

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
          <h1>No Rows Found</h1>
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
        </div>
      )}
    </>
  );
}

export default ViewSecurityGroupUsers;
