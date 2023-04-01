import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from "react-router-dom";
import { getService } from '../queryresult-api';
import MyTable from '../components/table/table'
import {
  transportHeaders, educationHeaders, sportsHeaders
} from '../components/table/headers'

export function Result({ address }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [transport, setTransport] = useState([])
  const [education, setEducation] = useState([])
  const [sports, setSports] = useState([])
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
    console.log(transportResults)
    console.log(educationResults)
    console.log(sportsResults)
    setTransport(transportResults)
    setEducation(educationResults)
    setSports(sportsResults)
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div>
      <h1>{address}</h1>

      <h2>Transport</h2>
      <MyTable headers={transportHeaders} data={transport} />
      <h2>Education</h2>
      <MyTable headers={educationHeaders} data={education} />
      <h2>Sports</h2>
      <MyTable headers={sportsHeaders} data={sports} />
    </div>
  );
}
