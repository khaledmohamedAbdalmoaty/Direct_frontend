import axios from 'axios' 
import {useMutation,useQueryClient} from 'react-query'

const API_URL=process.env.REACT_APP_API_URL
const IMG_URL=process.env.REACT_APP_IMG_URL
import {actionTypes} from '../contexts'

import { v4 as generateUniqueNumber } from 'uuid';

/* -------------------------------------------------------------------------- */
/*                     import things related to socket.io                     */
/* -------------------------------------------------------------------------- */
import io from 'socket.io-client'
const sockit_io_URL=process.env.REACT_APP_SOCKIT_IO_URL
const socket=io.connect(sockit_io_URL)


/* -------------------------------------------------------------------------- */
/*                               1.1 block user                               */
/* -------------------------------------------------------------------------- */

const  axiosBlockUser=async ({userId,channelId,dispatch})=>{
    try{
        const bodyCont={
            userId,
            channelId
        }
      /*   console.log(`body content of block ${bodyCont.userId}`)
        console.log(`body content of block channelId => ${bodyCont.channelId}`)
 */

        const {data}=await axios.put(`${API_URL}/channel/blockUser`,bodyCont)
        dispatch({
            type:actionTypes.SUCCESSALERT,
            GlobalAlert:{
                msg:"success Block user",
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
                msg:`failed to block user:Error${err.message}`,
                state:false,
                chatState:generateUniqueNumber()
            }

        })
        return err.message
    }
        
}

export function useBlockUser(){
  const queryClient = useQueryClient()

  return useMutation(axiosBlockUser,{
      onSuccess:(newMessage)=>{
        socket.emit('change',{actionTypes:actionTypes.getChannelConversatio})

/*            queryClient.invalidateQueries('getChannelConversation') 
 */      /*  queryClient.setQueryData(['getChannelConversation',channelId],(oldQueryData)=>{
              return {
                  ...oldQueryData,
                  data:[...oldQueryData,newMessage.data],
              }
          } ) */
      } 
  })
      
}





/* -------------------------------------------------------------------------- */
/*                              1.2 unblock user                              */
/* -------------------------------------------------------------------------- */

const  axiosUnBlockUser=async ({userId,channelId,dispatch})=>{

    try{
        bodyCont={
            userId,
            channelId
        }
        const {data}=await axios.put(`${API_URL}/channel/unBlockUser`,bodyCont)
        dispatch({
            type:actionTypes.SUCCESSALERT,
            GlobalAlert:{
                msg:"success unBlock user",
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
                msg:`failed to unBlock user ${err.message}`,
                state:true,
                chatState:generateUniqueNumber()
            }
        })
        return err.message      
    }
        
}

export function useUnBlockUser(){
  const queryClient = useQueryClient()

  return useMutation(axiosUnBlockUser,{
      onSuccess:(newMessage)=>{
        socket.emit('change',{actionTypes:actionTypes.getChannelConversatio})
           /* queryClient.invalidateQueries('getChannelConversation')  */
      /*  queryClient.setQueryData(['getChannelConversation',channelId],(oldQueryData)=>{
              return {
                  ...oldQueryData,
                  data:[...oldQueryData,newMessage.data],
              }
          } ) */
      } 
  })
      
}




