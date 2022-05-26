import axios from 'axios' 
import {useMutation,useQueryClient} from 'react-query'

const API_URL=process.env.REACT_APP_API_URL
const IMG_URL=process.env.REACT_APP_IMG_URL

const UploadImageToMulter=async (file)=>{
    if(file){
        const data=new FormData()
        const fileName=Date.now()+file.name
        data.append('image',file)
        data.append('name',fileName)
        const result=await axios.post(`${API_URL}/upLoadFile/single`,data)
/*         console.log(`result upload Image submit 1  ${JSON.stringify(result.data)}`)
 */        return result.data
    }    
}



const  axiosAddConversationMsg=async ({channelId,userId,imageLocaton,imageCaption})=>{
    const newConversationMsg={
        ImageEnable:true,
        uploadedImage:{ imageLocaton:IMG_URL+imageLocaton,imageCaption},
        whoSendMsg:userId,
      }
      console.log(`result upload Image submit 2 => ${newConversationMsg.uploadedImage.imageLocaton}`)
    return await axios.post(`${API_URL}/chat/new/conversationMsg?id=${channelId}`,newConversationMsg)
        
}


export function  useUpLoadConversationImage(){
  const queryClient = useQueryClient()

  return useMutation(axiosAddConversationMsg,{
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







export default UploadImageToMulter



