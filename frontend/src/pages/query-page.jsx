import { useState } from 'react'
import { Box, TextField, Button } from '@mui/material'
import { createSearchParams, useNavigate } from "react-router-dom";

export function Query({  }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function sendSomething() {
    console.log("query", query)
    navigate({
      pathname: "result",
      search: createSearchParams({
          query
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