import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
/* -------------------------------------------------------------------------- */
/*                  import things related to global variable                  */
/* -------------------------------------------------------------------------- */
import {useStateValue} from '../../../contexts/StateProvider'
import { PermPhoneMsgOutlined } from '@mui/icons-material';

/* -------------------------------------------------------------------------- */
/*                         import adjust date function                        */
/* -------------------------------------------------------------------------- */
import {ReturnDate} from '../../../common/ReturnDate'

export default function ChatMessageComponent({conversation}) {
  const [{ user }, dispatch] = useStateValue();
  console.log(`from chat message Component conversation => ${conversation[0]}`)
  return (
    <Box sx={{ pb: 7 }} >
      <>
      <CssBaseline />
      <List>
        
        {conversation.map((msg, index) => (
          <p key={index + msg.timestamp} className={`chat__message ${(msg.whoSendMsg===user.uid) && 'chat__receiver'}`}>
            <ListItem >
              <ListItemAvatar>
                <Avatar alt="Profile Picture" src='alsjdflkj' />
              </ListItemAvatar>
              <ListItemText primary={'khaled abdalmoaty'} secondary={msg.timestamp && ReturnDate(msg.timestamp)}/>
            </ListItem>
            {msg.message} 
          </p> 
        ))}


      </List>
      </>
    </Box>
  );
}
