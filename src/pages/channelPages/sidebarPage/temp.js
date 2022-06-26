
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



/* -------------------------------------------------------------------------- */

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
  )
}

export default Sidebar






