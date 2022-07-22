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
import {useStateValue} from '../../../contexts'
import {Alert} from '../../../common'


/* -------------------------------------------------------------------------- */
/*                  import things related to global variable                  */
/* -------------------------------------------------------------------------- */




const ChatBodyComponent = ({conversation,channelOwner,channelId,isSubScribe}) => {
  const [{user,GlobalAlert},dispatch]=useStateValue()

  return (
    <>
    <div className="chat__body" >
    {
     conversation.map((msg,index)=>(
      (msg.postEnable && msg.post) ? 
      (<PostComponent msg={msg} isSubScribe={isSubScribe} key={'jaa8fhavadfei8892823'+index} post={msg.post} userInfo={msg.whoSendMsg}/>)  : 
      msg.uploadedImageEnable ?  
      (
      <ChatShowUploadedImageComponent key={index+'aklsjdiqvnq87v'} msg={msg}/>)
       :(<ChatMessageComponent key={index+'qinvq828vap[}'} msg={msg} index={index}  channelOwner={channelOwner} />)
    ))
    
    }
   
       
    </div>
    </>
  )
}

export default ChatBodyComponent