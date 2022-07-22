import React ,{useState} from 'react';
import { useFormik } from 'formik';


/* -------------------------------------------------------------------------- */
/*                      import from materila ui versin 5                      */
/* -------------------------------------------------------------------------- */
import {Box,Modal,Typography,IconButton,styled,Avatar,TextField,Stack,Fab,ButtonGroup,Button,Input,Tooltip} from '@mui/material' 
import PostAddTwoToneIcon from '@mui/icons-material/PostAddTwoTone';
import SendIcon from '@mui/icons-material/Send'; 

import {AddProjectCardSchema,Alert} from '../../../common'

/* -------------------------------------------------------------------------- */
/*                 import differetn things from context folder                */
/* -------------------------------------------------------------------------- */
import {actionTypes,useStateValue} from '../../../contexts'



/* -------------------------------------------------------------------------- */
/*                   import different things from api folder                  */
/* -------------------------------------------------------------------------- */
import {useCreateUserProjectCard} from '../../../api'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
 
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius:5
};


const SyledModal=styled(Modal)({
 display:'flex',
  alignItems:'center',
  justifyContent:'center' 
 
})






const AddProjectCard=()=> {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
 const {mutate}= useCreateUserProjectCard()
 const [{user,GlobalAlert},dispatch]=useStateValue()


   /* ------------------------------ formik things -----------------------------  */
    const handleSubmit=()=>{
    const projectName=formik.values.projectName
    const projectStartTime=formik.values.projectStartTime
    const projectEndTime=formik.values.projectEndTime
    const projectDesc=formik.values.projectDesc
    const link=formik.values.link
    const userId=user.user_id
    mutate({userId,projectName,projectStartTime,projectEndTime,projectDesc,link,dispatch})
    setTimeout(()=>{
      dispatch({
        type:actionTypes.RESETALERT
      })
      setOpen(false)    
    },2000)
   
}
    
  const formik = useFormik({
    initialValues: {
      projectName:'',
      projectStartTime:'',
      projectEndTime:'',
      projectDesc:'',
      link:''
    },
    validationSchema:AddProjectCardSchema,
    onSubmit:handleSubmit
  });

  



  return (

    <React.Fragment>
    <Tooltip title={actionTypes.ADDPROJECTCARD} >
        <IconButton onClick={handleOpen}>
           <PostAddTwoToneIcon/>
        </IconButton>
    </Tooltip>
      <SyledModal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
      <Box sx={style}>
        <div>
          {GlobalAlert.msg&&<Alert message={GlobalAlert}/>}
        </div>
          <Typography variant="h6" sx={{textAlign:'center'}} component="h2">
            {actionTypes.ADDPROJECTCARD}
          </Typography>
           {/*  formik fields */}
           <form onSubmit={formik.handleSubmit}>
        
            <TextField
              fullWidth
              variant="standard"
              onBlur={formik.handleBlur}
              id="projectName"
              name="projectName"
              label="projectName"
              value={formik.values.projectName}
              onChange={formik.handleChange}
              error={formik.touched.projectName && Boolean(formik.errors.projectName)}
              helperText={formik.touched.projectName && formik.errors.projectName} 
            />
            <TextField
              fullWidth
              variant="standard"
              onBlur={formik.handleBlur}
              id="projectStartTime"
              name="projectStartTime"
              label="projectStartTime"
              value={formik.values.projectStartTime}
              onChange={formik.handleChange}
              error={formik.touched.projectStartTime && Boolean(formik.errors.projectStartTime)}
              helperText={formik.touched.projectStartTime && formik.errors.projectStartTime} 
            />
            <TextField
              fullWidth
              variant="standard"
              onBlur={formik.handleBlur}
              id="projectEndTime"
              name="projectEndTime"
              label="projectEndTime"
              value={formik.values.projectEndTime}
              onChange={formik.handleChange}
              error={formik.touched.projectEndTime && Boolean(formik.errors.projectEndTime)}
              helperText={formik.touched.projectEndTime && formik.errors.projectEndTime} 
            />
              <TextField
              fullWidth
              variant="standard"
              onBlur={formik.handleBlur}
              id="projectDesc"
              name="projectDesc"
              label="projectDesc"
              value={formik.values.projectDesc}
              onChange={formik.handleChange}
              error={formik.touched.projectDesc && Boolean(formik.errors.projectDesc)}
              helperText={formik.touched.projectDesc && formik.errors.projectDesc} 
            />
           
            <TextField
              fullWidth
              variant="standard"
              onBlur={formik.handleBlur}
              id="link"
              name="link"
              label="link"
              value={formik.values.link}
              onChange={formik.handleChange}
              error={formik.touched.link && Boolean(formik.errors.link)}
              helperText={formik.touched.link && formik.errors.link} 
            />

            <Button sx={{m:"20px",p:"5px"}} component="button"  type="submit" variant="contained" endIcon={<SendIcon/>}>
                submit
            </Button>

            </form>
      </Box>

    </SyledModal>

  </React.Fragment>      
   
  )
}


export default AddProjectCard









