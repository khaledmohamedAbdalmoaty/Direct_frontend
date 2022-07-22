import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Stack from '@mui/material/Stack';
import PostAddTwoToneIcon from '@mui/icons-material/PostAddTwoTone';
import DeleteIcon from '@mui/icons-material/Delete';
import SchoolIcon from '@mui/icons-material/School';

/* -------------------------------------------------------------------------- */
/*                           import from api folder                           */
/* -------------------------------------------------------------------------- */
import {useGetUserEducation,useDeleteUserEducationCard} from '../../api'
import {useStateValue} from '../../contexts'
/* -------------------------------------------------------------------------- */
/*                           import custom component                          */
/* -------------------------------------------------------------------------- */
import AddEducationCard from './adjustProfile/AddEducationCard'
import EditEducationCard from './adjustProfile/EditEducationCard'

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


const ProfileEducationComponent = ({state,userId:requestedUserId}) => {
  const {data:Educations,isLoading,isFetching,error,isError,refetch}=useGetUserEducation(requestedUserId)
  const {mutate}= useDeleteUserEducationCard()
  const [{user}]=useStateValue()
  const userId=user.user_id
  const handleDelete=(id)=>{
    const educationCardId=id
    mutate({userId,educationCardId})  
  }
  /*  third card things */
 const [expanded, setExpanded] = React.useState(false);
 const handleExpandClick = () => {
   setExpanded(!expanded);
 };

 if(isLoading){
  return <h1>Loading...</h1>
}

  return (
    <React.Fragment>
    <Typography gutterBottom variant="h3" component="div">
    Education
    {state&&<AddEducationCard/>}
     </Typography>
        {Educations.map((school,index)=>(
           <Card key={Date.now()+index} sx={{ maxWidth: 345 ,m:"20px"}}>
            {state&&<EditEducationCard schoolId={school._id} schoolName={school.schoolName} schoolStartTime={school.schoolStartTime}
            schoolEndTime={school.schoolEndTime} schoolDesc={school.schoolDesc} />}
           <CardHeader
           avatar={
           <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
         
          <SchoolIcon/>
           </Avatar>
           }
           action={
             state &&(<IconButton aria-label="settings" onClick={()=>handleDelete(school._id)}>
             <DeleteIcon/>
           </IconButton>)
           
         
           }

           title={school.schoolName}
           subheader={`from ${school.schoolStartTime} to ${school.schoolEndTime}`}
           />
           <CardContent>
           <Typography variant="body2" color="text.secondary">
         {school.schoolDesc}
           </Typography>
           </CardContent>
       </Card>

        ))}{/* end of map */}
       

      </React.Fragment>
 


)}

export default ProfileEducationComponent


