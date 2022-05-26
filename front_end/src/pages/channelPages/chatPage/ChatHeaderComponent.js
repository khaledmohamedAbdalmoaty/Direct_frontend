import React from 'react'
import SearchComponent from '../SearchComponent'
import UploadFileComponent from './UploadFileComponent'
import ShowListComponent from '../ShowListComponent'
import './Chat.css'
import {Tooltip,Avatar,TextField}  from '@mui/material'
import actionTypes from '../../../contexts/reducer'

const ChatHeaderComponent = ({channelId,ChannelName,ChannelImageLocation}) => {
  return (

      <div className="chat__header">
       
          <Avatar srcSet={ChannelImageLocation}/> 
          <div className="chat__headerInfo">
            <h3>{ChannelName}</h3>
          </div>  
          <div className="chat__headerRight">
                <SearchComponent/>
              <UploadFileComponent  channelId={channelId} actiontype={actionTypes.UPLOAd_IMAGE} postTitle={'Upload  photo'} inputPlaceHolder={'write your photo caption here '} TooltipTitle={'upload an image'}/>
            <ShowListComponent options={['createPost','showChannels']}/>
          </div>
      </div>
  
  )
}

export default  ChatHeaderComponent