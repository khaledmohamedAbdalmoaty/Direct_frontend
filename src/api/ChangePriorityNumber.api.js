import axios from 'axios'
const API_URL=process.env.REACT_APP_API_URL
import {actionTypes} from '../contexts'
import {useMutation,useQueryClient} from 'react-query'

import { v4 as generateUniqueNumber } from 'uuid';


/* -------------------------------------------------------------------------- */
/*                     import things related to socket.io                     */
/* -------------------------------------------------------------------------- */
import io from 'socket.io-client'
const sockit_io_URL=process.env.REACT_APP_SOCKIT_IO_URL
const socket=io.connect(sockit_io_URL)


/* -------------------------------------------------------------------------- */
/*                           change priority number                           */
/* -------------------------------------------------------------------------- */
const  axiosChangePriorityNumber=async ({userId,priority,channelId,dispatch})=>{
  const BodyContent={
    channelId,
    priority,
    userId
  }
  console.log(`channelId:${channelId}`)
  console.log(`priorirty:${priority}`)
  
  axios.put(`${API_URL}/channel/new/priority`,BodyContent)
.then((res)=>{

    dispatch({
      type:actionTypes.SUCCESSALERT,
      GlobalAlert:{
          msg:"success change priority of channel",
          state:true,
          changeChannelPriorityNumber:generateUniqueNumber()
      }

    })
     
})

.catch((err)=>{

  dispatch({
    type:actionTypes.SUCCESSALERT,
    GlobalAlert:{
        msg:`failed to change priority of  channel:${err.message}`,
        state:false,
        changeChannelPriorityNumber:generateUniqueNumber()
    }

  })

  })
   
}


export const useChangePriorityNumber=()=>{
  return useMutation(axiosChangePriorityNumber,{
      onSuccess:(newMessage)=>{
          socket.emit('change',{actionTypes:actionTypes.getUserChannel})
          socket.emit('change',{actionTypes:actionTypes.getChannelConversation})

         
       /*   queryClient.invalidateQueries('getPostById') */
      /*  queryClient.setQueryData(['getChannelConversation',channelId],(oldQueryData)=>{
              return {
                  ...oldQueryData,
                  data:[...oldQueryData,newMessage.data],
              }
          } ) */
      } 
  })
      
}





