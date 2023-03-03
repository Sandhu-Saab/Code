import React, { useEffect, useState } from 'react'
import {
    List,
    ListSubheader,
    ListItemButton,
    ListItemText,
    Collapse,
    Grid,
} from "@mui/material";

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import axios from "axios";
import '../../layouts/preloader3.css';

const columns = [
    {
        field: 'assetId',
        headerName: 'ID',
        width: 50,
        headerAlign: "center",
        align: "center",
    },
    {
        field: 'name',
        headerName: 'Name',
        width: 150,
        headerAlign: "center",
        align: "center",
    },
    {
        field: 'category',
        headerName: 'Category',
        width: 110,
        valueGetter: getCategory,
        headerAlign: "center",
        align: "center",
    },
    {
        field: 'ipAddress',
        headerName: 'IP Address.',
        type: 'number',
        width: 150,
        headerAlign: "center",
        align: "center",
    },
    {
        field: 'serialNumber',
        headerName: 'Serial No.',
        type: 'number',
        width: 150,
        headerAlign: "center",
        align: "center",
    },
    {
        field: 'assignedTo',
        headerName: 'Assigned To',
        width: 150,
        headerAlign: "center",
        align: "center",
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 130,
        valueGetter: getStatus,
        headerAlign: "center",
        align: "center",
    },
];

// **************Value Getter***************

function getCategory(params) {
    switch (params.row.category) {
        case 1:
            return "Hardware";
        case 2:
            return "Software";

        default:
            return null;
    }
};

function getStatus(params) {
    switch (params.row.category) {
        case 1:
            return "In-Use";
        case 2:
            return "In-Maintenance";
        case 3:
            return "In-Inventory";
        case 4:
            return "Unassigned";

        default:
            return null;
    }
};

/**
 * SelectAsset dropdown form component for CreateRequest page
 * Parent component: CreateRequest
 */
function SelectAsset(props) {
    const [open, setOpen] = useState(false);
    const [assetList, setAssetList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedId, setSelectedId] = useState();

    const token = sessionStorage.getItem("access");

    useEffect(() => {
        getAssets();
    }, []);

    useEffect(() => {
        if (assetList.length) {
            setLoading(false);
        }
    });

    const handleCollapse = () => {
        setOpen(!open);
    };

    /**
   *  Fetch all assets from the database and store it on assetList state
   */
    function getAssets() {
        axios({
            method: "GET",
            url: "/api/api/assets/?isActive=true",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                const data = response.data;
                setAssetList(data);
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            });
    };

    return (
        <List
            sx={{ width: '100%', maxWidth: 1200, color: 'white', bgcolor: '#1e88e5', borderRadius: 2 }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                </ListSubheader>
            }
        >
            <ListItemButton onClick={handleCollapse}>
                <ListItemText primary="Select Asset" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Box p={4} component="div" disablePadding
                    sx={{ color: 'black', bgcolor: '#ffebee', border: 0, borderColor: 'primary.main' }}
                >
                    {loading ? (
                        <div className="spinner">
                            <span>Loading. . .</span>
                            <div className="half-spinner"></div>
                        </div>
                    ) : (
                        <Grid container spacing={2}>
                            <Grid item xs={1} />
                            <div style={{ height: 400, width: '100%' }}>
                                <DataGrid
                                    rows={assetList}
                                    getRowId={(assetList) => assetList.assetId}
                                    columns={columns}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]}
                                    checkboxSelection
                                    disableSelectionOnClick
                                    onSelectionModelChange={(id) => {
                                        setSelectedId(id);
                                        props.onSelectAssetChange(id);
                                    }}
                                />
                            </div>
                            <Grid item xs={1} />
                        </Grid>
                    )}
                </Box>
            </Collapse>
        </List>
    );
};

export default SelectAsset;