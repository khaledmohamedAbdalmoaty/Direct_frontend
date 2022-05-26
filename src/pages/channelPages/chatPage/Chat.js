/* -------------------------------------------------------------------------- */
/*                  import things related to react technology                 */
/* -------------------------------------------------------------------------- */
import React,{useRef,useState,useEffect} from 'react'
/* -------------------------------------------------------------------------- */
/*                      import different custom component                     */
/* -------------------------------------------------------------------------- */

import './Chat.css'
import {useParams} from 'react-router-dom'
import ChatMessageComponent  from './ChatMessageComponent'
import ChatHeaderComponent from './ChatHeaderComponent'
import  useGetChannelConversationl from '../../../api/getConversation.api'
import useAddNewConversationMsg from '../../../api/SendConversatonMsg.api'
import PostComponent from './PostComponent'
import ChatShowUploadedImageComponent from './ChatShowUploadedImageComponent'
/* -------------------------------------------------------------------------- */
/*                     import form materila ui version 5                     */
/* -------------------------------------------------------------------------- */
import {Tooltip,Avatar,TextField}  from '@mui/material'

/* -------------------------------------------------------------------------- */
/*                  import things related to global variable                  */
/* -------------------------------------------------------------------------- */
import {useStateValue} from '../../../contexts/StateProvider'



function Chat() {
  //addNewMsg(channelId,inputRef.current.value,userId)
  const inputRef=useRef()
  const[state,setState]=useState(false)
  const {channelId,channelName,channelImageLocation}=useParams()
  const [{ user }, dispatch] = useStateValue();
  const userId=user.uid
  const {data:conversation,isLoading,isFetching,error,isError,refetch}=useGetChannelConversationl(channelId)
   const {mutate,isLoading:addMsgLoading,isError:addMsgisError,error:addMsgError}=  useAddNewConversationMsg(channelId)
  
  if(isLoading){
    return <h2>Loading ....</h2>
  }
  if(isError){
    return (
    <>
    <ChatHeaderComponent userId={userId} channelId={channelId} ChannelName={channelName} ChannelImageLocation={channelImageLocation}/>
    <h1>{error.message}</h1>
    </>
    )
  }

  const handleUploadFile=()=>{
    setState(true)
  }
  const handleAddMsg =async (e)=>{
    e.preventDefault()
    const message=inputRef.current.value
    mutate({channelId,message,userId})
    inputRef.current.value=""
  } 


  const post={
    _id:"24520893058029508230459203480",
    postImageUrl:"https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80",
    postDescription:"no one is safe from any thing right now in the age of elsisy do you have any thing else to say man"
  }
  return (
    <div className="chat">
        <ChatHeaderComponent ChannelName={channelName} ChannelImageLocation={channelImageLocation}/>

        <div className="chat__body" >
      {/*     <PostComponent post={post}/>   */}
          <ChatShowUploadedImageComponent post={post}/>  
          <ChatMessageComponent conversation={conversation}/>
        </div>
        {/*  chat footer */}
        <div className="chat__footer">
            <form >
               <input  ref={inputRef} placeholder='Type a message' type="text"/>
             <button  onClick={handleAddMsg} type="submit" >send Message</button>
            </form>
        </div>

    </div>
  )
}

export default Chat
