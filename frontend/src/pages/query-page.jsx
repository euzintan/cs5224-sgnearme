import { useState, useEffect } from 'react'
import { Box, Typography, TextField, Button, Container  } from '@mui/material'
import { createSearchParams, useNavigate } from "react-router-dom";
// import { getGeolocation } from "../apis/queryresult-api"

export function Query({ setAddress }) {
  const [location, setLocation] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    setAddress("")
  }, []);

  async function sendLocation() {
    console.log("location", location)

    // const result = await getGeolocation(location)
    // if (!result) {
    //   console.log('error')
    //   return
    // }
    // const {address, latitude, longitude} = result.data
    // console.log(address, latitude, longitude)
    // setAddress(address)

    navigate({
      pathname: "result",
      search: createSearchParams({
        location,
        // latitude, 
        // longitude,
      }).toString()
    });

  }

  return (
    <Container sx={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: "center", alignItems: 'center' }}>
      <Typography marginBottom='24px' variant="h3">
      Welcome to SGNearMe
      </Typography>
      <form onSubmit={sendLocation}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <TextField
            label="Location"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
          />
          <Button type="submit" sx={{ marginTop: '12px' }} variant="contained" size="small">Submit</Button>
        </Box>
      </form>
    </Container>
  );
}