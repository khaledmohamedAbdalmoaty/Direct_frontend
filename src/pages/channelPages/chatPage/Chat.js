/* -------------------------------------------------------------------------- */
/*                  import things related to react technology                 */
/* -------------------------------------------------------------------------- */
import React,{useRef,useState,useEffect} from 'react'
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
import  {useGetChannelData,useAddNewConversationMsg} from '../../../api'

/* -------------------------------------------------------------------------- */
/*                      import different custom component                     */
/* -------------------------------------------------------------------------- */
import ChatBodyComponent from './ChatBodyComponent'
import ChatHeaderComponent2 from './ChatHeaderComponent2'
import SubscribeButton from './SubscribeButton'

/* -------------------------------------------------------------------------- */
/*                     import form materila ui version 5                     */
/* -------------------------------------------------------------------------- */
import Box from '@mui/material/Box';

/* -------------------------------------------------------------------------- */
/*                  import things related to global variable                  */
/* -------------------------------------------------------------------------- */
import {useStateValue,actionTypes} from '../../../contexts'
import {Alert,GoBackComponent} from '../../../common'



function Chat() {
  //addNewMsg(channelId,inputRef.current.value,userId)
  const inputRef=useRef()
  const[state,setState]=useState(false)
  const {channelOwner,channelName,channelId}=useParams() 
  const [{user,GlobalAlert},dispatch]=useStateValue()
  const [showAlert,setShowAlert]=useState(false)

  const userId=user.user_id
  const currentUser=JSON.parse(localStorage.getItem('currentUserInfo')).user_id
  /* const currentUser=user.user_id */
  const {data:channelData,isLoading,isFetching,error,isError,refetch}=useGetChannelData(channelId)//it call get conversation message from api end Point
  const {mutate,isLoading:addMsgLoading,isError:addMsgisError,error:addMsgError}= useAddNewConversationMsg(channelId)
  useEffect(()=>{
    setShowAlert(true)
    setTimeout(()=>{
      setShowAlert(false)
      dispatch({
        type:actionTypes.RESETALERT
      })
    },1500)
  },[GlobalAlert.chatState])
  
  if(isLoading){
    return <h2>Loading ....</h2>
  }
  if(isError){
    return (
    <>
    <ChatHeaderComponent2   channelName={channelName} channelId={channelId}  channelOwner={channelOwner} />
    <h1>{error.message}</h1>
    </>
    )
  }

const handleAddMsg =async (e)=>{
    e.preventDefault()
    const message=inputRef.current.value
    mutate({channelId,message,userId})
    inputRef.current.value=""
  } 

  const handleSubscribe=()=>{
    console.log("subscribe")
  }

 

    {/* check if user is block  */}
    if(channelData.channel.BlockedUser.includes(userId)){
     return (
       <>
       <GoBackComponent />
       <h1 style={{margin:'auto'}}>{`channel Owner Blocked You`}</h1>
       </>
      )
    }
    
   
    const isSubScribe=channelData.channel.subScribers.includes(userId)
  
return (
     
<div className="chat">  
  <ChatHeaderComponent2 isSubScribe={isSubScribe} postOnly={channelData.channel.postOnly} channelId={channelId} canMakePost={channelData.channel.subScribersCanMakePost} channelOwner={channelOwner} channelName={channelName}/> 
  {showAlert&&GlobalAlert.msg&&<Alert message={GlobalAlert}/>}

  <ChatBodyComponent isSubScribe={isSubScribe} channelOwner={channelOwner} conversation={channelData.conversation} channelId={channelId}/>

        {/*  chat footer */}
        {
          (isSubScribe||(channelOwner===currentUser))? (!channelData.channel.postOnly)&&(
            <div className="chat__footer">
                <form >
                  <input  ref={inputRef} placeholder='Type a message' type="text"/>
                  <button  onClick={handleAddMsg} type="submit" >send Message</button>
                </form>
            </div>
          ):(       
               <SubscribeButton  channelId={channelId}/>
          )
        }
        
</div>
  
  )
}

export default Chat