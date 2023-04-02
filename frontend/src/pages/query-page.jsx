import { useState, useEffect } from 'react'
import { Box, Typography, TextField, Button, Container } from '@mui/material'
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
    <Container sx={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: "center", alignItems: 'center' }}>
      <Typography marginBottom='24px' variant="h3">
      Welcome to SGNearMe
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <TextField
          label="Location"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <Button sx={{ marginTop: '12px' }}variant="contained" size="small" onClick={sendSomething}>Submit</Button>
      </Box>
    </Container>
  );
}