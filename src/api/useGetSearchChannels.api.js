import axios from 'axios' 
import {useQuery} from 'react-query'
const API_URL=process.env.REACT_APP_API_URL


async function axiosGetSearchChannel(search){
        try{
                
                const {data}=await axios.get(`${API_URL}/channel/search/channel?search=${search}`)
                console.log(`returned data from axios:${data}`)
                return data
        }
        catch(err){
                return {status:500,err:err.message}
        }
  
      
}

const useGetSearchChannels=(search)=>{
        return useQuery(['getSearchChannels',search],()=>axiosGetSearchChannel(search),{
                enabled:!!search
        })
}

export default  useGetSearchChannels








