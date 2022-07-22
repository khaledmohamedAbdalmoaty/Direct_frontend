import axios from 'axios'
 
import {useMutation,useQueryClient} from 'react-query'

const API_URL=process.env.REACT_APP_API_URL
const IMG_URL=process.env.REACT_APP_IMG_URL

const UploadImageToMulter=async (file)=>{
    if(file){
        const data=new FormData()
        data.append('image',file)
        const result=await axios.post(`${API_URL}/upLoadFile/single`,data)
/*         console.log(`result upload Image submit 1  ${JSON.stringify(result.data)}`)
 */        return result.data
    }    
}

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

const  axiosAddUploadImageMsg=async ({channelId,userId,imageName,imageCaption})=>{
    const newConversationMsg={
        channelId,
        uploadedImageEnable:true,
        uploadedImage:{ imageLocaton:IMG_URL+`/${imageName}`,imageCaption},
        whoSendMsg:userId,
      }
      console.log(`result upload Image submit 2 => ${newConversationMsg.uploadedImage.imageLocaton}`)
    return await axios.post(`${API_URL}/chat/new/conversationMsg?id=${channelId}`,newConversationMsg)
        
}


/* ---------------------- use upload conversaton image ---------------------- */
export function  useUpLoadConversationImage(){
  const queryClient = useQueryClient()

  return useMutation(axiosAddUploadImageMsg,{
      onSuccess:(newMessage)=>{
           socket.emit('change',{actionTypes:actionTypes.getChannelConversation})

      /*  queryClient.setQueryData(['getChannelConversation',channelId],(oldQueryData)=>{
              return {
                  ...oldQueryData,
                  data:[...oldQueryData,newMessage.data],
              }
          } ) */
      } 
  })
      
}

/* ----------------------------- use upload post ---------------------------- */

export default UploadImageToMulter