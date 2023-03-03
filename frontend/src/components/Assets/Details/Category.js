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
 * Creates the dropdown selected for the category field.
 * 
 * @param {Handles Change event of dropdown.} handleChange
 * @param {Category Data used to populate dropdown.} category 
 * @returns The selected category ID value of category.
 */
function Category({ handleChange, errorAssetDetails, editCategory }) {
    const categoryList = ["None", "Hardware", "Software"];

    return (
        <>
            {window.location.pathname !== "/asset/edit" ? (
                 <Autocomplete
                     id="category"
                     name="category"
                     disableClearable
                     options={categoryList}
                     onChange={handleChange}
                     noOptionsText={"No Results Found"}
                     getOptionLabel={(option) => `${option}`}
                     renderInput={(params) => (
                         <TextField
                             label="Category"
                             required {...params}
                             error={errorAssetDetails.errorCategory}
                             helperText={errorAssetDetails.errorCategory}
                         />
                     )}
                 />
                // <>
                //     <FormControl sx={{ width: '100%' }} required>
                //         <InputLabel id="category">
                //             Category
                //         </InputLabel>

                //         <Select
                //             required
                //             name="category"
                //             labelId="category"
                //             id="category"
                //             label="Category"
                //             onChange={handleChange}
                //         >
                //             {/* {categoryList.map((data, index) => (
                //                 <MenuItem key={index} value={data.detailCategoryId}>{data.name}</MenuItem>
                //             ))} */}
                //             <MenuItem key={1} value={"None"}>None</MenuItem>
                //             <MenuItem key={2} value={"Hardware"}>Hardware</MenuItem>
                //             <MenuItem key={3} value={"Software"}>Software</MenuItem>
                //         </Select>
                //     </FormControl>
                // </>
            ) : (
                <>
                    <FormControl sx={{ width: '100%' }} required>
                        <InputLabel id="category">
                            Category
                        </InputLabel>

                        <Select
                            required
                            name="category"
                            labelId="category"
                            id="category"
                            label="Category"
                            defaultValue={editCategory}
                            onChange={handleChange}
                        >
                            {/* {categoryList.map((data, index) => (
                                <MenuItem key={index} value={data.detailCategoryId}>{data.name}</MenuItem>
                            ))} */}
                            <MenuItem key={1} value={"None"}>None</MenuItem>
                            <MenuItem key={2} value={"Hardware"}>Hardware</MenuItem>
                            <MenuItem key={3} value={"Software"}>Software</MenuItem>
                        </Select>
                    </FormControl>
                </>
            )}
        </>
    )
}

export default Category;