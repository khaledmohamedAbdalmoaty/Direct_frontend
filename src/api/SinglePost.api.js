import axios from 'axios' 
import {useMutation,useQueryClient, useQuery} from 'react-query'
const API_URL=process.env.REACT_APP_API_URL


/* -------------------------------------------------------------------------- */
/*                             get post by it' id                             */
/* -------------------------------------------------------------------------- */
async function axiosGetPost(postId){
    const {data}=await axios.get(`${API_URL}/posts/${postId}`)

    return data
    
}

export const useGetPostById=(postId)=>{
      return useQuery(['getPostById',postId],()=>axiosGetPost(postId),{
              enabled:!!postId
      })
}


/* -------------------------------------------------------------------------- */
/*                          get  post comments                          */
/* -------------------------------------------------------------------------- */

async function axiosGetPostComments(postId){
    const {data}=await axios.get(`${API_URL}/posts/getComments/${postId}`)
    return data
    
}

export const useGetPostComments=(postId)=>{
      return useQuery(['getPostComments',postId],()=>axiosGetPostComments(postId),{
              enabled:!!postId
      })
}



/* -------------------------------------------------------------------------- */
/*                       use add comment to single post                       */
/* -------------------------------------------------------------------------- */
const  axiosAddComment=async ({channelId,postId,message,userId})=>{
    const newComment={
      postId,
      message,
      channelId,
      whoSendMsg:userId
    }
    console.log(`from sending an new commen on post => ${newComment}`)
       await axios.post(`${API_URL}/posts/addComment`,newComment)
     
}


export const useAddCommentToPost=(channelId)=>{
    const queryClient = useQueryClient()
    return useMutation(axiosAddComment,{
        onSuccess:(newMessage)=>{
           queryClient.invalidateQueries('getPostComments') 
        /*  queryClient.setQueryData(['getChannelConversation',channelId],(oldQueryData)=>{
                return {
                    ...oldQueryData,
                    data:[...oldQueryData,newMessage.data],
                }
            } ) */
        } 
    })
        
}
