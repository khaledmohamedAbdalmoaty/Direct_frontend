import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { useNavigate} from 'react-router-dom';
import ShowListComponent from '../ShowListComponent';

export default function ShowSidebarChannelComponent({channel}) {
    let nav=useNavigate()
  const {name:channelName,channelImageLocation,id,postOnly}=channel
  const selectChannel = () => {
    if(postOnly){
      nav(`/channel/postOnly/${channelName}/${id}`)
    }
    else if (id) {
        nav(`/channel/${channelName}/${id}`)
    } else {
        nav('/login');
    }
  };

  return (
    <Box sx={{ 
        backgroundColor:'rgba(0, 0, 0, 0.04)',
        m:"0px",
        p:'0px',
        }} onClick={selectChannel}>
      {/* <CssBaseline /> */}
       <List> 
          <ListItem button>
              <Avatar  alt="channel Picture" src={channelImageLocation} />
            <ListItemAvatar >
            </ListItemAvatar>
            <ListItemText primary={channelName} /* secondary={secondary} */ />
            <ShowListComponent options={['setPriority of channel ']}/>
          </ListItem>
         
       </List>  

    </Box>
  );
}





