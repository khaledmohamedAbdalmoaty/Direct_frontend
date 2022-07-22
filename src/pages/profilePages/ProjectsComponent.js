import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import LinkIcon from '@mui/icons-material/Link';
import Tooltip from '@mui/material/Tooltip';
import Link from '@mui/material/Link';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import Alert from '@mui/material/Alert';
/* -------------------------------------------------------------------------- */
/*                           import from api folder                           */
/* -------------------------------------------------------------------------- */
import {useGetUserProject,useDeleteUserProjectCard} from '../../api'
import {useStateValue} from '../../contexts'
/* -------------------------------------------------------------------------- */
/*                           import custom component                          */
/* -------------------------------------------------------------------------- */
import AddProjectCard from './adjustProfile/AddProjectCard'
import EditProjectCard from './adjustProfile/EditProjectCard'
import ShowAlertMessage from './ShowAlertMessage'
/* -------------------------------------------------------------------------- */
/*                            the third card import                           */
/* -------------------------------------------------------------------------- */

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';

import './ProjectComponentcss.css'



/* -------------------------------------------------------------------------- */
/*                        import of   4th component skills list               */
/* -------------------------------------------------------------------------- */
const ProjectComponent = ({state,requiredUserId}) => {
  const {data:Projects,isLoading,isFetching,error,isError,refetch}=useGetUserProject(requiredUserId)
  /* const [{Alert,user},dispatch]=useStateValue() */
  const {mutate}= useDeleteUserProjectCard()
  const [{user}]=useStateValue()
  const handleDelete=(projectId)=>{
    const userId=user.user_id
    mutate({userId,projectId})  
  }

 if(isLoading){
  return <h1>Loading...</h1>
}

  return (
    <div className="ProjectCard">
    <Typography gutterBottom variant="h3" component="div">
    Projects
    {state&&<AddProjectCard/>}
     </Typography>

        {Projects.map((project,index)=>(
           <Card key={'akk^dvfdjalksjd'+index} sx={{ maxWidth:345 }}>
            {state&&<EditProjectCard 
             projectName={project.projectName}
              projectStartTime={project.projectStartTime}

              
              projectEndTime={project.projectEndTime}
              projectDesc={project.projectDesc}
              link={project.link}
              projectId={project._id}/>}
           <CardHeader
          avatar={
           <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
          
           <LibraryBooksIcon/>
           </Avatar>
           } 
           action={
             state &&  (<IconButton aria-label="settings" onClick={()=>handleDelete(project._id)}>
             <DeleteIcon/>
           </IconButton>)
           
         
           }

           title={project.projectName}
           subheader={`from ${project.projectStartTime} to ${project.projectEndTime}`}
           />
           <CardContent>
           <Typography variant="body2" color="text.secondary">
         {project.projectDesc}
           </Typography>
           {(project.link!=='null')&&(
            <Tooltip title="show project">
             {/* <IconButton color="primary"  onClick={()=>handleGoToLink(project.link)} aria-label="link">
              <LinkIcon/>
              </IconButton>  */}
            <Link href={project.link} target="_blank"  varient="button" underline="none">
              {`showProject`&&<LinkIcon/>}
              </Link> 
            </Tooltip>
           )}
          
           </CardContent>
       </Card>

        ))}{/* end of map */}
       
     

      </div>
 


)}

export default ProjectComponent


