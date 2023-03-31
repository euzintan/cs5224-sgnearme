import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from "react-router-dom";
import { getService } from '../apis';

export function Result({ address }) {
  let [searchParams, setSearchParams] = useSearchParams();
  const [transport, setTransport] = useState([])
  const [education, setEducation] = useState([])
  const [sports, setSports] = useState([])
  const navigate = useNavigate();

  const loadData = async () => {
    const latitude = searchParams.get("latitude")
    const longitude = searchParams.get("longitude")
    console.log("result", latitude, longitude)
    const transportPromise = getService("/transport", latitude, longitude)
    const educationPromise = getService("/education", latitude, longitude)
    const sportsPromise = getService("/sports", latitude, longitude)
    const [transportResults, educationResults, sportsResults] = await Promise.all([
      transportPromise, educationPromise, sportsPromise
    ])
    if (!transportResults || !educationResults || !sportsResults) {
      console.log("null results")
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
      <h2>transport</h2>
      <div>{transport.length}</div>
      <h2>education</h2>
      <div>{education.length}</div>
      <h2>sports</h2>
      <div>{sports.length}</div>
    </div>
  );
}