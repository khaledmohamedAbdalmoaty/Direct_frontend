import React from 'react'

/* -------------------------------------------------------------------------- */
/*                               import from mui                              */
/* -------------------------------------------------------------------------- */
import {Link,List,ListItem, ListItemAvatar,Avatar,Typography, Box} from '@mui/material'
import EmailIcon from '@mui/icons-material/Email';
import CssBaseline from '@mui/material/CssBaseline';
/* -------------------------------------------------------------------------- */
/*                             import useNavigate                             */
/* -------------------------------------------------------------------------- */
import { useNavigate} from 'react-router-dom';



const SendedEmailSidebarLink = () => {
    const nav=useNavigate()
  return (
    <Box sx={{ 
      
        backgroundColor:'rgba(0, 0, 0, 0.06)',
        mt:"5px",
        mb:'5px',
        p:'0px',
        }} onClick={()=>{nav(`/channel/allYourSendedEmail`)}}>
      <CssBaseline /> 
       <List> 
          <ListItem button>
          <EmailIcon/>  
          {`Your Emails And Reply `}
          </ListItem>    
       </List>  

    </Box>
  )
}

export default SendedEmailSidebarLink