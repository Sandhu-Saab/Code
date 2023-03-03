import React from "react";

import CreateAssetForm from "../components/Assets/CreateAssetForm"

function CreateAssetPage() {
    document.title = "New Asset " + "- PiXELL-River";
   
    return (
        <>
            <CreateAssetForm />
        </>
    )
}

export default CreateAssetPage;