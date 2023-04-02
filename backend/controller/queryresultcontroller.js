import {
  ormQueryTransport as _queryTransport,
  ormCreateManyTransport as _createManyTransport,
  ormQueryEducation as _querySchools,
  ormQuerySports as _querySports,
} from "../model/orms.js";
import axios from "axios";

export async function getTransport(req, res) {
  try {
    const { location } = req.body;
    console.log(location);

    let latitude = 0.0;
    let longitude = 0.0;
    const request = axios.get("https://developers.onemap.sg/commonapi/search?searchVal=" + location + "&returnGeom=Y&getAddrDetails=Y")
    const response = await request
    console.log(response.data.results[0]);
    latitude = Number(response.data.results[0].LATITUDE);
    longitude = Number(response.data.results[0].LONGITUDE);

    const resp = await _queryTransport(latitude - 0.02, latitude + 0.02, longitude - 0.02, longitude + 0.02);
    if (resp.err) {
      return res.status(409).json({ message: "Could not query schools!" });
    } else {
      return res.status(201).json({ transport: resp });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function addTransport(req, res) {
  try {
    const { name, type, xcoord, ycoord, description } = req.body;
    if (name) {
      const resp = await _createManyTransport([
        { name, type, xcoord, ycoord, description },
      ]);
      if (resp.err) {
        return res.status(409).json({ message: "Could not create transport!" });
      } else {
        console.log(`Created new transport successfully!`);
        return res
          .status(201)
          .json({ message: `Created new transport ${name} successfully!` });
      }
    } else {
      return res.status(400).json({ message: "name missing!" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Database failure when creating new question!" });
  }
}

export async function getSchools(req, res) {
  try {
    const { location } = req.body;
    console.log(location);
    
    let latitude = 0.0;
    let longitude = 0.0;
    const request = axios.get("https://developers.onemap.sg/commonapi/search?searchVal=" + location + "&returnGeom=Y&getAddrDetails=Y")
    const response = await request
    console.log(response.data.results[0]);
    latitude = Number(response.data.results[0].LATITUDE);
    longitude = Number(response.data.results[0].LONGITUDE);

    const resp = await _querySchools(latitude - 0.02, latitude + 0.02, longitude - 0.02, longitude + 0.02);
    if (resp.err) {
      return res.status(409).json({ message: "Could not query schools!" });
    } else {
      return res.status(201).json({ transport: resp });
    }
  } 
  catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function getSports(req, res) {
  try {
    const { location } = req.body;
    console.log(location);

    let latitude = 0.0;
    let longitude = 0.0;
    const request = axios.get("https://developers.onemap.sg/commonapi/search?searchVal=" + location + "&returnGeom=Y&getAddrDetails=Y")
    const response = await request
    console.log(response.data.results[0]);
    latitude = Number(response.data.results[0].LATITUDE);
    longitude = Number(response.data.results[0].LONGITUDE);

    const resp = await _querySports(latitude - 0.02, latitude + 0.02, longitude - 0.02, longitude + 0.02);
    if (resp.err) {
      return res.status(409).json({ message: "Could not query schools!" });
    } else {
      return res.status(201).json({ transport: resp });
    }
  } 
  catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}