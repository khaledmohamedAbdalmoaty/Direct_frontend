import axios from 'axios' 
import {useMutation,useQueryClient, useQuery} from 'react-query'
const API_URL=process.env.REACT_APP_API_URL
import { initialState,actionTypes} from '../contexts'
import { v4 as generateUniqueNumber } from 'uuid';

/* -------------------------------------------------------------------------- */
/*                     import things related to socket.io                     */
/* -------------------------------------------------------------------------- */
import io from 'socket.io-client'
const sockit_io_URL=process.env.REACT_APP_SOCKIT_IO_URL
const socket=io.connect(sockit_io_URL)





/* -------------------------------------------------------------------------- */
/*                            1.get all email of use                            */
/* -------------------------------------------------------------------------- */

async function axiosGetAllEmails(userId){
    try{
        const {data}=await axios.get(`${API_URL}/email/to?id=${userId}`)
       /*  console.log(`from axios get all mail => ${data[0]}`) */
        return data
    }
    catch(err){
        return err
    }
 
    
}

export const useGetAllEmails=(userId)=>{
      return useQuery(['getAllEmails',userId],()=> axiosGetAllEmails(userId))
}

/* -------------------------------------------------------------------------- */
/*                        get all emil from user To you                       */
/* -------------------------------------------------------------------------- */

const axiosGetFromToEmails=async(fromId,currentUserId)=>{
    try{
        console.log(`from => from user to you route => from:${fromId},to:${currentUserId}`)
        const {data}=await axios.get(`${API_URL}/email/allEmail/fromUser/toYou?from=${fromId}&to=${currentUserId}`)
     
       /*  console.log(`from axios get all mail => ${data[0]}`) */
        return data
    }
    catch(err){
        return {code:500,err:err.message}
    }
 
    
}

export const useGetFromToEmails=(fromId,currentUserId)=>{
      return useQuery(['getAllEmailsFromToUser',{fromId,currentUserId}],()=> axiosGetFromToEmails(fromId,currentUserId))
}

/* -------------------------------------------------------------------------- */
/*                           get all Email you send                           */
/* -------------------------------------------------------------------------- */
const  axiosGetAllEmailYouSend=async(currentUserId)=>{
    try{

        const {data}=await axios.get(`${API_URL}/email/from/${currentUserId}`)
       /*  console.log(`from axios get all mail => ${data[0]}`) */
        return data
    }
    catch(err){
        return {code:500,err:err.message}
    }
 
    
}

export const useGetAllEmailYouSend=(currentUserId)=>{
      return useQuery(['getAllEmailsYouSend',currentUserId],()=> axiosGetAllEmailYouSend(currentUserId))
}


/* -------------------------------------------------------------------------- */
/*                            1.get email via it's id                           */
/* -------------------------------------------------------------------------- */

async function axiosGetEmailById(EmailId){
    try{
        const {data}=await axios.get(`${API_URL}/email/singleEmail?id=${EmailId}`)
       /*  console.log(`from axios get all mail => ${data[0]}`) */
        return data
    }
    catch(err){
        return err
    }
 
    
}

export const useGetEmailById=(EmailId)=>{
      return useQuery(['getEmailById',EmailId],()=>  axiosGetEmailById(EmailId))
}



/* -------------------------------------------------------------------------- */
/*           # 1.get all reply from one user to another on single post          */
/* -------------------------------------------------------------------------- */

async function axiosGetAllReply(EmailId){
    try{
        const {data}=await axios.get(`${API_URL}/email/reply/from/to?id=${EmailId}`)
       /*  console.log(`from axios get all mail => ${data[0]}`) */
        return data
    }
    catch(err){
        return err
    }
 
    
}

export const useGetAllReply=(EmailId)=>{
    return useQuery(['getAllReply',EmailId],()=>  axiosGetAllReply(EmailId))
}


/* -------------------------------------------------------------------------- */
/*                            1.send a new Email                              */
/* -------------------------------------------------------------------------- */
async function axiosSendEmail({currentUser,targetPersonId,headerTitle,emailBody,dispatch}){
    try{
        const newEmail={
            from:currentUser,
            to:targetPersonId,
            headerTitle,
            emailBody,
            enableImage:false,
        }
        const {data}=await axios.post(`${API_URL}/email/sendEmail`,newEmail)   
        dispatch({
            type:actionTypes.SUCCESSALERT,
            GlobalAlert:{
                msg:"successfully send Email",
                state:true,
                sendEmailComponent:generateUniqueNumber()
            }
        })    
        return data
    }
    catch(err){
        dispatch({
            type:actionTypes.FAILEDALERT,
            GlobalAlert:{
                msg:`failed to create Email => (Error):${err.message}`,
                state:false,
                sendEmailComponent:generateUniqueNumber()
            }
        })    
        return err.message
    }
   
}

export const useSendNewEmail=()=>{
/*     const queryClient = useQueryClient()
 */    return useMutation(axiosSendEmail,{
        onSuccess:(newMessage)=>{
            socket.emit('change',{actionTypes:actionTypes.getAllEmails})
            socket.emit('change',{actionTypes:actionTypes.getAllEmailsYouSend})
           

        /*  queryClient.setQueryData(['getChannelConversation',channelId],(oldQueryData)=>{
                return {
                    ...oldQueryData,
                    data:[...oldQueryData,newMessage.data],
                }
            } ) */
        } 
    })
        
}




/* -------------------------------------------------------------------------- */
/*                      1.send new reply on specific Email                      */
/* -------------------------------------------------------------------------- */

async function axiosSendReply({fromId,replyMessage,emailId}){
     
    try{
        const  userId=initialState.user.user_id
        const newReply={
            from:userId,
            to:fromId,
            enableReply:true,
            replyMessage,
            replyOnMail:emailId,
            replyEmailId:emailId
        }
      
        const {data}=await axios.post(`${API_URL}/email/sendReply`,newReply)       
        return data
    }
    catch(err){
        return err
    }
   
}

export const useAddNewReply=()=>{
    const queryClient = useQueryClient()
    return useMutation(axiosSendReply,{
        onSuccess:(newMessage)=>{
            socket.emit('change',{actionTypes:actionTypes.getAllReply})

        /*  queryClient.setQueryData(['getChannelConversation',channelId],(oldQueryData)=>{
                return {
                    ...oldQueryData,
                    data:[...oldQueryData,newMessage.data],
                }
            } ) */
        } 
    })
        
}