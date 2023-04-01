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
    const [transportResults, educationResults, sportsResults] = await Promise.all([
      transportPromise, educationPromise, sportsPromise
    ])
    if (!transportResults || !educationResults || !sportsResults) {
      navigate("/");
      return
    }
    setTransport(transportResults)
    setEducation(educationResults)
    setSports(sportsResults)

    setTransportHeaderFilter(createHeaderFilterObject(transportResults))
    setEducationHeaderFilter(createHeaderFilterObject(educationResults))
    setSportsHeaderFilter(createHeaderFilterObject(sportsResults))

    setTransportDataFilter(createDataFilterObject(null, TRANSPORT_TYPES))
    setEducationDataFilter(createDataFilterObject(null, EDUCATION_TYPES))
    setSportsDataFilter(createDataFilterObject(sportsResults))
  }

  useEffect(() => {
    loadData()
  }, [])

  const filteredTransportsHeaders = transportHeaders.filter(header => transportHeaderFilter[header.id] === true);
  const filteredEducationHeaders = educationHeaders.filter(header => educationHeaderFilter[header.id] === true);
  const filteredSportsHeaders = sportsHeaders.filter(header => sportsHeaderFilter[header.id] === true);

  const filteredTransport = transport.filter(row => transportDataFilter[row.type] === true)
  const filteredEducation = education.filter(row => educationDataFilter[row.type] === true)
  const filteredSports = sports.filter(row => row.type.every((type => sportsDataFilter[type] === true)))

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

function createHeaderFilterObject(result) {
  if (result.length === 0) {
    return {}
  }
  let deepCopy = Object.assign({}, result[0])
  for (const i in deepCopy) {
    deepCopy[i] = true;
  }
  return deepCopy
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