/* -------------------------------------------------------------------------- */
/*                  import things related to react technology                 */
/* -------------------------------------------------------------------------- */
import React,{useRef,useState,useEffect} from 'react'
/* -------------------------------------------------------------------------- */
/*                  import things related to global variable                  */
/* -------------------------------------------------------------------------- */
import {useStateValue,actionTypes} from '../../../contexts'
import {Alert,GoBackComponent} from '../../../common'

/* -------------------------------------------------------------------------- */
/*            import things related to  react router dom version.6            */
/* -------------------------------------------------------------------------- */
import {useSearchParams} from 'react-router-dom'



/* -------------------------------------------------------------------------- */
/*                     import things related to api folder                    */
/* -------------------------------------------------------------------------- */
import  {useGetSearchChannels} from '../../../api'

/* -------------------------------------------------------------------------- */
/*                      import different custom component                     */
/* -------------------------------------------------------------------------- */
import {ShowSidebarChannelComponent} from '../sidebarPage'
import {ChatHeaderComponent2} from '../chatPage'
/* -------------------------------------------------------------------------- */
/*                     import form materila ui version 5                     */
/* -------------------------------------------------------------------------- */
import Box from '@mui/material/Box';

/* -------------------------------------------------------------------------- */
/*                     import things related to css files                     */
/* -------------------------------------------------------------------------- */
import '../chatPage/Chat.css'




function ShowSearchChannel() {
    const [searchParams,setSearchParams]=useSearchParams()
    const searchStatement=searchParams.get(`search`)
    const [{user,GlobalAlert},dispatch]=useStateValue()
    const userId=user.user_id
    const {data:searchResult,isLoading,isFetching,error,isError,refetch}=useGetSearchChannels(searchStatement)
  
  if(isLoading){
    return (
      <>
        <GoBackComponent/>
        <h2>Loading ....</h2>
      </>
  
    )
  } 
  if(isError || (searchResult.status&&searchResult.status===500)){
    return (
    <>
      <GoBackComponent/>
      <h1 style={{width:"50%",margin:'auto'}}>search is not exist </h1>
    </>
    )
  }
   
  
return (
     
<div className="chat">  
    {/* <ChatHeaderComponent2/> */}
    <GoBackComponent />
    <div className="chat__body">

        {
          searchResult[0]&&searchResult.map((channel,index)=>(
            <ShowSidebarChannelComponent  channel={channel} index={index+"klsjflkjasldfvn^"}/>
          ))
        }
    </div>

 
</div>
  
)

}

export default ShowSearchChannel