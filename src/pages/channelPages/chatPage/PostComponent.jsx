import React,{useState,useEffect} from 'react'
import MailIcon from '@mui/icons-material/Mail';
import RecommendIcon from '@mui/icons-material/Recommend';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import AddCommentIcon from '@mui/icons-material/AddComment';
import {Button} from '@mui/material'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Tooltip} from '@mui/material' 
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useNavigate} from 'react-router-dom';

import {ReturnDate,ShowListComponent} from '../../../common'
import { actionTypes } from '../../../contexts';
/* -------------------------------------------------------------------------- */
/*                               import from api                              */
/* -------------------------------------------------------------------------- */

import {useLikeAndDisLikePost} from '../../../api'


const PostComponent = ({post,userInfo,singlePost,isSubScribe,msg}) => {
  if(!post){
    return<h1 style={{margin:'auto'}}>Post is not exist </h1>
  }
  const [likeIcon,setLikeIcon]=useState(post&&post.likes.includes(userInfo._id))
  const currentUserId=JSON.parse(localStorage.getItem('currentUserInfo')).user_id

  const {mutate:likeAndDislikePostRequest}=useLikeAndDisLikePost()



  const handleAddLikeOrDisLike=()=>{
    setLikeIcon(!likeIcon)
    const postId=post._id
    const userId=userInfo._id 
    likeAndDislikePostRequest({postId,userId})
  }
  const nav=useNavigate()
  const handleShowComments=()=>{
    nav(`/channel/singlePost/${post._id}`)
  }



  const handleShowProfile=()=>{
    nav(`/profile/${userInfo._id}`)
  }


  return (
   <>
    <Card  sx={{margin:"20px"}}>
      <CardHeader
       
        avatar={
          <Tooltip title={'Show profile'} >
          <IconButton aria-label="settings" onClick={handleShowProfile}>
          <Avatar sx={{ bgcolor: "red" }} imgProps={{crossOrigin:"anonymous" }} aria-label="recipe" src={userInfo.profilePicture}/>
          </IconButton>
          </Tooltip>
        }
        action={
          <IconButton aria-label="settings">
            <ShowListComponent  msg={msg&&msg} options={[actionTypes.DELETEPOST,actionTypes.BLOCKUSER,actionTypes.UNBLOCKUSER,actionTypes.SEND_MAIL]} userInfo={userInfo} post={post}/>
          </IconButton>
        }
        title={userInfo.username}
        subheader={post.timestamp && ReturnDate(post.timestamp)  }
      />

      <CardMedia
        height="20%"
        component="img"
        image={post.imageLocation}
        crossOrigin="anonymous" 
        alt=""
      />
      <CardContent>
        <Typography variant="body2" sx={{fontSize:"20px"}} color="text.secondary">
         {post.desc}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {/* like and dislike in frontend  */}
       
        <IconButton aria-label="add to favorites" onClick={handleAddLikeOrDisLike} >
        <Badge badgeContent={post&&post.likesCounter}
         anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        color="primary">
          {likeIcon? ( <ThumbUpIcon sx={{color:'#1760a5'}}/> ):( <ThumbUpIcon /> )}       
         </Badge>
        </IconButton>
       {!singlePost&&((currentUserId==userInfo._id)||(!isSubScribe?isSubScribe:true))&&<Button color="secondary" onClick={handleShowComments}  startIcon={<AddCommentIcon/>}>Add comment </Button> } 
      </CardActions>

    </Card>
    </>
  )
}

export default PostComponent