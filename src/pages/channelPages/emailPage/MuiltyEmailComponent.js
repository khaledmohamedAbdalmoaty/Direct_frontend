
/* -------------------------------------------------------------------------- */
/*                  import things related to react technology                 */
/* -------------------------------------------------------------------------- */
import React,{useRef,useState,useEffect, version} from 'react'

/* -------------------------------------------------------------------------- */
/*                     import things related to api folder                    */
/* -------------------------------------------------------------------------- */
import  useGetChannelConversationl from '../../../api/getConversation.api'
import useAddNewConversationMsg from '../../../api/SendConversatonMsg.api'
import {useGetFromToEmails,useGetAllEmailYouSend} from '../../../api'
/* -------------------------------------------------------------------------- */
/*                           import custom component                          */
/* -------------------------------------------------------------------------- */
import EmailComponent from './EmailComponent'
import EmailHeaderComponent from './EmailHeaderComponent'
import ShowReplyComponent from './ShowReplyComponent'

/* -------------------------------------------------------------------------- */
/*                  import things related to global variable                  */
/* -------------------------------------------------------------------------- */
import {useStateValue,actionTypes} from '../../../contexts'
import {GoBackComponent,ReturnDate,ReturnTodayDate} from '../../../common'

/* -------------------------------------------------------------------------- */
/*                               import css file                              */
/* -------------------------------------------------------------------------- */
import '../chatPage/Chat.css'

/* -------------------------------------------------------------------------- */
/*                               import from mui                              */
/* -------------------------------------------------------------------------- */
import IconButton from '@mui/material/IconButton';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Avatar from '@mui/material/Avatar';





import {useParams,useNavigate} from 'react-router-dom'


const MuiltyEmailComponent = ({switchOptions}) => {
  const {fromId}=useParams()
  const nav=useNavigate()
  const currentUserId=JSON.parse(localStorage.getItem('currentUserInfo')).user_id
   const {data:emails,isLoading,isFetching,error,isError,refetch}=(switchOptions===actionTypes.EmailYouSend)?  useGetAllEmailYouSend(currentUserId):useGetFromToEmails(fromId,currentUserId)
  
  const handleShowProfile=(_id)=>{
    nav(`/profile/${_id}`)
  }
 

  if(isLoading){
    
    return (
      <>
      <GoBackComponent/>
      <h1 style={{margin:'auto',width:"50%"}}>Loading....</h1>
      </>
  )
  }
  if(isError){
    
    return (
    <>
      <GoBackComponent/>
     <h1  style={{margin:'auto',width:"50%"}}>Error happened</h1>
    </>
   )
  }

  if(emails.code&&(emails.code==500)){
   
    return (
      <>
       <GoBackComponent/>
       <h1  style={{margin:'auto',width:"50%"}}>Error:{emails.err}</h1>
      </>
  
    )
  }

  return (
  <div className="chat">
<GoBackComponent/>

    <div className="chat__body" >
      {
      emails.map((email,index)=>(
        !email.enableReply? (<EmailComponent key={"jlk3#@x<h^%@!~nc"+index} email={email} userInfo={email.from}/>):
        (
          <React.Fragment key={email._id}>
          {/*   to show the header and body of Email */}
          <ListItem /* button  */   >
          <ListSubheader sx={{ bgcolor:'#121212' ,color:'white',fontSize:"9px",width:"100px",maxHeight:'100px',marginRight:'2px'}}>
               {ReturnTodayDate(email.timestamp)}
          </ListSubheader>
              <ListItemAvatar>
              <IconButton aria-label="chatMessage" onClick={()=>handleShowProfile(email.from._id)}>
                <Avatar alt="Picture:NotFound!!!" imgProps={{crossOrigin:"anonymous" }} src={email.from&&email.from.profilePicture} />
              </IconButton>
              </ListItemAvatar>
               <ListItemText primary={`reply to Email with tilte ---> ${email.replyOnMail.headerTitle}`} secondary={email.emailBody} />
       
          <IconButton color="primary" onClick={()=>nav(`/channel/singleEmail/${email.replyOnMail._id}`)} aria-label="upload picture" component="span">
          <ForwardToInboxIcon/>
          </IconButton>
          </ListItem> 
          </React.Fragment>

        )//end of show Reply
      ))
      
      }   
    </div>
  </div>
  )
}

export default MuiltyEmailComponent

