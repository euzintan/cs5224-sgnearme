import {
  ormQueryTransport,
  ormQuerySports,
  ormQueryEducation,
} from "../model/orms.js";
import axios from "axios";


export async function getGeolocation(req, res) {
  const { location } = req.query;
  if (!location) {
    return res.status(400).json({ message: "Missing location" });
  }
  let response = await axios
    .get(
      "https://developers.onemap.sg/commonapi/search?searchVal=" +
      location +
      "&returnGeom=Y&getAddrDetails=Y"
    )
  if (response.status !== 200) {
    return res.status(500).json({ message: "Server Error" });
  }
  if (!response.data.found) {
    return res.status(400).json({ message: "Invalid location" });
  }
  console.log(response.data.results[0]);
  return res.status(200).json({
    address: response.data.results[0].ADDRESS,
    latitude: response.data.results[0].LATITUDE,
    longitude: response.data.results[0].LONGITUDE
  });
}

export async function getTransport(req, res) {
  try {
    var [location, latitude, longitude] = getLatAndLongFromQueryParams(req.query)
  } catch (err) {
    console.error(err.message);
    return res.status(400).json({ message: "Invalid location or latitude and/or longitude" });
  }
  console.log("transport", location, latitude, longitude)
  if (location) {
    const response = await axios.get("https://developers.onemap.sg/commonapi/search?searchVal=" + location + "&returnGeom=Y&getAddrDetails=Y")
    if (response.status !== 200) {
      return res.status(500).json({ message: "Server Error" });
    }
    if (!response.data.found) {
      return res.status(400).json({ message: "Invalid location" });
    }
    latitude = parseFloat(response.data.results[0].LATITUDE)
    longitude = parseFloat(response.data.results[0].LONGITUDE)
  }
  try {
    const resp = await ormQueryTransport(...createLatLongRange(latitude, longitude));
    return res.status(200).json({ data: resp, latitude, longitude });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function getSports(req, res) {
  try {
    var [location, latitude, longitude] = getLatAndLongFromQueryParams(req.query)
  } catch (err) {
    console.error(err.message);
    return res.status(400).json({ message: "Invalid location or latitude and/or longitude" });
  }
  console.log("sports", location, latitude, longitude)
  if (location) {
    const response = await axios.get("https://developers.onemap.sg/commonapi/search?searchVal=" + location + "&returnGeom=Y&getAddrDetails=Y")
    if (response.status !== 200) {
      return res.status(500).json({ message: "Server Error" });
    }
    if (!response.data.found) {
      return res.status(400).json({ message: "Invalid location" });
    }
    latitude = parseFloat(response.data.results[0].LATITUDE)
    longitude = parseFloat(response.data.results[0].LONGITUDE)
  }
  try {
    const resp = await ormQuerySports(...createLatLongRange(latitude, longitude));
    return res.status(200).json({ data: resp, latitude, longitude });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function getSchools(req, res) {
  try {
    var [location, latitude, longitude] = getLatAndLongFromQueryParams(req.query)
  } catch (err) {
    console.error(err.message);
    return res.status(400).json({ message: "Invalid location or latitude and/or longitude" });
  }
  console.log("education", location, latitude, longitude)
  if (location) {
    const response = await axios.get("https://developers.onemap.sg/commonapi/search?searchVal=" + location + "&returnGeom=Y&getAddrDetails=Y")
    if (response.status !== 200) {
      return res.status(500).json({ message: "Server Error" });
    }
    if (!response.data.found) {
      return res.status(400).json({ message: "Invalid location" });
    }
    latitude = parseFloat(response.data.results[0].LATITUDE)
    longitude = parseFloat(response.data.results[0].LONGITUDE)
  }
  try {
    const resp = await ormQueryEducation(...createLatLongRange(latitude, longitude));
    return res.status(200).json({ data: resp, latitude, longitude });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}

function getLatAndLongFromQueryParams(params) {
  let { location, latitude, longitude } = params;
  latitude = parseFloat(latitude)
  longitude = parseFloat(longitude)
  if (
    (!location || location.length === 0) && (
    isNaN(latitude) ||
    isNaN(longitude) ||
    !latLongAreInSingapore(latitude, longitude))
  ) {
    throw new Error('Invalid location');
  }
  return [location, latitude, longitude]
}

function latLongAreInSingapore(latitude, longitude) {
  if (
    1.091486 < latitude && latitude < 1.490432 &&
    103.554778 < longitude && longitude < 104.137443
  ) {
    return true
  } else {
    return false
  }
}

const LATITUDE_RANGE = 0.015
const LONGITUDE_RANGE = 0.015
function createLatLongRange(latitude, longitude) {
  return [
    latitude - LATITUDE_RANGE,
    latitude + LATITUDE_RANGE,
    longitude - LONGITUDE_RANGE,
    longitude + LONGITUDE_RANGE
  ]
}