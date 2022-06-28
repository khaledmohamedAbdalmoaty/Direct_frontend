/* -------------------------------------------------------------------------- */
/*                  import thing related to react technology                  */
/* -------------------------------------------------------------------------- */
import React,{useEffect,useState} from 'react'

/* -------------------------------------------------------------------------- */
/*                 import things related to sidebar of channel                */
/* -------------------------------------------------------------------------- */
import Sidebar from './sidebarPage/Sidebar'

/* -------------------------------------------------------------------------- */
/*                import things related to main part of channel               */
/* -------------------------------------------------------------------------- */
import Chat from './chatPage/Chat'
import SinglePostComponent from './chatPage/SinglePostComponent'
import UploadImageComponent from "./chatPage/UploadImageComponent"
import ShowOnlyPostsComponent from './chatPage/ShowOnlyPostsComponent'
import CreateChannelComponent from './chatPage/CreateChannelComponent'

/* -------------------------------------------------------------------------- */
/*                              import css files                              */
/* -------------------------------------------------------------------------- */
import './ChannelMainComponent.css'

/* -------------------------------------------------------------------------- */
/*                import things related to react router dom v6                */
/* -------------------------------------------------------------------------- */
import { BrowserRouter as Router ,Routes,Route} from 'react-router-dom';
import SetPriorityNumberComponent from './chatPage/SetPriorityNumberComponent';


function ChannelMainComponent() {
  
  return (
      <div className="app">
        <div className="app__body">
          <Sidebar/>
          <Routes>
              <Route path=":channelName/:channelId" element={<Chat/>}/>
              <Route path="/createChannel" element={<CreateChannelComponent/>}/>
              <Route path="/setPriority" element={< SetPriorityNumberComponent/>}/>
              <Route path="/postOnly/:channelName/:channelId" element={<ShowOnlyPostsComponent/>}/>
              <Route path="/singlePost/:postId" element={<SinglePostComponent/>}/>
              <Route path="/" element={<h1>choose channel </h1>}/>
              <Route path="/upload" element={<UploadImageComponent/>}/>
          </Routes>
        </div>
      </div>
  )
}

export default ChannelMainComponent




