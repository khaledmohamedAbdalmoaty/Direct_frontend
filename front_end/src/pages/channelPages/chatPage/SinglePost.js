import React,{useRef,useState,useEffect} from 'react'
import './Chat.css'
import axios from '../axios'
import {useParams} from 'react-router-dom'
import Pusher from 'pusher-js'
import ShowListComponent from '../ShowListComponent'
import PostComponent from './PostComponent'
import SearchComponent from '../SearchComponent'
import UploadFileComponent from './UploadFileComponent'
/* -------------------------------------------------------------------------- */
/*                     import form materila ui version 5                     */
/* -------------------------------------------------------------------------- */
import {Tooltip,Avatar,TextField}  from '@mui/material'
import ShowMessageComponent from './ChatMessageComponent'



const conversation2=[
  {
    "user": {
      "name": "khaled5"
    },
    "message": "see her name right now",
    "timestamp": "2022-04-24T20:35:04.983Z",
    "received": true,
    "_id": "6265b8bb5f5e939a618621a9"
  },
  {
    "user": {
      "name": "khaled5"
    },
    "message": "see her name right now",
    "timestamp": "2022-04-24T20:35:04.983Z",
    "received": true,
    "_id": "6265b8bc5f5e939a618621ab"
  },
  {
    "user": {
      "name": "khaled5"
    },
    "message": "see her name right now",
    "timestamp": "2022-04-24T20:35:04.983Z",
    "received": true,
    "_id": "6265b8bc5f5e939a618621ad"
  },
]



export default function SinglePost() {
  const {postId}=useParams()
  const[conversation,setConversation]=React.useState([])
  let inputRef=useRef()
  const [state,setState]=React.useState()
  const handleUploadFile=()=>{
    console.log("clicked");
    setState(true)
  }
  let handleSubmit=async (e)=>{
    e.preventDefault()
    await axios.post(`/new/conversationMsg?id=${postId}`,{
      message:inputRef.current.value,
      user:{name:"khaled abdalmoaty "},
      received:false
    })
    inputRef.current.value=""
  }

  const getConversation=()=>{
    axios.get(`/get/conversationMsg?id=${postId}`).then((res)=>{
        console.log(`response of conversationData ${res.data}`)
        setConversation(res.data)
    })
  }

  const pusher = new Pusher('09ee181751da269dbb46', {
    cluster: 'eu'
  });

  useEffect(()=>{
    if(postId){
      getConversation()

      const channel = pusher.subscribe('conversation');
      channel.bind('newMessage', (data)=> {
       getConversation()
      });

    return ()=>{
        channel.unbind_all();
        channel.unsubscribe()  
      } 
    } 
  },[postId])
  const post={
    _id:"24520893058029508230459203480",
    postImageUrl:"https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80",
    postDescription:"no one is safe from any thing right now in the age of elsisy do you have any thing else to say man"
    ,conversation:conversation
  }
  

  return (
    <div className="chat">
     {/*  chat header  */}
     <div className="chat__header">
       <Avatar/>
       <div className="chat__headerInfo">
         <h3>Room name</h3>
         <p>last seen at ....</p>
       </div>  
       <div className="chat__headerRight">
        {/*  search component in chat section */}
            <SearchComponent/>
        {/* upload file icon in chat section  */}
          <UploadFileComponent postTitle={'Upload Your file'} inputPlaceHolder={'write file caption here '} TooltipTitle={'upload a file'}/>
    
        {/*  more list in the chat section  */}
         <ShowListComponent options={['createPost','showChannels']}/>
      </div>
     </div>
        {/*  chat body */}
        <div className="chat__body" >
           <PostComponent post={post}/> 
            <ShowMessageComponent conversation={conversation2}/>
         </div>
       {/*  chat footer */}
        <div className="chat__footer">
            <form >
               <input  ref={inputRef} placeholder='Type a message' type="text"/>
             <button  onClick={handleSubmit} type="submit" >send Message</button>
            </form>
        </div>

    </div>
  )
}





