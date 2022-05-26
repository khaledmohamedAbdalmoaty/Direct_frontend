import React,{useEffect,useState} from 'react'
import Sidebar from './sidebarPage/Sidebar'
import Chat from './chatPage/Chat'
import SinglePost from './chatPage/SinglePost'
import './ChannelMainComponent.css'
import UploadFileComponent from "./chatPage/UploadFileComponent"
import { BrowserRouter as Router ,Routes,Route} from 'react-router-dom';

function App() {
  
  return (
      <div className="app">
        <div className="app__body">
        <Sidebar/>
          <Routes>
                <Route path=":channelName/:channelId" element={<Chat/>}/>
                <Route path="/singlePost/:postId" element={<SinglePost/>}/>
              <Route path="/" element={<h1>Welcome</h1>}/>
              <Route path="/upload" element={<UploadFileComponent/>}/>
          </Routes>
        </div>
      </div>
  )
}

export default App




