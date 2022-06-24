import axios from 'axios' 
import {useMutation,useQueryClient} from 'react-query'
const API_URL=process.env.REACT_APP_API_URL
const  axiosAddConversationMsg=async ({channelId,message,userId})=>{
      const newConversationMsg={
        message:message,
        whoSendMsg:userId,
        channelId
        }
        console.log(`who sendMsg from msg.api ${newConversationMsg.whoSendMsg}`)
      return await axios.post(`${API_URL}/chat/new/conversationMsg?id=${channelId}`,newConversationMsg)
          
}


const useAddNewConversationMsg=(channelId)=>{
    const queryClient = useQueryClient()
    return useMutation(axiosAddConversationMsg,{
        onSuccess:(newMessage)=>{
            queryClient.invalidateQueries('getChannelConversation')
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
