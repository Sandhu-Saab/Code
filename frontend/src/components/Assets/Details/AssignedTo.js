import React, { useState, useEffect } from "react";
import { TextField, Autocomplete } from "@mui/material";

/**
 * Creates the dropdown selected for the assigned to field.
 * 
 * @param {Handles Change event of dropdown.} handleChange
 * @param {Users Data used to populate dropdown.} users 
 * @returns The selected user ID value of assigned to.
 */
function AssignedTo({ handleChange, users, errorAssetDetails, editAssign }) {
    const [userList, setUserList] = useState(users);

    useEffect(() => {
        setUserList(users);
    }, [users]);

    return (
        <>
            {window.location.pathname !== "/asset/edit" ? (
                <Autocomplete
                    id="assignedTo"
                    disableClearable
                    name="assignedTo"
                    options={userList}
                    onChange={handleChange}
                    noOptionsText={"No Results Found"}
                    groupBy={(option) => option.first_name[0]}
                    getOptionLabel={(option) => `${option.first_name} ${option.last_name}`}
                    renderInput={(params) => (
                        <TextField
                            label="Assigned To"
                            required {...params}
                            error={errorAssetDetails.errorAssign}
                            helperText={errorAssetDetails.errorAssign}
                        />
                    )}
                />
            ) : (
                <Autocomplete
                    defaultValue={userList.find(
                        (item) => item.id === editAssign
                    )}
                    
                    id="assignedTo"
                    disableClearable
                    name="assignedTo"
                    options={userList}
                    onChange={handleChange}
                    noOptionsText={"No Results Found"}
                    groupBy={(option) => option.first_name[0]}
                    getOptionLabel={(option) => `${option.first_name} ${option.last_name}`}
                    renderInput={(params) => (
                        <TextField
                            label="Assigned To"
                            required {...params}
                            error={errorAssetDetails.errorAssign}
                            helperText={errorAssetDetails.errorAssign}
                        />
                    )}
                />
            )}
        </>
    )
}

export default AssignedTo;