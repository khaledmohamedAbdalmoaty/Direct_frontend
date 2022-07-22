import axios from 'axios' 
import {useMutation,useQueryClient, useQuery} from 'react-query'
const API_URL=process.env.REACT_APP_API_URL


/* -------------------------------------------------------------------------- */
/*                     import things related to socket.io                     */
/* -------------------------------------------------------------------------- */
import io from 'socket.io-client'
const sockit_io_URL=process.env.REACT_APP_SOCKIT_IO_URL
const socket=io.connect(sockit_io_URL)
import {actionTypes} from '../contexts'



/* -------------------------------------------------------------------------- */
/*                                 update post                                */
/* -------------------------------------------------------------------------- */
const  axiosUpdatePost=async ({postOwnerId,postId})=>{
    try{
        const bodyData={
           userId:postOwnerId
        }
        const {data}=await axios.delete(`${API_URL}/posts/${postId}`,{data:bodyData})
        return data
    }
    catch(err){
        return err
    }
     
}


export const useUpdatePost=()=>{
    const queryClient = useQueryClient()
    return useMutation(axiosUpdatePost,{
        onSuccess:(newMessage)=>{
        socket.emit('change',{actionTypes:actionTypes.getChannelConversation})
        socket.emit('change',{actionTypes:actionTypes.getMainPagePosts})

        /*  queryClient.setQueryData(['getChannelConversation',channelId],(oldQueryData)=>{
                return {
                    ...oldQueryData,
                    data:[...oldQueryData,newMessage.data],
                }
            } ) */
        } 
    })
        
}
