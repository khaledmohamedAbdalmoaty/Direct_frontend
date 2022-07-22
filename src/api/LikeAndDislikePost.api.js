import axios from 'axios' 
import {useMutation,useQueryClient, useQuery} from 'react-query'
import { useEditEducationCard } from './useUserProfileFunction.api';
const API_URL=process.env.REACT_APP_API_URL

import {actionTypes} from '../contexts'

/* -------------------------------------------------------------------------- */
/*                     import things related to socket.io                     */
/* -------------------------------------------------------------------------- */
import io from 'socket.io-client'
const sockit_io_URL=process.env.REACT_APP_SOCKIT_IO_URL
const socket=io.connect(sockit_io_URL)


/* -------------------------------------------------------------------------- */
/*                            like and dislike post                           */
/* -------------------------------------------------------------------------- */

const  axiosLikeDislikePost=async ({postId,userId})=>{
  
    try{
        const BodyData={
           userId
        }
     
        console.log(`postId:${postId}`)
        console.log(`userId frin dislike and like :${userId}`)
        const {data}=await axios.put(`${API_URL}/posts/${postId}/like`,BodyData)
        return data
    }
    catch(err){
        return err
    }
     
}


export const useLikeAndDisLikePost=()=>{
    const queryClient = useQueryClient()
    return useMutation(axiosLikeDislikePost,{
        onSuccess:(newMessage)=>{
            socket.emit('change',{actionTypes:actionTypes.getChannelConversation})
            socket.emit('change',{actionTypes:actionTypes.getMainPagePosts})
            socket.emit('change',{actionTypes:actionTypes.getPostById})
        } 
    })
        
}
