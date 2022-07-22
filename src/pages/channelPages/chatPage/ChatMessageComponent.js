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

import {useNavigate} from 'react-router-dom'

/* -------------------------------------------------------------------------- */
/*                  import things related to global variable                  */
/* -------------------------------------------------------------------------- */
import {useStateValue,actionTypes} from '../../../contexts'

/* -------------------------------------------------------------------------- */
/*                         import adjust date function                        */
/* -------------------------------------------------------------------------- */
import {ReturnDate,ShowListComponent} from '../../../common'


export default function ChatMessageComponent({msg,index,channelOwner}) {
  const [{ user }, dispatch] = useStateValue();
  const nav=useNavigate()
  const handleShowProfile=()=>{
    nav(`/profile/${msg.whoSendMsg._id}`)
  }

 
  return (
    
    <Box sx={{ pb: 7 }} >
    
          <div style={{maxWidth:"300px",overflow:'scroll'}}  className={`chat__message ${(msg.whoSendMsg._id===user.user_id) && 'chat__receiver'}`}>
            <ListItem >
           
              <ListItemAvatar>
              <IconButton aria-label="chatMessage" onClick={handleShowProfile}>
                <Avatar alt="Profile Picture" imgProps={{crossOrigin:"anonymous" }} src={msg.whoSendMsg.profilePicture&&msg.whoSendMsg.profilePicture} />
                </IconButton>
              </ListItemAvatar>
             
               <ListItemText primary={msg.whoSendMsg.username} secondary={msg.timestamp && ReturnDate(msg.timestamp)}/>
{/*                <ShowListComponent options={[actionTypes.DELETEMESSAGE]} msg={msg} msgChannelOwner={channelOwner}/>
 */}            </ListItem>
            {msg.message} 
          </div> 
    </Box>
   
  );
}


