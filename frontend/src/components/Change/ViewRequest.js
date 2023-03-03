import axios from "axios";
import "../../layouts/preloader3.css";
import ViewRequestForm from "./ViewRequestForm";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function ViewRequest() {
    const query = new URLSearchParams(useLocation().search);
    const requestId = query.get("requestId");

    document.title = "View Request Ticket #" + requestId + " - PiXELL-River";

    const [type, setType] = useState();
    const [status, setStatus] = useState();
    const [request, setRequest] = useState();
    const [loading, setLoading] = useState(true);
    const [counter, setCounter] = useState(3);
    const token = sessionStorage.getItem("access");

    /**
     * Fetches specified asset object from API.
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
            setRequest(data);
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
        if (request) {
            setLoading(false);
        }
    });

    useEffect(() => {
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
        
    }, [counter]);


    return (
        <>
            {loading ? (
                <div className="spinner">
                    {counter !== 0 ? (
                        <>
                            <span>Loading. . .</span>
                            <div className="half-spinner"></div>
                        </>
                    ) : (
                        <h1>No Request Found</h1>
                    )}
                </div>
            ) : (
                <ViewRequestForm 
                    id={requestId}
                    status={request.status}
                    type={request.requestType}
                    request={request}
                />
            )}
        </>
    )
}

export default ViewRequest;