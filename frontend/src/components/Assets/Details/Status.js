import React, { useState, useEffect } from "react";
import {
    Select,
    MenuItem,
    TextField,
    InputLabel,
    FormControl,
    Autocomplete,
} from "@mui/material";

/**
 * Creates the dropdown selected for the status field.
 * 
 * @param {Handles Change event of dropdown.} handleChange
 * @param {Status Data used to populate dropdown.} status 
 * @returns The selected status ID value of status.
 */
function Status({ handleChange, status, errorAssetDetails, editStatus }) {
    const [statusList, setStatusList] = useState([]);

    useEffect(() => {
        setStatusList(status);
    }, [status]);

    return (
        <>
            {window.location.pathname !== "/asset/edit" ? (
                <Autocomplete
                    id="status"
                    name="status"
                    disableClearable
                    options={statusList}
                    onChange={handleChange}
                    noOptionsText={"No Results Found"}
                    getOptionLabel={(option) => `${option.name}`}
                    renderInput={(params) => (
                        <TextField
                            label="Status"
                            required {...params}
                            error={errorAssetDetails.errorStatus}
                            helperText={errorAssetDetails.errorStatus}
                        />
                    )}
                />
            ) : (
                <FormControl sx={{ width: '100%' }} required>
                    <InputLabel id="status">
                        Status
                    </InputLabel>

                    <Select
                        required
                        name="status"
                        labelId="status"
                        id="status"
                        label="Status"
                        defaultValue={editStatus}
                        onChange={handleChange}
                    >
                        {statusList.map((data, index) => (
                            <MenuItem key={index} value={data.asset_status_id}>{data.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}
        </>
    )
}

export default Status;