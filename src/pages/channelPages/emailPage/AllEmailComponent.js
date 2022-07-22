import * as React from 'react';
/* -------------------------------------------------------------------------- */
/*                               import css file                              */
/* -------------------------------------------------------------------------- */
import './AllMails.css'

/* -------------------------------------------------------------------------- */
/*                            import things of mui                            */
/* -------------------------------------------------------------------------- */
import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Fab from '@mui/material/Fab';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Avatar from '@mui/material/Avatar';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import {Button,Chip } from '@mui/material';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
/* -------------------------------------------------------------------------- */
/*                           import from api folder                           */
/* -------------------------------------------------------------------------- */

import {useGetAllEmails} from '../../../api'

/* -------------------------------------------------------------------------- */
/*                          import from common folder                         */
/* -------------------------------------------------------------------------- */
import {ReturnDate,ReturnTodayDate} from '../../../common'
import {actionTypes,useStateValue} from '../../../contexts'

/* -------------------------------------------------------------------------- */
/*                             import useNavigate                             */
/* -------------------------------------------------------------------------- */
import { useNavigate} from 'react-router-dom';
import '../chatPage/Chat.css'

/* -------------------------------------------------------------------------- */
/*                           import custom component                          */
/* -------------------------------------------------------------------------- */
import ShowSidebarInSmallScreen from '../sidebarPage/ShowSidebarInSmallScreen'



const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: '0 auto',
});

export default function AllEmailComponent() {
    const userId=JSON.parse(localStorage.getItem('currentUserInfo')).user_id 
    const {data:emails,isLoading,isFetching,error,isError,refetch}=useGetAllEmails(userId)
    const todayDate=ReturnTodayDate(Date.now())
    const nav=useNavigate()
    const handleShowProfile=(_id)=>{
      nav(`/profile/${_id}`)
    }

    if(isLoading){
        return (<h1>Loading....</h1>)
    }
    if(isError){
        return (<h1>Error</h1>)
    }
  return (
    <>

    
   <Box sx={{height:'100vh', width:'100vw',overflow:'scroll',backgroundColor:'#ededed'}}>
    <Box sx={{display: { xs: 'flex', md: 'none' }}}>
        <ShowSidebarInSmallScreen/>
    </Box>
   {/*  <React.Fragment> */}
      <CssBaseline />
      <Paper square sx={{ pb: '50px',backgroundColor:'#ededed'}}>
        <Typography variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0 }}>
          Inbox
        </Typography>
      
        <List sx={{ mb: 2 ,backgroundColor:'#ededed' }}>
            
          {
            /* for loop on emails to get emil */
          emails.map((email) => (
            <React.Fragment key={email._id}>
            {/*   to show the header and body of Email */}
            <ListItem /* button  */   >
            <ListSubheader sx={{ bgcolor:'#121212' ,color:'white',fontSize:"9px",width:"100px",maxHeight:'100px',marginRight:'2px'}}>
                 {ReturnTodayDate(email.timestamp)}
            </ListSubheader>
                <ListItemAvatar>
                <IconButton aria-label="chatMessage" onClick={()=>handleShowProfile(email.from._id)}>
                  <Avatar alt="Picture:NotFound!!!" imgProps={{crossOrigin:"anonymous" }} src={email.from&&email.from.profilePicture} />
                </IconButton>
                </ListItemAvatar>
                  {email.enableReply ?(<ListItemText primary={`reply to Email with tilte ---> ${email.replyOnMail.headerTitle}`} secondary={email.emailBody} />) :  (<ListItemText primary={email.headerTitle} secondary={email.emailBody} />)}
            
          {
            email.enableReply ? 
            (
            <IconButton color="primary" onClick={()=>nav(`/channel/singleEmail/${email.replyEmailId}`)} aria-label="upload picture" component="span">
            <ForwardToInboxIcon/>
            </IconButton>)
            :
            (
            <IconButton color="primary" onClick={()=>nav(`/channel/muiltyEmail/${email.from&&email.from._id}`)} aria-label="upload picture" component="span">
            <ForwardToInboxIcon/>
            </IconButton>)
          }
             

            </ListItem> 
            </React.Fragment>
          ))}
        </List>
      </Paper>
  {/*   </React.Fragment> */}
    </Box>

  
  </>
   
     
);
}
