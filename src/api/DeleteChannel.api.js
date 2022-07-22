import axios from 'axios' 
import {useMutation,useQueryClient, useQuery} from 'react-query'
const API_URL=process.env.REACT_APP_API_URL
import {useNavigate} from 'react-router-dom'

/* -------------------------------------------------------------------------- */
/*                     import things related to socket.io                     */
/* -------------------------------------------------------------------------- */
import io from 'socket.io-client'
const sockit_io_URL=process.env.REACT_APP_SOCKIT_IO_URL
const socket=io.connect(sockit_io_URL)
import {actionTypes} from '../contexts'



/* -------------------------------------------------------------------------- */
/*                                 Delete channel                              */
/* -------------------------------------------------------------------------- */
const  axiosDeleteChannel=async ({channelId})=>{
    try{
        const userId=JSON.parse(localStorage.getItem('currentUserInfo')).user_id
        const bodyData={
            userId,
            channelId
        }
        const {data}=await axios.delete(`${API_URL}/channel/delete/channel`,{data:bodyData})
        return data
    }
    catch(err){
        return err.message
    }
     
}


export const useDeleteChannel=()=>{
const queryClient = useQueryClient()
    const nav=useNavigate()
    return useMutation(axiosDeleteChannel,{
        onSuccess:(newMessage)=>{
        socket.emit('change',{actionTypes:actionTypes.getChannelConversation})
        socket.emit('change',{actionTypes:actionTypes.getMainPagePosts})
        socket.emit('change',{actionTypes:actionTypes.getUserChannel})
           nav(`/channel`)
 

        /*  queryClient.setQueryData(['getChannelConversation',channelId],(oldQueryData)=>{
                return {
                    ...oldQueryData,
                    data:[...oldQueryData,newMessage.data],
                }
            } ) */
        } 
    })
        
}
