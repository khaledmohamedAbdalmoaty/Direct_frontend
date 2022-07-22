import axios from 'axios' 
import {useQuery} from 'react-query'
const API_URL=process.env.REACT_APP_API_URL


async function axiosRequestGetConversation(ChannelId){
        try{
                const {data}=await axios.get(`${API_URL}/chat/get/conversationMsg?id=${ChannelId}`)
                return data
        }
        catch(err){
                return err.message
        }
  
      
}

const useGetChannelData=(ChannelId)=>{
        return useQuery(['getChannelConversation',ChannelId],()=>axiosRequestGetConversation(ChannelId),{
                enabled:!!ChannelId
        })
}

export default  useGetChannelData






