/* -------------------------------------------------------------------------- */
/*                 import things related to reacct technology                 */
/* -------------------------------------------------------------------------- */
import React,{useState,useEffect} from 'react'
import './Sidebar.css'


/* -------------------------------------------------------------------------- */
/*                  import things related to global variable                  */
/* -------------------------------------------------------------------------- */
import {useStateValue} from '../../../contexts/StateProvider'

/* ----------------------- materialui imported things ----------------------- */
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import ChatIcon from '@material-ui/icons/Chat'
import {Avatar,IconButton} from '@material-ui/core'
import { SearchOutlined } from '@material-ui/icons'

/* ----------------------------- new add things ----------------------------- */
import axios from '../axios'
import Pusher from 'pusher-js'
import ShowSidebarChannelComponent from './ShowSidebarChannelComponent'
import SidebarHeaderComponent from './SidebarHeaderComponent'
import SearchComponent from '../SearchComponent'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
/* --------------------- import get user channel request -------------------- */
import useGetUserChannel from '../../../api/getUserChannel.api'



import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

/* -------------------------------------------------------------------------- */
/*                           get side bar component                           */
/* -------------------------------------------------------------------------- */

/* import Sidebar from './Sidebar' */




function Sidebar() {
  const [{ user }, dispatch] = useStateValue();
  const userId=user.uid
  const {data:channels,isLoading,isFetching,error,isError,refetch}=useGetUserChannel(userId)

  if(isLoading){
    return <h2>Loading ...</h2> 
  }

  if(isError){
    console.log(error)
    return (
    <h2>{ error.message}</h2>)
  }

  //const [{user}]=useStateValue()
  return (
    <Box sx={{ display: { xs: 'none', md: 'block' } }}>
    <div className="sidebar">
        <div className="sidebar__header">
          <SidebarHeaderComponent/> 
        </div>
     {/* ----------------------------- search Icon  ---------------------------- */ }
        <SearchComponent/>
      {/* ---------------------------- show all channel ---------------------------- */ }
      <div className="sidebar__chats">
        {
         channels.map((channel)=>(<ShowSidebarChannelComponent key={channel.id} channel={channel} />))
         }       
      </div>

    </div>
    </Box>
  )
}






export default function TemporaryDrawer() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 400 }}
      role="presentation"
      onClick={toggleDrawer('left', false)}
      onKeyDown={toggleDrawer('left', false)}
    >
      <List>
      <Sidebar/>
      </List>
    </Box>
  );

  return (
    <Box>
    <div>
     {['left'].map((anchor) => ( 
   
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
             {list('left')} 
          </Drawer>
        </React.Fragment>
      ))}
    </div>

    </Box>
  );
}





