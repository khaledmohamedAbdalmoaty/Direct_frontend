import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Stack from '@mui/material/Stack';

/* -------------------------------------------------------------------------- */
/*                           import custom component                          */
/* -------------------------------------------------------------------------- */
import ChangeWorkTitle from './adjustProfile/ChangeWorkTitle'
import ChangeAbout from './adjustProfile/ChangeAbout'
import AddProfilePicture from './adjustProfile/AddProfilePicture'
import ChangeYourUserName from './adjustProfile/ChangeYourUserName'

/* -------------------------------------------------------------------------- */
/*                           import from api folder                           */
/* -------------------------------------------------------------------------- */


/* -------------------------------------------------------------------------- */
/*                        import from react router dom                        */
/* -------------------------------------------------------------------------- */

import {useParams} from 'react-router-dom'


/* -------------------------------------------------------------------------- */
/*                            the third card import                           */
/* -------------------------------------------------------------------------- */

import { styled } from '@mui/material/styles';
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

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));



/* -------------------------------------------------------------------------- */
/*                        import of   4th component skills list                         */
/* -------------------------------------------------------------------------- */
import CommentIcon from '@mui/icons-material/Comment';



const GeneralInfoComponent = ({state,userInfo,currentUserId}) => {
  
  return (
    <React.Fragment>
  <Card sx={{ maxWidth: 345 /* ,bgcolor:'#ced4da' */}}>
    <CardContent>
     {state && <ChangeYourUserName/>}
     {state && <ChangeWorkTitle  />} 
     {state && <AddProfilePicture />}
     <List sx={{ width: '100%', maxWidth: 360, }}>
       <ListItem alignItems="flex-start">
         <ListItemAvatar >
            <Avatar  alt="Remy Sharp"  imgProps={{crossOrigin:"anonymous" }}  src={userInfo.profilePicture} />
          </ListItemAvatar>
         <ListItemText
           primary={userInfo.username}
           secondary={
             <React.Fragment>
              {userInfo.workTitle}
             </React.Fragment>
           }
         />
       </ListItem>
     </List>
     </CardContent>
   </Card>


{/*   second card About card  */}

  <Card sx={{ maxWidth: 345 }}> 

<CardContent>
  <Typography gutterBottom variant="h5" component="div">
   {state && <ChangeAbout/>} 
    About
  </Typography>
  <Typography variant="body2" color="text.secondary">
    {userInfo.About}
  </Typography>
</CardContent>

 </Card>  
</React.Fragment>

)}

export default GeneralInfoComponent