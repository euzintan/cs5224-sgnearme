// import * as React from 'react';
import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';

function ControlledCheckbox({ property, checked, setChecked }) {

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <FormControlLabel
      control={<Checkbox
        checked={checked}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'controlled' }} />}
      label={property} />
  );
}

export default function Filter({ title, object, setChecked }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography>{title}</Typography>
      {Object.entries(object).map(([property, checked]) => {
        const callback = (value) => {
          setChecked({ ...object, [property]: value })
        }
        return (
          <ControlledCheckbox key={property} property={property} checked={checked} setChecked={callback} />
        )
      })}
    </Box>
  )
}