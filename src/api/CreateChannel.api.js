import axios from 'axios'
import {actionTypes} from '../contexts'
const API_URL=process.env.REACT_APP_API_URL
import { v4 as generateUniqueNumber } from 'uuid';
import {useMutation,useQueryClient} from 'react-query'

/* -------------------------------------------------------------------------- */
/*                     import things related to socket.io                     */
/* -------------------------------------------------------------------------- */
import io from 'socket.io-client'
const sockit_io_URL=process.env.REACT_APP_SOCKIT_IO_URL
const socket=io.connect(sockit_io_URL)


/* -------------------------------------------------------------------------- */
/*                               create channel                               */
/* -------------------------------------------------------------------------- */
const  axiosCreateChannel=async ({channelOwner,channelName,priority,postOnly,nav,subScribersCanMakePost,dispatch,setLoading})=>{  
        const BodyData={ 
            channelName,
            channelOwner,
            priority,
            postOnly,
            subScribersCanMakePost
        }
        axios.post(`${API_URL}/channel/new/channel`,BodyData)
        .then((res)=>{   
            dispatch({
                type:actionTypes.SUCCESSALERT,
                GlobalAlert:{
                    msg:"success create an channel",
                    state:true,
                    createChannelComponent:generateUniqueNumber()
                }

            })
           /*  setLoading(false) */
         
         })
         .catch((err)=>{
            dispatch({
                type:actionTypes.SUCCESSALERT,
                GlobalAlert:{
                    msg:"failed create an channel",
                    state:false,
                    createChannelComponent:generateUniqueNumber()
                }

            })
         })
    
     
}


export const useCreateChannel=()=>{
    const queryClient = useQueryClient()
    return useMutation(axiosCreateChannel,{
        onSuccess:(newMessage)=>{
            socket.emit('change',{actionTypes:actionTypes.getUserChannel})

           /*  queryClient.invalidateQueries('getChannelConversation') */
        } 
    })
        
}