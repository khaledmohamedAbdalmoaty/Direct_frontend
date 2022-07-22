import axios from 'axios' 
import {useQuery} from 'react-query'
const API_URL=process.env.REACT_APP_API_URL


/* -------------------------------------------------------------------------- */
/*                             get mainPage posts                             */
/* -------------------------------------------------------------------------- */
async function axiosGetMainPagePosts(userId){
    const {data}=await axios.get(`${API_URL}/posts/mainPage/posts?id=${userId}`)
    console.log(`from axios getmain page post => ${data[0]}`)
    return data
    
}

export const useGetMainPagePosts=(userId)=>{
      return useQuery(['getMainPagePosts',userId],()=> axiosGetMainPagePosts(userId),{
              enabled:!!userId
      })
}
