import React from 'react'
import {Box } from '@mui/material'
/* -------------------------------------------------------------------------- */
/*                            import post component                           */
/* -------------------------------------------------------------------------- */
import PostComponent from '../channelPages/chatPage/PostComponent'

/* -------------------------------------------------------------------------- */
/*                     import things related to api folder                    */
/* -------------------------------------------------------------------------- */

import {useGetMainPagePosts} from "../../api"

/* -------------------------------------------------------------------------- */
/*                         import things from context                         */
/* -------------------------------------------------------------------------- */

import {initialState, actionTypes,useStateValue} from "../../contexts"



const Feed = () => {
  const [{user},dispatch]=useStateValue()
  const userId=JSON.parse(localStorage.getItem('currentUserInfo')).user_id
  if(!userId)return (<h1>username is not exist</h1> )
 const {data:conversation,isLoading,isFetching,error,isError,refetch}=useGetMainPagePosts(userId)
 
   
  if(isLoading){
    return <h2>Loading ....</h2>
  }
  if(isError){
    return (
    <>
    <h1>Error</h1>
    </>
    )
  }

  return (
  <Box flex={3} p={2}>
  {
     
     conversation.map((post,index)=>(
      (<PostComponent key={"skjivn@!nca*"+index} post={post} userInfo={post.userId}/>) 
    
    ))
    
  } 

  </Box>

)}

export default Feed