import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import ShowListComponent from '../ShowListComponent'


export default function SidebarHeaderComponent() {
  
  return (

<List sx={{backgroundColor:'#f8f6f6'}} >
  <ListItem button >
    <ListItemAvatar>
      <Avatar alt="Profile Picture" src={'/public/'} />
    </ListItemAvatar>
    <ListItemText primary={"room Name"} secondary={'last seen in '} />
    <ShowListComponent options={['add a new channel']}/>
  </ListItem>
</List>
    
  )
}


