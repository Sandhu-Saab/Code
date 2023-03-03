import axios from "axios";
import "../../layouts/preloader3.css";
import { useLocation } from "react-router-dom";
import EditRequestForm from "./EditRequestForm";
import React, { useState, useEffect } from "react";

function EditRequest() {
    const query = new URLSearchParams(useLocation().search);
    const requestId = query.get("requestId");
    document.title = "Edit Request Ticket #" + requestId + " - PiXELL-River";

    const [loading, setLoading] = useState(true);
    const token = sessionStorage.getItem("access");

    const [types, setTypes] = useState([]);
    const [status, setStatus] = useState([]);
    const [request, setRequest] = useState("");
    const [justification, setJustification] = useState("");
    const [assessment, setAssessment] = useState("");
    const [install, setInstall] = useState("");
    const [backout, setBackOut] = useState("");

    

    /**
     * Fetches specified request object from API.
     */
    const getRequest = async() => {
        try {
            const response = await axios({
                method: "GET",
                url: `/api/request/?requestId=${requestId}`,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.data;
            // console.log(data, "EditRequest.js");
            setRequest(data);
        } catch (error) {
            if (error.response) {
                console.log(error.response);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        }
    }


    /**
     * Fetches specified business justification object from the database.
     */
    const getBusinessJustification = async() => {
        try {
            const response = await axios({
                method: "GET",
                url: `/api/businessData/${request.business_justification}/`,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.data;
            // console.log(data, "EditRequest.js");
            setJustification(data);
        } catch (error) {
            if (error.response) {
                console.log(error.response);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        }
    }

    /**
     * Fetches specified risk assessment object from the database.
     */
    const getAssessment = async() => {
        try {
            const response = await axios({
                method: "GET",
                url: `/api/assessmentData/${request.risk_assesment}/`,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.data;
            // console.log(data, "EditRequest.js");
            setAssessment(data);
        } catch (error) {
            if (error.response) {
                console.log(error.response);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        }
    }

    /**
     * Fetches specified install plan object from the database.
     */
    const getInstall = async() => {
        try {
            const response = await axios({
                method: "GET",
                url: `/api/installPlanData/${request.install_plan}/`,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.data;
            // console.log(data, "EditRequest.js");
            setInstall(data);
        } catch (error) {
            if (error.response) {
                console.log(error.response);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        }
    }

    /**
     * Fetches specified back out plan object from the database.
     */
    const getBackOut = async() => {
        try {
            const response = await axios({
                method: "GET",
                url: `/api/backoutPlanData/${request.backout_plan}/`,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.data;
            // console.log(data, "EditRequest.js");
            setBackOut(data);
            console.log(data);
        } catch (error) {
            if (error.response) {
                console.log(error.response);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        }
    }

    useEffect(() => {
        getRequest();
    }, []);

    useEffect(() => {
        getBusinessJustification();
        getAssessment();
        getInstall();
        getBackOut();
    }, [request]);

    useEffect(() => {
        if (request && justification && assessment && install && backout) {
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
                <EditRequestForm
                    id={requestId}
                    request={request}
                    justification={justification}
                    assessment={assessment}
                    install={install}
                    backout={backout}
                />
            )}
        </>
    )
}

export default EditRequest;