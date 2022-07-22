import axios from 'axios' 
import {useMutation,useQueryClient, useQuery} from 'react-query'
const API_URL=process.env.REACT_APP_API_URL

import { v4 as generateUniqueNumber } from 'uuid';
import {actionTypes} from '../contexts'

/* -------------------------------------------------------------------------- */
/*                     import things related to socket.io                     */
/* -------------------------------------------------------------------------- */
import io from 'socket.io-client'
const sockit_io_URL=process.env.REACT_APP_SOCKIT_IO_URL
const socket=io.connect(sockit_io_URL)


/* -------------------------------------------------------------------------- */
/*                                 Delete post                                */
/* -------------------------------------------------------------------------- */
const  axiosDeletePost=async ({postOwner,postId,channelOwnerId,dispatch,msgId})=>{
    try{
        const deletePostData={
            postOwner,
            channelOwnerId,
            msgId
        }
/*         console.log(`from delete post function  => ${deletePostData.postOwner}`)
 */
        const {data}=await axios.delete(`${API_URL}/posts/${postId}`,{data:deletePostData})

        dispatch({
            type:actionTypes.SUCCESSALERT,
            GlobalAlert:{
                msg:"success Delete post",
                state:true,
                chatState:generateUniqueNumber()
            }

        })
       
        return data
    }
    catch(err){
        dispatch({
            type:actionTypes.FAILEDALERT,
            GlobalAlert:{
                msg:`failed to DeletePost : ${err.message}`,
                state:false,
                chatState:generateUniqueNumber()
            }
        })
        return err
    }
     
}


export const useDeletePost=()=>{
    return useMutation(axiosDeletePost,{
        onSuccess:(newMessage)=>{
        socket.emit('change',{actionTypes:actionTypes.getChannelConversation})
        socket.emit('change',{actionTypes:actionTypes.getMainPagePosts})
        socket.emit('change',{actionTypes:actionTypes.getPostById})
        } 
    })        
}
