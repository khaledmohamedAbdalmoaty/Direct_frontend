import React ,{useRef,useMemo,useEffect,useLayoutEffect} from 'react'

/* -------------------------------------------------------------------------- */
/*                          import custom components                          */
/* -------------------------------------------------------------------------- */
import ChatMessageComponent  from './ChatMessageComponent'
import {GoBackComponent} from '../../../common'
import PostComponent from './PostComponent'
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


const SingleShowSinglePost = () => {
 
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
      console.log(`from single post component:>userId who send message is :>${userId}`)
      mutate({channelId,postId,message,userId})  
      inputRef.current.value=""
    }
   
    if(isLoading){
      return <h2>Loading ....</h2>
    }
    if(isError || getCommenterror || error){
      return (
      <>
        <GoBackComponent/> 
       <h1>{error.message}</h1>
      </>
      )
    }

  return (
    <div className="chat">
        <GoBackComponent /> 
        <div className="chat__body" >
          <PostComponent post={post} userInfo={post.userId} singlePost={true}/>

        {
            comments && comments.map((msg,index)=>(<ChatMessageComponent key={Date.now()+index} msg={msg} index={index} />)) 
        }
       
        </div>
       {/*  footer */}
       {post&&( <div className="chat__footer">
            <form onSubmit={e=>{
            e.preventDefault()
            handleAddComment()
            }}>
              <input  ref={inputRef} placeholder='Add comment' type="text"/>
              <button   type="submit" />
            </form>
        </div>)}
    </div>
  )
}

export default SingleShowSinglePost