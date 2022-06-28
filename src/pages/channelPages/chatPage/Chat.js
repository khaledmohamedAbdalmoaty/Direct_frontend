/* -------------------------------------------------------------------------- */
/*                  import things related to react technology                 */
/* -------------------------------------------------------------------------- */
import React,{useRef,useState} from 'react'

/* -------------------------------------------------------------------------- */
/*                     import things related to css files                     */
/* -------------------------------------------------------------------------- */

import './Chat.css'

/* -------------------------------------------------------------------------- */
/*            import things related to  react router dom version.6            */
/* -------------------------------------------------------------------------- */
import {useParams} from 'react-router-dom'



/* -------------------------------------------------------------------------- */
/*                     import things related to api folder                    */
/* -------------------------------------------------------------------------- */
import  useGetChannelConversationl from '../../../api/getConversation.api'
import useAddNewConversationMsg from '../../../api/SendConversatonMsg.api'

/* -------------------------------------------------------------------------- */
/*                      import different custom component                     */
/* -------------------------------------------------------------------------- */
import ChatHeaderComponent from './ChatHeaderComponent'
import ChatBodyComponent from './ChatBodyComponent'

/* -------------------------------------------------------------------------- */
/*                     import form materila ui version 5                     */
/* -------------------------------------------------------------------------- */
import Box from '@mui/material/Box';

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
  const {mutate,isLoading:addMsgLoading,isError:addMsgisError,error:addMsgError}= useAddNewConversationMsg(channelId)
  
  if(isLoading){
    return <h2>Loading ....</h2>
  }
  if(isError){
    return (
    <>
    <ChatHeaderComponent  channelName={channelName} channelImageLocation={channelImageLocation}/>
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



  
  return (
     
    <div className="chat">
        <ChatHeaderComponent channelName={channelName} ChannelImageLocation={channelImageLocation}/>
        <ChatBodyComponent  conversation={conversation}/>

      

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
