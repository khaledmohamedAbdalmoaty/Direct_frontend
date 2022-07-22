import React from 'react'


import AddCommentIcon from '@mui/icons-material/AddComment';
import {Button} from '@mui/material'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';


import { useNavigate} from 'react-router-dom';

import {ReturnDate,ShowListComponent} from '../../../common'
import {useStateValue,actionTypes} from '../../../contexts'


const EmailComponent = ({email,userInfo,isSingleEmail=false}) => {
  const nav=useNavigate()
  const handleShowReply=()=>{
    nav(`/channel/singleEmail/${email._id}`)
  }

  const handleShowProfile=()=>{
    nav(`/profile/${userInfo._id}`)
  }



  return (
   <>
    <Card  sx={{margin:"20px"}}>
      <CardHeader
        avatar={
          <IconButton aria-label="settings" onClick={handleShowProfile}>
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe" imgProps={{crossOrigin:"anonymous" }} src={userInfo.profilePicture&&userInfo.profilePicture}/>
          </IconButton>
        }
       /*  action={
      
        } */
        title={userInfo.username}
        subheader={email.timestamp && ReturnDate(email.timestamp)  }
      />
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
          {email.headerTitle}
        </Typography>
        <Typography variant="body2" sx={{fontSize:"20px"}} color="text.secondary">
         {email.emailBody}
        </Typography>
      </CardContent>
{
  !isSingleEmail&&(  <CardActions disableSpacing>       
    <Button color="secondary" onClick={handleShowReply}  startIcon={<AddCommentIcon/>}>Reply</Button> 
  </CardActions>)
}
    

    </Card>
    </>
  )
}

export default EmailComponent