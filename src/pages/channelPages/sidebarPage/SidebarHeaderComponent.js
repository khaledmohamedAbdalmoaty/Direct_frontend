import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import ShowListComponent from '../../../common/ShowListComponent'
import IconButton from '@mui/material/IconButton';

/* -------------------------------------------------------------------------- */
/*                         improt from context folder                         */
/* -------------------------------------------------------------------------- */
import {actionTypes} from '../../../contexts'
import {useNavigate} from 'react-router-dom'

export default function SidebarHeaderComponent({currentUserData}) {
const nav=useNavigate()
const profilePicture=currentUserData&& currentUserData.profilePicture
const username=currentUserData&& currentUserData.username
const handleShowProfile=()=>{
  nav(`/profile/${currentUserData._id}`)
}

  
  return (

<List sx={{backgroundColor:'#f8f6f6'}} >
  <ListItem>
    <ListItemAvatar>
    <IconButton aria-label="chatMessage" onClick={handleShowProfile}>
      <Avatar alt="Profile Picture" imgProps={{crossOrigin:"anonymous" }} src={profilePicture} />
    </IconButton>
    </ListItemAvatar>
    <ListItemText primary={username} />
    <ShowListComponent options={[actionTypes.CREATENEWCHANNEL,actionTypes.MAINPAGE,actionTypes.CURRENTUSERPROFILE]}/>
  </ListItem>
</List>
    
  )
}


