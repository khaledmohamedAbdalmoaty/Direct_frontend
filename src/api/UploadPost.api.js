import axios from 'axios' 
import {useMutation,useQueryClient} from 'react-query'

const API_URL=process.env.REACT_APP_API_URL
const IMG_URL=process.env.REACT_APP_IMG_URL



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
           queryClient.invalidateQueries('getChannelConversation') 
      /*  queryClient.setQueryData(['getChannelConversation',channelId],(oldQueryData)=>{
              return {
                  ...oldQueryData,
                  data:[...oldQueryData,newMessage.data],
              }
          } ) */
      } 
  })
      
}





