import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
const SetPriorityNumberComponent = () => {
  return (
    <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
  )
}

export default SetPriorityNumberComponent