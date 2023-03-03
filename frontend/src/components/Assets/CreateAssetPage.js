import React from "react";

import CreateAssetForm from "./CreateAssetForm"


/**
 * Loads the CreateAssetForm page.
 */
function CreateAssetPage() {
    document.title = "New Asset " + "- PiXELL-River";
   
    return (
        <>
            <CreateAssetForm />
        </>
    )
}

export default CreateAssetPage;