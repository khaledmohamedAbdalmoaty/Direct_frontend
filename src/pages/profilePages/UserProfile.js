import * as React from 'react';
import Stack from '@mui/material/Stack';

/* -------------------------------------------------------------------------- */
/*                        import from react router dom                        */
/* -------------------------------------------------------------------------- */
import {useParams} from 'react-router-dom'

/* -------------------------------------------------------------------------- */
/*                           import custom component                          */
/* -------------------------------------------------------------------------- */
import GeneralInfoComponent from './GeneralInfoComponent';
import EducationComponent from './EducationComponent'
import ProjectsComponent from './ProjectsComponent';
import SkillsComponent from './SkillsComponent';
import  ShowAlertMessage from './ShowAlertMessage'
import AppBar from '@mui/material/AppBar';


/* -------------------------------------------------------------------------- */
/*                         import from context folder                         */
/* -------------------------------------------------------------------------- */
import {useStateValue} from '../../contexts'
import {GoBackComponent,Alert} from '../../common'

/* -------------------------------------------------------------------------- */
/*                            import fom api folder                           */
/* -------------------------------------------------------------------------- */
import {useGetUserGeneralInfo} from '../../api'



const userProfile=()=> {
  const [{GlobalAlert,user},dispatch]=useStateValue()
  const {userId}=useParams()
  const {data:userInfo,isLoading,isFetching,error,isError,refetch}=useGetUserGeneralInfo(userId)
  const currentUserId=JSON.parse(localStorage.getItem('currentUserInfo')).user_id
  

 
  if(isLoading){
    return <h1>Loading....</h1>
  }

  if(!userInfo._id){
    return <h1>user NotFound </h1>
  }
  



return (
  <Stack
      direction="column"
      justifyContent="space-evenly"
      alignItems="center"
      spacing={1}
      bgcolor='#ced4da' 
  >
  {/*   <AppBar position="sticky" bgColor="black">  */}
    {/*  </AppBar> */}
  
      <GoBackComponent/>

    
  
 
   
   
    {/*   first card   and second card */}
  
   {(userId===currentUserId) ? <GeneralInfoComponent  userInfo={userInfo} state={true}/> : <GeneralInfoComponent userInfo={userInfo} state={false}/> }
    {/*   third card => education card  */}
    {/* <EducationComponent/> */}
    {(userId===currentUserId) ? <EducationComponent   userId={userId} state={true}/> : <EducationComponent userId={userId} state={false}/> }
    <div className={{position:"absolute"}}>
          {GlobalAlert.msg&&<Alert message={GlobalAlert}/>}
    </div>
    {/* fourth card => skills  */}
    {(userId===currentUserId) ? <SkillsComponent   userId={userId} state={true}/> : <SkillsComponent userId={userId} state={false}/> }


    {/*  fifth card project */}
    {(userId===currentUserId) ? <ProjectsComponent   requiredUserId={userId} state={true}/> : <ProjectsComponent userId={userId} state={false}/> }
 
     
    

  </Stack>
);
}

export default userProfile