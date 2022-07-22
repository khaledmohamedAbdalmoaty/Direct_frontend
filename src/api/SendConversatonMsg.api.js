import axios from 'axios' 
import {useMutation,useQueryClient} from 'react-query'
const API_URL=process.env.REACT_APP_API_URL

/* -------------------------------------------------------------------------- */
/*                     import things related to socket.io                     */
/* -------------------------------------------------------------------------- */
import io from 'socket.io-client'
const sockit_io_URL=process.env.REACT_APP_SOCKIT_IO_URL
const socket=io.connect(sockit_io_URL)
import {actionTypes} from '../contexts'



const  axiosAddConversationMsg=async ({channelId,message,userId})=>{
      const newConversationMsg={
        message:message,
        whoSendMsg:userId,
        channelId
        }
      return await axios.post(`${API_URL}/chat/new/conversationMsg?id=${channelId}`,newConversationMsg)
          
}


const useAddNewConversationMsg=(channelId)=>{
    const queryClient = useQueryClient()
    return useMutation(axiosAddConversationMsg,{
        onSuccess:(newMessage)=>{
            socket.emit('change',{actionTypes:actionTypes.getChannelConversation})

        /*  queryClient.setQueryData(['getChannelConversation',channelId],(oldQueryData)=>{
                return {
                    ...oldQueryData,
                    data:[...oldQueryData,newMessage.data],
                }
            } ) */
        } 
    })
        
}

export default  useAddNewConversationMsg
