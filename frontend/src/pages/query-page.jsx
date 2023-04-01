import { useState, useEffect } from 'react'
import { Box, TextField, Button } from '@mui/material'
import { createSearchParams, useNavigate } from "react-router-dom";
import { getGeolocation } from "../apis/queryresult-api"

export function Query({ setAddress }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    setAddress("")
  }, []);

  async function sendSomething() {
    console.log("query", query)

    const result = await getGeolocation(query)
    if (!result) {
      console.log('error')
      return
    }
    const {address, latitude, longitude} = result.data
    console.log(address, latitude, longitude)
    setAddress(address)

    navigate({
      pathname: "result",
      search: createSearchParams({
        latitude, 
        longitude,
      }).toString()
    });

  }

  return (
    <Box>
      <TextField
        label="Location"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <Button variant="contained" onClick={sendSomething}>Submit</Button>
    </Box>
  );
}