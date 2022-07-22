import axios from 'axios' 
import {useMutation,useQueryClient, useQuery} from 'react-query'
const API_URL=process.env.REACT_APP_API_URL
const IMG_URL=process.env.REACT_APP_IMG_URL
import {actionTypes} from '../contexts'


/* -------------------------------------------------------------------------- */
/*                              1-general user info                             */
/* -------------------------------------------------------------------------- */

/* -------------------------- 1.1 get user general info ------------------------- */

const axiosGetUserGeneralInfo=async(userId)=>{
    try{
        
        const {data}=await axios.get(`${API_URL}/userProfile/generalUserInfo?id=${userId}`)
      /*   console.log(`from axios Get User Genral info => ${data}`) */
       /*  console.log(`from axios get all mail => ${data[0]}`) */
        return data
    }
    catch(err){
        return err
    }
 
    
}

export const useGetUserGeneralInfo=(userId)=>{
      return useQuery(['getUserGeneralInfo',userId],()=> axiosGetUserGeneralInfo(userId),{
        enabled:!!userId
      })
}


/* --------------------------- 1.2 - update workTitle -------------------------- */
async function axiosUpdateWorkTitle({userId,workTitle}){
    

    try{
       
        const newWorkTitle={
            userId,
            workTitle,
        }
        const {data}=await axios.put(`${API_URL}/userProfile/workTitle`,newWorkTitle)
       /*  console.log(`from axios get all mail => ${data[0]}`) */
        return data
    }
    catch(err){
        return err
    }
 
    
}

export const useUpdateWorkTitle=()=>{
    const queryClient = useQueryClient()
    return useMutation(axiosUpdateWorkTitle,{
        onSuccess:(newMessage)=>{
            queryClient.invalidateQueries('getUserGeneralInfo')
        /*  queryClient.setQueryData(['getChannelConversation',channelId],(oldQueryData)=>{
                return {
                    ...oldQueryData,
                    data:[...oldQueryData,newMessage.data],
                }
            } ) */
        } 
    })
        
}


/* --------------------------- 1.2.2 - update userName -------------------------- */
async function axiosUpdateUserName({userId,UserName}){
    
    try{
       
       const userName=UserName
        const newUserName={
            userName,
            userId
        }
        const {data}=await axios.put(`${API_URL}/users/userName/${userId}`,newUserName)
        return data
    }
    catch(err){
        return err.message
    }
 
    
}

export const useUpdateUserName=()=>{
    const queryClient = useQueryClient()
    return useMutation(axiosUpdateUserName,{
        onSuccess:(newMessage)=>{
            queryClient.invalidateQueries('getUserGeneralInfo')
        /*  queryClient.setQueryData(['getChannelConversation',channelId],(oldQueryData)=>{
                return {
                    ...oldQueryData,
                    data:[...oldQueryData,newMessage.data],
                }
            } ) */
        } 
    })
        
}


/* --------------------------- 1.3 update photo image location  -------------------------- */
async function axiosUpdateImageLocation({userId,userImageLocation}){
    

    
    try{
       
        const userProfilePhoto={
            userId,
            userImageLocation:`${IMG_URL}/${userImageLocation}`
        }
        const {data}=await axios.put(`${API_URL}/userProfile/userImageLocation`,userProfilePhoto)
       /*  console.log(`from axios get all mail => ${data[0]}`) */
        return data
    }
    catch(err){
        return err
    }
 
    
}



export const useUpdateImageLocation=()=>{
    const queryClient = useQueryClient()
    return useMutation(axiosUpdateImageLocation,{
        onSuccess:(newMessage)=>{
            queryClient.invalidateQueries('getUserGeneralInfo')
        /*  queryClient.setQueryData(['getChannelConversation',channelId],(oldQueryData)=>{
                return {
                    ...oldQueryData,
                    data:[...oldQueryData,newMessage.data],
                }
            } ) */
        } 
    })
        
}


/* --------------------------- 1.4 - update About secton -------------------------- */
async function axiosUpdateAbout({userId,About}){
   

    try{
       
        const newAbout={
            userId,
            About,
        }
        const {data}=await axios.put(`${API_URL}/userProfile/userAbout`,newAbout)
       /*  console.log(`from axios get all mail => ${data[0]}`) */
        return data
    }
    catch(err){
        return err
    }
 
    
}

export const useUpdateAbout=()=>{
    const queryClient = useQueryClient()
    return useMutation(axiosUpdateAbout,{
        onSuccess:(newMessage)=>{
            queryClient.invalidateQueries('getUserGeneralInfo')
        /*  queryClient.setQueryData(['getChannelConversation',channelId],(oldQueryData)=>{
                return {
                    ...oldQueryData,
                    data:[...oldQueryData,newMessage.data],
                }
            } ) */
        } 
    })
        
}



/* -------------------------------------------------------------------------- */
/*                              2-education service                             */
/* -------------------------------------------------------------------------- */

/* ---------------------------- 2.1 get Education ---------------------------- */
async function axiosGetEducation(userId){
    try{
        const {data}=await axios.get(`${API_URL}/userProfile/getEducation?id=${userId}`)
       /*  console.log(`from axios get all mail => ${data[0]}`) */
        return data
    }
    catch(err){
        return err
    }
 
    
}


export const useGetUserEducation=(userId)=>{
      return useQuery(['getUserEducation',userId],()=> axiosGetEducation(userId))
}


/* ---------------------------- 2.2 posteducation --------------------------- */

async function axiosCreateUserEducation({userId,schoolName,schoolStartTime,schoolEndTime,schoolDesc,dispatch}){
    

     
    try{
       
        const newEducationCard={
            userId,
            schoolName,
            schoolStartTime,
            schoolEndTime,
            schoolDesc
        }
      
        const {data}=await axios.post(`${API_URL}/userProfile/postEducation`,newEducationCard)   
        dispatch({
            type:actionTypes.SUCCESSALERT,
           GlobalAlert:{
                msg:"successfully create Education ",
                state:true
            }
        })    
        return data
    }
    catch(err){
        dispatch({
            type:actionTypes.SUCCESSALERT,
           GlobalAlert:{
                msg:"failed to create education",
                state:false
            }
        })
        return err
    }
   
}

export const useCreateUserEducationCard=()=>{
    const queryClient = useQueryClient()
    return useMutation(axiosCreateUserEducation,{
        onSuccess:(newMessage)=>{
            queryClient.invalidateQueries('getUserEducation')
        /*  queryClient.setQueryData(['getChannelConversation',channelId],(oldQueryData)=>{
                return {
                    ...oldQueryData,
                    data:[...oldQueryData,newMessage.data],
                }
            } ) */
        } 
    })
        
}

/* ------------------------ 2.3 delete education card ------------------------ */
async function axiosDeleteEducationCard({userId,educationCardId}){
    

     
    try{
       
        const deletedCard={
            userId,
            educationCardId
        }
        console.log(`from axiosDelect education ${deletedCard.userId}`)
        const {data}=await axios.delete(`${API_URL}/userProfile/deleteEducation`,{data:deletedCard})       
        return data
    }
    catch(err){
        return err
    }
   
}

export const useDeleteUserEducationCard=()=>{
    const queryClient = useQueryClient()
    return useMutation(axiosDeleteEducationCard,{
        onSuccess:(newMessage)=>{
            queryClient.invalidateQueries('getUserEducation')
        /*  queryClient.setQueryData(['getChannelConversation',channelId],(oldQueryData)=>{
                return {
                    ...oldQueryData,
                    data:[...oldQueryData,newMessage.data],
                }
            } ) */
        } 
    })
        
}

/* ------------------------- 2.4 edit education card ------------------------ */

async function axiosEditEducationCard({userId,schoolId,schoolName,schoolStartTime,schoolEndTime,schoolDesc,dispatch}){
    try{
       
        const newEducationCard={
            userId,
            schoolId,
            schoolName,
            schoolStartTime,
            schoolEndTime,
            schoolDesc
        }
      
        const {data}=await axios.put(`${API_URL}/userProfile/editEducation`,newEducationCard) 
        dispatch({
            type:actionTypes.SUCCESSALERT,
            GlobalAlert:{
                msg:"success edit ",
                state:true
            }
        })      
        return data
    }
    catch(err){
        dispatch({
            type:actionTypes.FAILEDALERT,
           GlobalAlert:{
                msg:"failed editing ",
                state:false
            }
        })
        return err
    }
   
}

export const useEditEducationCard=()=>{
    const queryClient = useQueryClient()
    return useMutation(axiosEditEducationCard,{
        onSuccess:(newMessage)=>{
            queryClient.invalidateQueries('getUserEducation')
        /*  queryClient.setQueryData(['getChannelConversation',channelId],(oldQueryData)=>{
                return {
                    ...oldQueryData,
                    data:[...oldQueryData,newMessage.data],
                }
            } ) */
        } 
    })
        
}


/* -------------------------------------------------------------------------- */
/*                               3-skills                               */
/* -------------------------------------------------------------------------- */


/* ----------------------------- 3.1 -get user skills ---------------------------- */

async function axiosGetSkills(userId){
    try{
        
        const {data}=await axios.get(`${API_URL}/userProfile/getSkills?id=${userId}`)
       /*  console.log(`from axios get all mail => ${data[0]}`) */
        return data
    }
    catch(err){
        return err
    }
 
    
}


export const useGetUserSkills=(userId)=>{
      return useQuery(['getUserSkills',userId],()=> axiosGetSkills(userId))
}


/* ---------------------------- 3.2 post_skill --------------------------- */

async function axiosCreateUserSkill({userId,skillName}){
    

     
    try{
       
        const newSkillCard={
            userId,
            skillName
        }
      
        const {data}=await axios.post(`${API_URL}/userProfile/postSkill`,newSkillCard)       
        return data
    }
    catch(err){
        return err
    }
   
}

export const useCreateUserSkillCard=()=>{
    const queryClient = useQueryClient()
    return useMutation(axiosCreateUserSkill,{
        onSuccess:(newMessage)=>{
            queryClient.invalidateQueries('getUserSkills')
        /*  queryClient.setQueryData(['getChannelConversation',channelId],(oldQueryData)=>{
                return {
                    ...oldQueryData,
                    data:[...oldQueryData,newMessage.data],
                }
            } ) */
        } 
    })
        
}

/* ------------------------ 3.3 delete skill card ------------------------ */
async function axiosDeleteSkillCard({userId,skillId}){
    

     
    try{
       
        const deletedCard={
            userId,
            skillId
        }
      
        const {data}=await axios.delete(`${API_URL}/userProfile/deleteSkill`,{data:deletedCard})       
        return data
    }
    catch(err){
        return err
    }
   
}

export const useDeleteUserSkill=()=>{
    const queryClient = useQueryClient()
    return useMutation(axiosDeleteSkillCard,{
        onSuccess:(newMessage)=>{
            queryClient.invalidateQueries('getUserSkills')
        /*  queryClient.setQueryData(['getChannelConversation',channelId],(oldQueryData)=>{
                return {
                    ...oldQueryData,
                    data:[...oldQueryData,newMessage.data],
                }
            } ) */
        } 
    })
        
}





/* -------------------------------------------------------------------------- */
/*                              4-projects                                   */
/* -------------------------------------------------------------------------- */

/* ---------------------------- 4.1 getProject ---------------------------- */
async function axiosGetProject(userId){
    try{
       
        const {data}=await axios.get(`${API_URL}/userProfile/getProjects?id=${userId}`)
       /*  console.log(`from axios get all mail => ${data[0]}`) */
        return data
    }
    catch(err){
        return err
    }
 
    
}


export const useGetUserProject=(userId)=>{
      return useQuery(['getUserProject',userId],()=> axiosGetProject(userId))
}


/* ---------------------------- 4.2 postProject --------------------------- */

async function axiosCreateUserProject({userId,projectName,projectStartTime,projectEndTime,projectDesc,link,dispatch}){
   
      
    try{
        const newProjectCard={
            userId,
            projectName,
            projectStartTime,
            projectEndTime,
            projectDesc,
            link
        }
      

        const {data}=await axios.post(`${API_URL}/userProfile/postProject`,newProjectCard) 
        dispatch({
            type: actionTypes.SUCCESSALERT,
           GlobalAlert:{
                msg:'successfully create project',
                state:true
            }
        });
        return data
    }
    catch(err){
        dispatch({
            type: actionTypes.FAILEDALERT,
           GlobalAlert:{
                msg:'failed to create project',
                state:false
            }
        });
        return err
    }
   
}

export const useCreateUserProjectCard=()=>{
    const queryClient = useQueryClient()
    return useMutation(axiosCreateUserProject,{
        onSuccess:(newMessage)=>{
            queryClient.invalidateQueries('getUserProject')
        /*  queryClient.setQueryData(['getChannelConversation',channelId],(oldQueryData)=>{
                return {
                    ...oldQueryData,
                    data:[...oldQueryData,newMessage.data],
                }
            } ) */
        } 
    })
        
}

/* ------------------------ 4.3 deleteProject card ------------------------ */
async function axiosDeleteProjectCard({userId,projectId}){
    

     
    try{
        const deletedCard={
            userId,
            projectId
        }
      
        const {data}=await axios.delete(`${API_URL}/userProfile/deleteProject`,{data:deletedCard})       
        return data
    }
    catch(err){
        return err
    }
   
}

export const useDeleteUserProjectCard=()=>{
    const queryClient = useQueryClient()
    return useMutation(axiosDeleteProjectCard,{
        onSuccess:(newMessage)=>{
            queryClient.invalidateQueries('getUserProject')
        /*  queryClient.setQueryData(['getChannelConversation',channelId],(oldQueryData)=>{
                return {
                    ...oldQueryData,
                    data:[...oldQueryData,newMessage.data],
                }
            } ) */
        } 
    })
        
}

/* -------------------------- 4.4 edit project card ------------------------- */
async function axiosEditProjectCard({userId,projectName,projectStartTime,projectEndTime,projectDesc,link,projectId,dispatch}){
    
    try{
        const newProjectCard={
            userId,
            projectName,
            projectStartTime,
            projectEndTime,
            projectDesc,
            link,
            projectId
        }
      

        const {data}=await axios.put(`${API_URL}/userProfile/editProject`,newProjectCard) 
       
            dispatch({
                type:actionTypes.SUCCESSALERT,
               GlobalAlert:{
                    msg:"edit project successfully ",
                    state:true
                }
            })
    
        return data
    }
    catch(err){
        dispatch({
            type:actionTypes.FAILEDALERT,
           GlobalAlert:{
                msg:"failed to edit project",
                state:false
            }
        })
      
       
        return err
    }
   
}

   


export const useEditUserProjectCard=()=>{
    const queryClient = useQueryClient()
    return useMutation(axiosEditProjectCard,{
        onSuccess:(newMessage)=>{
            queryClient.invalidateQueries('getUserProject')
        /*  queryClient.setQueryData(['getChannelConversation',channelId],(oldQueryData)=>{
                return {
                    ...oldQueryData,
                    data:[...oldQueryData,newMessage.data],
                }
            } ) */
        } 
    })
        
}



