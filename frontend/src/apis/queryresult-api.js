import { default as axios } from 'axios'

const QUERY_RESULT_SERVICE_URL = import.meta.env.VITE_QUERY_RESULT_SERVICE_URL || "//localhost:8001/api/query" ;

const axios_instance = axios.create({
  baseURL: QUERY_RESULT_SERVICE_URL
});

export async function getGeolocation(location) {
  console.log(QUERY_RESULT_SERVICE_URL)
  const getResponse = await axios_instance
    .get("/geolocation", { params: { location } })
    .then((response) => {
      return response
    })
    .catch((err) => {
      console.log(err)
      return null
    });

  return getResponse;
};

export async function getService(route, parameters) {
  console.log(QUERY_RESULT_SERVICE_URL)
  const getResponse = await axios_instance
    .get(route, { params: parameters })
    .then((response) => {
      console.log(response.data)
      return response.data
    })
    .catch((err) => {
      console.log(err)
      return null
    });
  return getResponse;
};
