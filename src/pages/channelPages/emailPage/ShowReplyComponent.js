import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { PermPhoneMsgOutlined } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

/* -------------------------------------------------------------------------- */
/*                  import things related to global variable                  */
/* -------------------------------------------------------------------------- */
import {useStateValue} from '../../../contexts'
import {useNavigate} from 'react-router-dom'
/* -------------------------------------------------------------------------- */
/*                         import adjust date function                        */
/* -------------------------------------------------------------------------- */
import {ReturnDate} from '../../../common/ReturnDate'

export default function ShowReplyComponent({reply,index}) {
  const [{ user }, dispatch] = useStateValue();
  const nav=useNavigate()
 /*  console.log(` from chat message compoent ${msg.message}`)
  console.log(` from chat message compoent ${msg.timestamp}`) */
  const handleShowProfile=()=>{
    nav(`/profile/${reply.from._id}`)
  }

 
  return (
    
    <Box sx={{ pb: 7 }} >
    
          <div style={{maxWidth:"300px",overflow:'scroll'}}  className={`chat__message ${(reply.from._id===user.user_id) && 'chat__receiver'}`}>
            <ListItem >
              <ListItemAvatar>
              <IconButton aria-label="chatMessage" onClick={handleShowProfile}>
                <Avatar alt="Profile Picture" imgProps={{crossOrigin:"anonymous" }} src={reply.from.profilePicture && reply.from.profilePicture } />
              </IconButton>
              </ListItemAvatar>
               <ListItemText primary={reply.from.username} secondary={reply.timestamp && ReturnDate(reply.timestamp)}/>
            </ListItem>
            {reply.replyMessage} 
          </div> 
    </Box>
   
  );
}


