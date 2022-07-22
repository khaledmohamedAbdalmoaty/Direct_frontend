import React ,{useState,useEffect} from 'react';
import { useFormik } from 'formik';


/* -------------------------------------------------------------------------- */
/*                      import from materila ui versin 5                      */
/* -------------------------------------------------------------------------- */
import {Box,Modal,Typography,IconButton,styled,Avatar,TextField,Stack,Fab,ButtonGroup,Button,Input,Tooltip} from '@mui/material' 
import PostAddTwoToneIcon from '@mui/icons-material/PostAddTwoTone';
import SendIcon from '@mui/icons-material/Send'; 
import TitleIcon from '@mui/icons-material/Title';
import FeedIcon from '@mui/icons-material/Feed';
import AddIcon from '@mui/icons-material/Add';

import HandymanIcon from '@mui/icons-material/Handyman';

import {AddSchoolCardSchema,Alert} from '../../../common'

/* -------------------------------------------------------------------------- */
/*                 import differetn things from context folder                */
/* -------------------------------------------------------------------------- */
import {actionTypes,useStateValue} from '../../../contexts'


/* -------------------------------------------------------------------------- */
/*                   import different things from api folder                  */
/* -------------------------------------------------------------------------- */
import {useEditEducationCard} from '../../../api'

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

const avatarStyle={
  width:30,
  height:30
};

const SyledModal=styled(Modal)({
 display:'flex',
  alignItems:'center',
  justifyContent:'center' 
 
})
const middleStyle={ display:'flex',
                alignItems:'center',
                justifyContent:'center' 
}
const UserBox=styled(Box)({
  display:'flex',
  alignItems:'center',
  gap:'10px',
  marginBottom:'10px'
})



const EditEducationCard =({schoolName,schoolStartTime,schoolEndTime,schoolDesc,schoolId})=> {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
 const {mutate}=useEditEducationCard()
 const [{user,GlobalAlert},dispatch]=useStateValue()
   /* ------------------------------ formik things -----------------------------  */
  const handleSubmit=()=>{
    const schoolName=formik.values.schoolName
    const schoolStartTime=formik.values.schoolStartTime
    const schoolEndTime=formik.values.schoolEndTime
    const schoolDesc=formik.values.schoolDesc
    const userId=user.user_id
  
   mutate({userId,schoolId,schoolName,schoolStartTime,schoolEndTime,schoolDesc,dispatch})
setTimeout(()=>{
       dispatch({
        type:actionTypes.RESETALERT
       })
      setOpen(false)
    },2000)    
    
}
    
  const formik = useFormik({
    initialValues: {
      schoolName:schoolName,
      schoolStartTime:schoolStartTime,
      schoolEndTime:schoolEndTime,
      schoolDesc:schoolDesc
    
    },
    validationSchema:AddSchoolCardSchema,
    onSubmit:handleSubmit
  });

  
  


  return (

    <React.Fragment>
     
    <Tooltip title={actionTypes.EditEducationCard} >
        <IconButton onClick={handleOpen}>
           <HandymanIcon/>
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
            {actionTypes.EditEducationCard}
          </Typography>
           {/*  formik fields */}
           <form onSubmit={formik.handleSubmit}>
          {/* <div>
          {GlobalAlert.msg&&<Alert message={GlobalAlert}/>}
          </div> */}

            <TextField
              fullWidth
              variant="standard"
              onBlur={formik.handleBlur}
              id="schoolName"
              name="schoolName"
              label="schoolName"
              value={formik.values.schoolName}
              onChange={formik.handleChange}
              error={formik.touched.schoolName && Boolean(formik.errors.schoolName)}
              helperText={formik.touched.schoolName && formik.errors.schoolName} 
            />
            <TextField
              fullWidth
              variant="standard"
              onBlur={formik.handleBlur}
              id="schoolStartTime"
              name="schoolStartTime"
              label="schoolStartTime"
              value={formik.values.schoolStartTime}
              onChange={formik.handleChange}
              error={formik.touched.schoolStartTime && Boolean(formik.errors.schoolStartTime)}
              helperText={formik.touched.schoolStartTime && formik.errors.schoolStartTime} 
            />
            <TextField
              fullWidth
              variant="standard"
              onBlur={formik.handleBlur}
              id="schoolEndTime"
              name="schoolEndTime"
              label="schoolEndTime"
              value={formik.values.schoolEndTime}
              onChange={formik.handleChange}
              error={formik.touched.schoolEndTime && Boolean(formik.errors.schoolEndTime)}
              helperText={formik.touched.schoolEndTime && formik.errors.schoolEndTime} 
            />
            <TextField
              fullWidth
              variant="standard"
              onBlur={formik.handleBlur}
              id="schoolDesc"
              name="schoolDesc"
              label="schoolDesc"
              value={formik.values.schoolDesc}
              onChange={formik.handleChange}
              error={formik.touched.schoolDesc && Boolean(formik.errors.schoolDesc)}
              helperText={formik.touched.schoolDesc && formik.errors.schoolDesc} 
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


export default EditEducationCard










