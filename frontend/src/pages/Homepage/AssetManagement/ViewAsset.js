import axios from "axios";
import "../../../layouts/preloader3.css";
import ViewAssetForm from "../../../components/Assets/ViewAssetForm";
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";

function  ViewAsset() {
    const query = new URLSearchParams(useLocation().search);
    const assetId = query.get("assetId");

    document.title = "View Asset Ticket #" + assetId + " - PiXELL-River";

    const [asset, setAsset] = useState();
    const [loading, setLoading] = useState(true);
    const token = sessionStorage.getItem("access");

    /**
     * Fetches specified asset object from API.
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

    useEffect(() => {
        getAsset();
    }, []);

    useEffect(() => {
        if (asset) {
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
                <ViewAssetForm id={assetId} asset={asset}/>
            )}
        </>
    )
}

export default ViewAsset;