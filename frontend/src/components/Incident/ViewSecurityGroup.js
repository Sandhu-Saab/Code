import axios from "axios";
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link, ListItemButton, ListItemIcon } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";

function ViewSecurityGroup() {
  let token = sessionStorage.getItem("access");
  const [group, setGroup] = useState([]);
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(3);
  const [open, setOpen] = useState(true);

  /**
   * Column data used to display the security groups data grid.
   */
  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 340,
    },
    {
      field: "View",
      width: 60,
      headerAlign: "center",
      align: "center",
      renderCell: (cellValues) => {
        return (
          <Link
            href={`/incident/securitygroup/view?securityGroupId=${cellValues.row.securityGroupId}`}
          >
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
          <Link href={`/incident/securitygroup/edit?securityGroupId=${cellValues.row.securityGroupId}`}>
            <ListItemButton>
              <EditIcon />    
            </ListItemButton>
          </Link>
        );
      },
    },
  ];

  /**
   * Fetches the groups and stores in a useState to display in datagrid.
   */
  function getGroups() {
    axios({
      method: "GET",
      url: "/api/securitygroups/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const data = response.data;
        setGroup(data);
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

  useEffect(() => {
    getGroups();
  }, [group.length]);

  useEffect(() => {
    if (open) {
      counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }
  }, [counter, open]);

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
              <h1>No Groups Found</h1>
          )}
          

        </div>
      ) : (
        <DataGrid
          rows={group}
          getRowId={(group) => group.securityGroupId}
          sx={{
            height: 400,
          }}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableColumnSelector
          disableSelectionOnClick
          initialState={{
            sorting: {
              sortModel: [
                {
                  field: "securityGroupId",
                  sort: "asc",
                },
              ],
            },
          }}
        />
      )}
    </>
  );
}

export default ViewSecurityGroup;
