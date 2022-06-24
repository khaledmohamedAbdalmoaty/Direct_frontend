import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { PermPhoneMsgOutlined } from '@mui/icons-material';

/* -------------------------------------------------------------------------- */
/*                  import things related to global variable                  */
/* -------------------------------------------------------------------------- */
import {useStateValue} from '../../../contexts'

/* -------------------------------------------------------------------------- */
/*                         import adjust date function                        */
/* -------------------------------------------------------------------------- */
import {ReturnDate} from '../../../common/ReturnDate'

export default function ChatMessageComponent({msg,index}) {
  const [{ user }, dispatch] = useStateValue();
 /*  console.log(` from chat message compoent ${msg.message}`)
  console.log(` from chat message compoent ${msg.timestamp}`) */

 
  return (
    
    <Box sx={{ pb: 7 }} >
    
          <div style={{maxWidth:"300px",overflow:'scroll'}}  className={`chat__message ${(msg.whoSendMsg._id===user.user_id) && 'chat__receiver'}`}>
            <ListItem >
              <ListItemAvatar>
                <Avatar alt="Profile Picture" src={msg.whoSendMsg.profilePicture && msg.whoSendMsg.profilePicture } />
              </ListItemAvatar>
               <ListItemText primary={msg.whoSendMsg.username} secondary={msg.timestamp && ReturnDate(msg.timestamp)}/>
            </ListItem>
            {msg.message} 
          </div> 
    </Box>
   
  );
}


