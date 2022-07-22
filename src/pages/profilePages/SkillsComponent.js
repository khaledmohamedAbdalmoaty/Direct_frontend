import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
/* -------------------------------------------------------------------------- */
/*                              custom component                              */
/* -------------------------------------------------------------------------- */
import AddSkill from './adjustProfile/AddSkill'
import {useGetUserSkills,useDeleteUserSkill} from '../../api'

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
import { useStateValue } from '../../contexts/StateProvider';



const ProfileSkillsComponent = ({userId:requiredUserId,state}) => {
  const {data:Skills,isLoading,isFetching,error,isError,refetch} =useGetUserSkills(requiredUserId)
  const {mutate}= useDeleteUserSkill()
  const [{user}]=useStateValue()
  const userId=user.user_id
  
  const handleDeleteSkill=(skillId)=>{
    mutate({userId,skillId})
  }
  if(isLoading){
    return <h1>Loading</h1>
  }
  return (
<React.Fragment>


    <Typography gutterBottom variant="h3" component="div">
            Skills 
            {state && <AddSkill/>}
    </Typography>

   
   
      {Skills.map((skill,index) => {     
        return (
          <List  key={'alsjdaovboau'+index} sx={{ width: '100%',p:"10px", maxWidth: 360, bgcolor: 'background.paper' }}>
          <ListItem
           
            secondaryAction={
              state&&(<IconButton edge="end" aria-label="comments" onClick={()=>handleDeleteSkill(skill._id)}>
              <DeleteIcon/>
            </IconButton>)
             
            }
            disablePadding
          >  
              <ListItemText  id={index}  primary={`${skill.skillName}`} />
          </ListItem>
        </List>
        );
      
      })}
      
  
</React.Fragment>
)
}

export default ProfileSkillsComponent