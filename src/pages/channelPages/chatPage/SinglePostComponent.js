import React ,{useRef,useMemo,useEffect,useLayoutEffect} from 'react'

/* -------------------------------------------------------------------------- */
/*                          import custom components                          */
/* -------------------------------------------------------------------------- */
import PostComponent from './PostComponent';
import  SinglePostHeaderComponent from './SinglePostHeaderComponent'
import ChatMessageComponent  from './ChatMessageComponent'
/* -------------------------------------------------------------------------- */
/*                             import from context                            */
/* -------------------------------------------------------------------------- */

import {useStateValue} from '../../../contexts'

/* -------------------------------------------------------------------------- */
/*                           import from api folder                           */
/* -------------------------------------------------------------------------- */
import  {useGetPostComments,useAddCommentToPost,useGetPostById} from '../../../api'
/* -------------------------------------------------------------------------- */
/*                        import from react router dom                        */
/* -------------------------------------------------------------------------- */
import { useParams } from 'react-router-dom';


const SinglePostComponent = () => {
 
    const {postId}=useParams()
    const inputRef=useRef()
    const [{ user }, dispatch] = useStateValue();
    const MsgUserId=user.user_id 

    
    const {data:comments,isLoading:getCommentLoading,isFetching:getCommentisFetching,error:getCommenterror,isError:getCommentisError,refetch:getCommentrefetch}=useGetPostComments(postId)
    const {data:post,isLoading,isFetching,error,isError,refetch}= useGetPostById(postId)
    const {mutate,isLoading:getMsgLoading,isError:getMsgisError,error:getMsgError}=useAddCommentToPost()

    
   

    const handleAddComment=()=>{
      const channelId=post.channelId._id 
      const postId=post._id 
      const message=inputRef.current.value
      const userId=MsgUserId
      mutate({channelId,postId,message,userId})  
      inputRef.current.value=""
    }


    const showPostHeader=useMemo((p)=>{
      /*   <SinglePostHeaderComponent userId={post.userId._id} channelId={post.channelId._id} channelName={post.channelId.channelName} channelImageLocation={post.channelId.channelImageLocation}/>*/  
/*       <SinglePostHeaderComponent userId={p.userId._id} channelId={p.channelId._id} channelName={p.channelId.channelName} channelImageLocation={p.channelId.channelImageLocation}/>
 */      
      }) 

     /*  const showPostComponent=useMemo(()=>{
        <PostComponent post={post} userInfo={post.userId}/> 
     
    }) */
  
      
   
       
    
    if(isLoading){
      return <h2>Loading ....</h2>
    }
    if(isError){
      return (
      <>
       <SinglePostHeaderComponent userId={post.userId._id} channelId={post.channelId._id} channelName={post.channelId.channelName} channelImageLocation={post.channelId.channelImageLocation}/>
       <h1>{error.message}</h1>
      </>
      )
    }


 





  return (
    <div className="chat">
     
       
        <div className="chat__body" >
          <PostComponent post={post} userInfo={post.userId}/> 

        {
            comments && comments.map((msg,index)=>(<ChatMessageComponent key={Date.now()+index} msg={msg} index={index} />)) 
        }
       
        </div>
       
 

       {/*  footer */}
        <div className="chat__footer">
            <form>
              <input  ref={inputRef} placeholder='Add comment' type="text"/>
              <button  onClick={handleAddComment} type="submit">send Message</button>
            </form>
        </div>
    </div>
  )
}

export default SinglePostComponent