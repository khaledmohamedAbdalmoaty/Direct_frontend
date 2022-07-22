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

import {ReturnDate} from '../../../common/ReturnDate'


const ShowSingleEmailComponent = ({email,userInfo}) => {
 
  return (
   <>
    <Card  sx={{margin:"20px"}}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe" imgProps={{crossOrigin:"anonymous" }} src={userInfo.profilePicture}/>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={userInfo.username}
        subheader={email.timestamp && ReturnDate(email.timestamp)  }
      />

      <CardMedia
        component="img"
        height="20%"
        image={email.imageLocation&&email.imageLocation}
        crossOrigin="anonymous" 
        alt=" "
      />

      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
          {email.headerTitle}
        </Typography>
        <Typography variant="body2" sx={{fontSize:"20px"}} color="text.secondary">
         {email.emailBody}
        </Typography>
      </CardContent>

    </Card>
    </>
  )
}

export default ShowSingleEmailComponent