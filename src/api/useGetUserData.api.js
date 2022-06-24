import axios from 'axios' 
import {useQuery} from 'react-query'

const url=process.env.REACT_APP_API_URL


const axiosRequestGetUserData=async (userId)=>{
    const {data}=await axios.get(`${url}/users/${userId}`)
    return  data
}


const useGetUserData=(userId)=>{
        return useQuery(['getUserData',userId],()=> axiosRequestGetUserData(userId),{
                enabled:!!userId
        })
}

export default useGetUserData