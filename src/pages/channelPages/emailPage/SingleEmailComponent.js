
/* -------------------------------------------------------------------------- */
/*                  import things related to react technology                 */
/* -------------------------------------------------------------------------- */
import React,{useRef,useState,useEffect, version} from 'react'

/* -------------------------------------------------------------------------- */
/*                     import things related to api folder                    */
/* -------------------------------------------------------------------------- */

import {useGetEmailById,useGetAllReply,useAddNewReply} from '../../../api'
/* -------------------------------------------------------------------------- */
/*                           import custom component                          */
/* -------------------------------------------------------------------------- */
import EmailComponent from './EmailComponent'
import ShowReplyComponent from './ShowReplyComponent'
/* -------------------------------------------------------------------------- */
/*                  import things related to global variable                  */
/* -------------------------------------------------------------------------- */
import {GoBackComponent} from '../../../common'

/* -------------------------------------------------------------------------- */
/*                               import css file                              */
/* -------------------------------------------------------------------------- */
import '../chatPage/Chat.css'

/* -------------------------------------------------------------------------- */
/*                               import from mui                              */
/* -------------------------------------------------------------------------- */
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import Grid from '@mui/material/Grid';



import {useParams,useNavigate} from 'react-router-dom'


const SingleEmailComponent = () => {
  const {emailId}=useParams()
  const inputRef=useRef()
  
  const {data:email,isLoading,isFetching,error,isError,refetch}=useGetEmailById(emailId)
  const {data:Replys,isLoading:replyIsLoading,isFetching:replyIsFetching,error:replyError,isError:replyIsError,refetch:replyRefetch}=useGetAllReply(emailId)
  const {mutate}=useAddNewReply()

  const handleSendReply=async (e)=>{
    e.preventDefault()
    const fromId=email.from._id
    const replyMessage=inputRef.current.value
    mutate({fromId,replyMessage,emailId})
    inputRef.current.value=""
  }

  if(isLoading || replyIsLoading){
    return (<h1>Loading....</h1>)
  }
  if(isError|| replyIsError){
    return (<h1>Error happened</h1>)
  }

  return (
  <div className="chat">
       <GoBackComponent/>

    <div className="chat__body" >
     <EmailComponent key={"jlkavh^%@!~nc55"} email={email} userInfo={email.from} isSingleEmail={true}/>
        
        {
        Replys.map((reply,index)=>(
          reply.enableReply&&(<ShowReplyComponent key={'aljsdfqvqwef7$!'+index} reply={reply}  index={index}/>) 
        ))
        
        }   
     
    </div>

     {/*  chat footer */}
     <div className="chat__footer">
        <form >
          <input  ref={inputRef} placeholder='send Reply' type="text"/>
          <button  type="submit" onClick={handleSendReply} >send Reply</button>
        </form>
      </div>
  </div>

  )
}

export default SingleEmailComponent






