import axios from "axios";


/**
 *  Retrieves an incident based on the given ID and returns it in a const
 *  @param incidentId - The ID of the incident to be retrieved
 *  @returns The data of the specified incident
 */
function getIncidentData(incidentId) {

  const token = sessionStorage.getItem("access");

  axios({
    method: "GET",
    url: `http://127.0.0.1:8000/api/viewincidents/${incidentId}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      const data = response.data;

      return data;
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
  });
}

export default getIncidentData;