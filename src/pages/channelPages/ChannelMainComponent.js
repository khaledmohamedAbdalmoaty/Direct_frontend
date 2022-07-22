/* -------------------------------------------------------------------------- */
/*                  import thing related to react technology                  */
/* -------------------------------------------------------------------------- */
import React,{useEffect,useState} from 'react'

/* -------------------------------------------------------------------------- */
/*                 import things related to sidebar of channel                */
/* -------------------------------------------------------------------------- */
import {Sidebar,ShowSidebarInSmallScreen} from './sidebarPage'

/* -------------------------------------------------------------------------- */
/*                   import custom component related to chat                  */
/* -------------------------------------------------------------------------- */
import {Chat,SinglePostComponent,UploadImageComponent,CreateChannelComponent,ChangePriorityNumberComponent} from './chatPage'
import {SendEmailComponent,MuiltyEmailComponent,AllEmailComponent,SingleEmailComponent,AllEmilYouSend} from './emailPage'
import {ShowSearchChannel} from './SearchPage'
/* -------------------------------------------------------------------------- */
/*                              import css files                              */
/* -------------------------------------------------------------------------- */
import './ChannelMainComponent.css'

/* -------------------------------------------------------------------------- */
/*                import things related to react router dom v6                */
/* -------------------------------------------------------------------------- */
import { BrowserRouter as Router ,Routes,Route} from 'react-router-dom';

/* -------------------------------------------------------------------------- */
/*                           import things from mui                           */
/* -------------------------------------------------------------------------- */
import Box from '@mui/material/Box';

/* -------------------------------------------------------------------------- */
/*                     import things related to socket.io                     */
/* -------------------------------------------------------------------------- */
import io from 'socket.io-client'
const sockit_io_URL=process.env.REACT_APP_SOCKIT_IO_URL
const socket=io.connect(sockit_io_URL)
import {actionTypes} from '../../contexts'
import{ useQueryClient} from "react-query"


function ChannelMainComponent() {
  const queryClient2 = useQueryClient()

  useEffect(()=>{
    /*  add Socket.io event listener */
   socket.on('update',(payload)=>{
    switch(payload.actionTypes){
      case actionTypes.getChannelConversation:
        return queryClient2.invalidateQueries(actionTypes.getChannelConversation)

      case actionTypes.getUserChannel:
        return queryClient2.invalidateQueries(actionTypes.getUserChannel)

      case actionTypes.getMainPagePosts:
        return queryClient2.invalidateQueries(actionTypes.getMainPagePosts)

      case actionTypes.getPostById:
        return queryClient2.invalidateQueries(actionTypes.getPostById)

      case actionTypes.getPostComments:
        return queryClient2.invalidateQueries(actionTypes.getPostComments)

      case actionTypes.getSearchChannels:
        return queryClient2.invalidateQueries(actionTypes.getSearchChannels)
      
      case actionTypes.getUserData:
        return queryClient2.invalidateQueries(actionTypes.getUserData)

      case actionTypes.getAllEmails:
        return queryClient2.invalidateQueries(actionTypes.getAllEmails)
      
      case actionTypes.getAllEmailsYouSend:
        return queryClient2.invalidateQueries(actionTypes.getAllEmailsYouSend)
      
      case actionTypes.getAllReply:
        return queryClient2.invalidateQueries(actionTypes.getAllReply)

      default:
        return null
    }})
  })
  
  return (
      <div className="app">
        <div className="app__body">
        <Box sx={{ display: { xs: 'none', md: 'block' } }}   position="sticky">
          <Sidebar/>
        </Box>
          <Routes>
            {/*  show search route */}
            <Route path="/showChannelSearchResult" element={<ShowSearchChannel/>}/>
            {/*   1. channel route  */}
              <Route path="/:channelOwner/:channelName/:channelId" element={<Chat/>}/>
              <Route path="/createChannel" element={<CreateChannelComponent/>}/>
              <Route path="/setPriority/:channelId/:channelName" element={<ChangePriorityNumberComponent/>}/>
              <Route path="/showChannelInSmallScreen" element={<Sidebar/>}/>
              <Route path="/" element={<h1>choose channel </h1>}/>


            {/*   1. email Route */}
              <Route path="/sendEmail/:targetPersonId" element={<SendEmailComponent/>}/>
              <Route path="/allEmails" element={<AllEmailComponent/>}/>
              <Route path="/muiltyEmail/:fromId" element={<MuiltyEmailComponent switchOptions={actionTypes.EmailSendToYou}/>}/>
              <Route path="/singleEmail/:emailId" element={<SingleEmailComponent/>}/>
              <Route path="/allYourSendedEmail" element={<AllEmilYouSend/>} />

            {/*  1. post route */}
              <Route path="/singlePost/:postId" element={<SinglePostComponent/>}/>
              <Route path="/upload" element={<UploadImageComponent/>}/>

      

          </Routes>
        </div>
      </div>
  )
}

export default ChannelMainComponent




