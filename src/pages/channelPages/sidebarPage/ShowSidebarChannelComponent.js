import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { useNavigate} from 'react-router-dom';
import ShowListComponent from '../../../common/ShowListComponent';
import CssBaseline from '@mui/material/CssBaseline';

export default function ShowSidebarChannelComponent({channel}) {
    let nav=useNavigate()
 
  const {channelName,_id:id}=channel
  const channelOwner=channel.channelOwner&&channel.channelOwner._id

  const selectChannel = () => {

    if (id) {
      nav(`/channel/${channelOwner}/${channelName}/${id}`) 
       
    } else {
        nav('/login');
    }
  };

  return (
    <Box sx={{ 
        backgroundColor:"#ededed"/* 'rgba(0, 0, 0, 0.04)' */,
        m:"0px",
        p:'0px',
        }} onClick={selectChannel}>
      <CssBaseline/> 
       <List> 
          <ListItem button>              
            <ListItemText primary={`# ${channelName}`}  /* secondary={'khaled'} */  />
          </ListItem>         
       </List>  

    </Box>
  );
}





