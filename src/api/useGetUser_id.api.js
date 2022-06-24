import axios from 'axios' 
import {useQuery} from 'react-query'
const API_URL=process.env.REACT_APP_API_URL

async function axiosRequestToGetUser_id(uid){
      const {_id}=await axios.get(`${API_URL}/users/id_/${uid}`)
      return _id
      
}

const useGetUser_id=(uid)=>{
        return useQuery(['getChannelConversation',uid],()=>axiosRequestGetConversation(uid),{
                enabled:!!ChannelId
        })
}

export default  useGetUser_id








