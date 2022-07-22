import axios from 'axios' 
import {useMutation,useQueryClient, useQuery} from 'react-query'
const API_URL=process.env.REACT_APP_API_URL

import { v4 as generateUniqueNumber } from 'uuid';
import {actionTypes} from '../contexts'


/* -------------------------------------------------------------------------- */
/*                     import things related to socket.io                     */
/* -------------------------------------------------------------------------- */
import io from 'socket.io-client'
const sockit_io_URL=process.env.REACT_APP_SOCKIT_IO_URL
const socket=io.connect(sockit_io_URL)


/* -------------------------------------------------------------------------- */
/*                                  1.1subscribe                                 */
/* -------------------------------------------------------------------------- */
const axiosSubscribeRequest=async ({userId,channelId,dispatch})=>{
    try{
       const bodyContent={
        userId
       }
        const {data}=await axios.put(`${API_URL}/channel/${channelId}/subscribe`,bodyContent)

        dispatch({
            type:actionTypes.SUCCESSALERT,
            GlobalAlert:{
                msg:"success subscribe",
                state:true,
                chatState:generateUniqueNumber()
            }

        })
       
        return data
    }
    catch(err){
        dispatch({
            type:actionTypes.FAILEDALERT,
            GlobalAlert:{
                msg:`failed to subscribe : ${err.message}`,
                state:false,
                chatState:generateUniqueNumber()
            }
        })
        return err
    }
     
}




export const useSubscribe=()=>{
    const queryClient = useQueryClient()
    return useMutation(axiosSubscribeRequest,{
        onSuccess:(newMessage)=>{
            queryClient.invalidateQueries(actionTypes.getChannelConversation)
            queryClient.invalidateQueries(actionTypes.getUserChannel)
      /*   socket.emit('change',{actionTypes:actionTypes.getChannelConversation})
        socket.emit('change',{actionTypes:actionTypes.getUserChannel}) */
        } 
    })        
}


/* -------------------------------------------------------------------------- */
/*                               1.2 unSubscribe                              */
/* -------------------------------------------------------------------------- */

const axiosUnSubscribe=async ({userId,channelId,dispatch})=>{
    try{
       const bodyContent={
        userId
       }
/*         console.log(`from delete post function  => ${deletePostData.postOwner}`)
 */
        const {data}=await axios.put(`${API_URL}/channel/${channelId}/unsubscribe`,bodyContent)

        dispatch({
            type:actionTypes.SUCCESSALERT,
            GlobalAlert:{
                msg:"success unsubscribe",
                state:true,
                chatState:generateUniqueNumber()
            }

        })
       
        return data
    }
    catch(err){
        dispatch({
            type:actionTypes.FAILEDALERT,
            GlobalAlert:{
                msg:`failed to unsubscribe : ${err.message}`,
                state:false,
                chatState:generateUniqueNumber()
            }
        })
        return err
    }
     
}


export const useUnSubscribe=()=>{
    const queryClient = useQueryClient()
    return useMutation(axiosUnSubscribe,{
        onSuccess:(newMessage)=>{
            queryClient.invalidateQueries(actionTypes.getChannelConversation)
            queryClient.invalidateQueries(actionTypes.getUserChannel)

           /*  socket.emit('change',{actionTypes:actionTypes.getChannelConversation})
            socket.emit('change',{actionTypes:actionTypes.getUserChannel}) */
        } 
    })        
}

