import React, { useState, useEffect } from "react";
import { TextField, Autocomplete } from "@mui/material";

/**
 * Creates the dropdown selected for the owner field.
 * 
 * @param {Handles Change event of dropdown.} handleChange
 * @param {Users Data used to populate dropdown.} users 
 * @returns The selected user ID value of owner.
 */
function Owner({ handleChange, users, errorAssetDetails, editOwner }) {
    const [userList, setUserList] = useState(users);

    useEffect(() => {
        setUserList(users);
    }, [users]);

    return (
        <>
            {window.location.pathname !== "/asset/edit" ? (
                <Autocomplete
                    id="owner"
                    name="owner"
                    disableClearable
                    options={userList}
                    onChange={handleChange}
                    noOptionsText={"No Results Found"}
                    groupBy={(option) => option.first_name[0]}
                    getOptionLabel={(option) => `${option.first_name} ${option.last_name}`}
                    renderInput={(params) => (
                        <TextField
                            label="Owner"
                            required {...params}
                            error={errorAssetDetails.errorOwner}
                            helperText={errorAssetDetails.errorOwner}
                        />
                    )}
                />
            ) : (
                <Autocomplete
                    defaultValue={userList.find(
                        (item) => item.id === editOwner
                    )}
                    
                    id="owner"
                    disableClearable
                    name="owner"
                    options={userList}
                    onChange={handleChange}
                    noOptionsText={"No Results Found"}
                    groupBy={(option) => option.first_name[0]}
                    getOptionLabel={(option) => `${option.first_name} ${option.last_name}`}
                    renderInput={(params) => (
                        <TextField
                            label="Owner"
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

export default Owner;