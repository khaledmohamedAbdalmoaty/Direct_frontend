import axios from 'axios' 
import {useMutation,useQueryClient} from 'react-query'

const API_URL=process.env.REACT_APP_API_URL
const IMG_URL=process.env.REACT_APP_IMG_URL

/* -------------------------------------------------------------------------- */
/*                     import things related to socket.io                     */
/* -------------------------------------------------------------------------- */
import io from 'socket.io-client'
const sockit_io_URL=process.env.REACT_APP_SOCKIT_IO_URL
const socket=io.connect(sockit_io_URL)
import {actionTypes} from '../contexts'


/* -------------------------------------------------------------------------- */
/*                               axios requests                               */
/* -------------------------------------------------------------------------- */

const  axiosAddPost=async ({channelId,userId,imageName,imageCaption})=>{

    try{
        const post={
            userId,
            channelId,
            desc:imageCaption,
            imageLocation:`${IMG_URL}/${imageName}`
        }
        const {data}=await axios.post(`${API_URL}/posts/createPost`,post)
        console.log(`from axios Add post the id is => ${data._id}`)
        const postMsg={
            channelId,
            post:data._id,
            postEnable:true,
            whoSendMsg:userId
        }
        console.log(`from axios resques the shape of postMsg ${postMsg}`)
        return await axios.post(`${API_URL}/chat/new/conversationMsg?id=${channelId}`,postMsg)
    }
    catch(err){
        return err
    }
        
}


/* ---------------------- use upload conversaton image ---------------------- */
export function useUploadPost(){
  const queryClient = useQueryClient()

  return useMutation(axiosAddPost,{
      onSuccess:(newMessage)=>{
           socket.emit('change',{actionTypes:actionTypes.getChannelConversation})
    
      } 
  })
      
}





