import axios from 'axios' 
import {useQuery} from 'react-query'
const API_URL=process.env.REACT_APP_API_URL


async function axiosRequestGetChannel(userId){
      const {data}=await axios.get(`${API_URL}/channel/get/channelList/${userId}`)
      return data
      
}

const useGetUserChannel=(userId)=>{
        return useQuery(['getUserChannel',userId],()=>axiosRequestGetChannel(userId),{
                enabled:!!userId
        })
}

export default useGetUserChannel