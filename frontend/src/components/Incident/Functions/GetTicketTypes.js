import axios from "axios";
import { useState } from "react";


/**
 * Returns all the types of incident tickets
 * @returns The types of incident tickets
 */
function getTicketTypes() {

    const [ticketTypes, setTicketTypes] = useState();

    const token = sessionStorage.getItem("access");

    axios({
      method: "GET",
      url: "http://127.0.0.1:8000/api/tickettypes/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setTicketTypes(response.data);

      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });

      return ticketTypes;
  }

export default getTicketTypes;