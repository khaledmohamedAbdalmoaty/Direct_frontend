import React from 'react'


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

import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useNavigate} from 'react-router-dom';

const ChatShowUploadedImageComponent = ({post}) => {
  const nav=useNavigate()
  const handleShowComments=()=>{
    nav(`/channel/singlePost/${post._id}`)
  }

  return (
   
    <Card  sx={{margin:"20px"}}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe" src={post.postImageUrl}>
            post
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="person who send post"
        subheader="September 14, 2016"
      />

      <CardMedia
        component="img"
        height="20%"
        image={post.postImageUrl}
        alt="Image "
      />

      <CardContent>
        <Typography variant="body2" sx={{fontSize:"20px"}} color="text.secondary">
         {post.postDescription}
        </Typography>
      </CardContent>

    </Card>
  )
}

export default ChatShowUploadedImageComponent