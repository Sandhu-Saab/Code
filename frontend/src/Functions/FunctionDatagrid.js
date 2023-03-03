import React from 'react'
import Box from '@mui/material/Box';
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import moment from "moment";
import { DataGrid } from '@mui/x-data-grid';
import { getDateFormat, getTicketNumber } from '../lib/problemColumns';

function FunctionDataGrid({rows,columns}){
    return(
        <DataGrid
        rows={rows}
        getRowId={(rows) => rows.id}
        columns={columns}
        pageSize={13}
        rowsPerPageOptions={[13]}
        disableSelectionOnClick
      />
    )
}
export default FunctionDataGrid;
