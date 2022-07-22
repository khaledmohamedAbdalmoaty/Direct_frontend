import React from 'react'
/* -------------------------------------------------------------------------- */
/*                               import from mui                              */
/* -------------------------------------------------------------------------- */
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import Grid from '@mui/material/Grid';
import {Tooltip} from '@mui/material' 

import { useNavigate } from 'react-router-dom';


const GoBackComponent = ({bgColor2}) => {
    const nav=useNavigate()
  return (
 <div style={{margin:'auto'}}>
    <Grid
  container
  direction="row"
  justifyContent="flex-start"
  alignItems="center"
  position="sticky"
  p="2px"
  >
    <Tooltip title={'go back to preious page'} >
        <IconButton color="primary" onClick={()=>nav(-1)} aria-label="upload picture" component="span">
        <ArrowBackIcon/>
        </IconButton>   
    </Tooltip>
</Grid>
</div>
  )
}

export default GoBackComponent