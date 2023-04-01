import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from "react-router-dom";
import { getService } from '../queryresult-api';
import MyTable from '../components/table/table'
import {
  transportHeaders, educationHeaders, sportsHeaders
} from '../components/table/headers'
import MyModal from '../components/checkbox-modal'
import MyFilter from '../components/filter'
import { TRANSPORT_TYPES, EDUCATION_TYPES } from '../data/service-types'

export function Result({ address }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [transport, setTransport] = useState([])
  const [education, setEducation] = useState([])
  const [sports, setSports] = useState([])

  const [transportHeaderFilter, setTransportHeaderFilter] = useState({})
  const [educationHeaderFilter, setEducationHeaderFilter] = useState({})
  const [sportsHeaderFilter, setSportsHeaderFilter] = useState({})

  const [transportDataFilter, setTransportDataFilter] = useState({})
  const [educationDataFilter, setEducationDataFilter] = useState({})
  const [sportsDataFilter, setSportsDataFilter] = useState({})

  const navigate = useNavigate();

  const loadData = async () => {
    const latitude = searchParams.get("latitude")
    const longitude = searchParams.get("longitude")
    if (isNaN(latitude) || isNaN(longitude)) {
      navigate("/");
      return
    }
    const transportPromise = getService("/transport", latitude, longitude)
    const educationPromise = getService("/education", latitude, longitude)
    const sportsPromise = getService("/sports", latitude, longitude)
    const results = await Promise.all([
      transportPromise, educationPromise, sportsPromise
    ])
    if (results.length != 3 || !results[0] || !results[1] || !results[2]) {
      navigate("/");
      return
    }
    const [transportResults, educationResults, sportsResults] = results.map(
      (result) => addDistanceProperty(
        parseFloat(latitude),
        parseFloat(longitude),
        result,
      )
    )

    setTransport(transportResults)
    setEducation(educationResults)
    setSports(sportsResults)

    setTransportHeaderFilter(createHeaderFilterObject(transportHeaders))
    setEducationHeaderFilter(createHeaderFilterObject(educationHeaders))
    setSportsHeaderFilter(createHeaderFilterObject(sportsHeaders))

    setTransportDataFilter(createDataFilterObject(null, TRANSPORT_TYPES))
    setEducationDataFilter(createDataFilterObject(null, EDUCATION_TYPES))
    setSportsDataFilter(createDataFilterObject(sportsResults))
  }

  useEffect(() => {
    loadData()
  }, [])

  const filteredTransportsHeaders = transportHeaders.filter(header => transportHeaderFilter[header.label]);
  const filteredEducationHeaders = educationHeaders.filter(header => educationHeaderFilter[header.label]);
  const filteredSportsHeaders = sportsHeaders.filter(header => sportsHeaderFilter[header.label]);

  const filteredTransport = transport.filter(row => transportDataFilter[row.type])
  const filteredEducation = education.filter(row => educationDataFilter[row.type])
  const filteredSports = sports.filter(row => row.type.every((type => sportsDataFilter[type])))

  return (
    <div>
      <h1>{address}</h1>
      <h1>Latitude {searchParams.get("latitude")}</h1>
      <h1>Longitude {searchParams.get("longitude")}</h1>

      <h2>Transport</h2>
      <MyModal modalTitle={"Transport Filter"} buttonString={"Open Transport Filter"}>
        <MyFilter title={"Header Filter"} object={transportHeaderFilter} setChecked={setTransportHeaderFilter} />
        <MyFilter title={"Data Filter"} object={transportDataFilter} setChecked={setTransportDataFilter} />
      </MyModal>
      <MyTable headers={filteredTransportsHeaders} data={filteredTransport} />

      <h2>Education</h2>
      <MyModal modalTitle={"Education Filter"} buttonString={"Open Education Filter"}>
        <MyFilter title={"Header Filter"} object={educationHeaderFilter} setChecked={setEducationHeaderFilter} />
        <MyFilter title={"Data Filter"} object={educationDataFilter} setChecked={setEducationDataFilter} />
      </MyModal>
      <MyTable headers={filteredEducationHeaders} data={filteredEducation} />

      <h2>Sports</h2>
      <MyModal modalTitle={"Sports Filter"} buttonString={"Open Sports Filter"}>
        <MyFilter title={"Header Filter"} object={sportsHeaderFilter} setChecked={setSportsHeaderFilter} />
        <MyFilter title={"Data Filter"} object={sportsDataFilter} setChecked={setSportsDataFilter} />
      </MyModal>
      <MyTable headers={filteredSportsHeaders} data={filteredSports} />
    </div>
  );
}

function createHeaderFilterObject(headers) {
  let filter = {}
  for (const i in headers) {
    filter[headers[i].label] = true;
  }
  return filter
}

function createDataFilterObject(data, types = null) {
  if (Array.isArray(data) && !types) {
    if (data.length == 0) return {}

    let dataFilter = {}
    for (const i in data) {
      const typesArr = data[i].type
      for (const j in typesArr) {
        if (!(typesArr[j] in dataFilter)) {
          dataFilter[typesArr[j]] = true
        }
      }
    }
    return dataFilter
  } else if (!data && types) {
    let dataFilter = {}
    for (const i in types) {
      dataFilter[types[i]] = true
    }
    return dataFilter
  } else {
    console.log("create data filter error")
    return {}
  }
}

function addDistanceProperty(lat1, lon1, data) {
  if (!Array.isArray(data) || data.length == 0) {
    return data
  }
  for (const i in data) {
    const lat2 = data[i].xcoord
    const lon2 = data[i].ycoord
    if (!lat2 || !lon2) {
      // shouldn't happen
      throw new Error("missing xcoord and/or ycoord property")
    }
    const distance = calculateStraightLineDistance(lat1, lon1, lat2, lon2)
    data[i]["distance"] = Math.round(distance)
  }
  return data
}

// https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates
//This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
function calculateStraightLineDistance(lat1, lon1, lat2, lon2) {
  var R = 6371000; // Radius of earth in m
  var dLat = degToRad(lat2 - lat1);
  var dLon = degToRad(lon2 - lon1);
  var lat1 = degToRad(lat1);
  var lat2 = degToRad(lat2);

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) *
    Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
}

function degToRad(Value) {
  return Value * Math.PI / 180;
}

