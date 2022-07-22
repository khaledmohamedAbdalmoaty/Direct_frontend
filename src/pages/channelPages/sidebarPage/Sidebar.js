
/* -------------------------------------------------------------------------- */
/*                 import things related to reacct technology                 */
/* -------------------------------------------------------------------------- */
import React,{useState,useEffect} from 'react'
import './Sidebar.css'


/* -------------------------------------------------------------------------- */
/*                  import things related to global variable                  */
/* -------------------------------------------------------------------------- */
import {useStateValue} from '../../../contexts'



/* ----------------------------- new add things ----------------------------- */
import ShowSidebarChannelComponent from './ShowSidebarChannelComponent'
import SidebarHeaderComponent from './SidebarHeaderComponent'
import {SearchComponent} from '../SearchPage'

/* --------------------- import get user channel request -------------------- */
import {useGetUserChannel} from '../../../api'

/* -------------------------------------------------------------------------- */
/*                           import custom component                          */
/* -------------------------------------------------------------------------- */
import EmailSidebarLink from './EmailSidebarLink'
import SendedEmailSidebarLink from './SendedEmailSidebarLink'
/* -------------------------------------------------------------------------- */

function Sidebar() {
  const userId=JSON.parse(localStorage.getItem('currentUserInfo')).user_id
  const {data:channels,isLoading,isFetching,error,isError,refetch}=useGetUserChannel(userId)

  if(isLoading){
    return <h2>Loading ...</h2> 
  }

  if(error||!channels) {
    console.log(error)
    return (
    <h2>sidebarError:No channels</h2>)
  }

  //const [{user}]=useStateValue()
  return (  
    <div className="sidebar" style={{maxWidth:"300px"}}>
        <div className="sidebar__header">
          <SidebarHeaderComponent  currentUserData={channels.currentUserData}/> 
        </div>
     {/* ----------------------------- search Icon  ---------------------------- */ }
        <SearchComponent/>

     {/*  ---------------------------- E-mail component ----------------------------  */}
     
      {/* ---------------------------- show all channel ---------------------------- */ }
      <div className="sidebar__chats">
        <EmailSidebarLink/>
        <SendedEmailSidebarLink/>
    
        {
         channels.allChannel.map((channel)=>(<ShowSidebarChannelComponent key={channel._id} channel={channel.channelIdModel} />))
        }       
      </div>

    </div>

  )
}

export default Sidebar






