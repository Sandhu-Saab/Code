import axios from "axios";
import "../../layouts/preloader3.css";
import EditAssetForm from './EditAssetForm';
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { GRID_CHECKBOX_SELECTION_COL_DEF } from "@mui/x-data-grid";

function EditAsset() {
    const query = new URLSearchParams(useLocation().search);
    const assetId = query.get("assetId");
    const licenseId = query.get("licenseId");

    document.title = "Edit Asset Ticket #" + assetId + " - PiXELL-River";

    const [asset, setAsset] = useState();
    const [license, setLicense] = useState();
    const [loading, setLoading] = useState(true);
    const token = sessionStorage.getItem("access");

    /**
     * Fetches specified asset object from database.
     */
    const getAsset = async() => {
        try {
            const response = await axios({
                method: "GET",
                url: `/api/asset/?assetId=${assetId}`,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.data;
            setAsset(data);
        } catch (error) {
            if (error.response) {
                console.log(error.response);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        }
    }

    /**
     * Get specified License from database.
     */
    const getLicense = async() => {
        try {
            const response = await axios({
                method: "GET",
                url: `/api/licenseData/${licenseId}/`,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.data;

            setLicense(data);
        } catch (error) {
            if(error.response) {
                console.log(error.response);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        }
    };

    useEffect(() => {
        getAsset();
        getLicense();
    }, []);
    


    useEffect(() => {
        if (asset && license) {
            setLoading(false);
        }
    });

    return (
        <>
            {loading ? (
                <div className="spinner">
                    <span>Loading. . .</span>
                    <div className="half-spinner"></div>
                </div>
            ) : (
                <EditAssetForm id={assetId} licenseId={licenseId} asset={asset} license={license} />
            )}
        </>
    )
}

export default EditAsset;