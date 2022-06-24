/* -------------------------------------------------------------------------- */
/*                  import things related to react technology                 */
/* -------------------------------------------------------------------------- */
import React,{useRef,useState,useEffect, version} from 'react'

/* -------------------------------------------------------------------------- */
/*                     import things related to api folder                    */
/* -------------------------------------------------------------------------- */
import  useGetChannelConversationl from '../../../api/getConversation.api'
import useAddNewConversationMsg from '../../../api/SendConversatonMsg.api'


/* -------------------------------------------------------------------------- */
/*                      import different custom component                     */
/* -------------------------------------------------------------------------- */
import ChatMessageComponent  from './ChatMessageComponent'
import ChatHeaderComponent from './ChatHeaderComponent'
import PostComponent from './PostComponent'
import ChatShowUploadedImageComponent from './ChatShowUploadedImageComponent'
import CreatePostComponent from './CreatePostComponent'

/* -------------------------------------------------------------------------- */
/*                  import things related to global variable                  */
/* -------------------------------------------------------------------------- */
import {useStateValue} from '../../../contexts/StateProvider'


const ChatBodyComponent = ({conversation}) => {

  


  return (
    <>
    <div className="chat__body" >
    {
     
     conversation.map((msg,index)=>(
      msg.postEnable && msg.post ? 
      (<PostComponent key={Date.now()+index} post={msg.post} userInfo={msg.whoSendMsg}/>)  : 
      msg.uploadedImageEnable ?  
      (
      <ChatShowUploadedImageComponent key={index+Date.now()} msg={msg}/>)
       :(<ChatMessageComponent key={index+Date.now()+Date.now()} msg={msg} index={index} />)
    ))
    
    }
   
       
    </div>
    </>
  )
}

export default ChatBodyComponent