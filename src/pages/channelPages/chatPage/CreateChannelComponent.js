/* import * as React from 'react'; */
/* -------------------------------------------------------------------------- */
/*                      import from materila ui versin 5                      */
/* -------------------------------------------------------------------------- */
/* import {Box,Modal,Typography,IconButton,styled,Avatar,TextField,Stack,Fab,ButtonGroup,Button,Input,Tooltip} from '@mui/material' 
import {AttachFile,Image,Add as AddIcon,DateRange,PhotoCamera} from '@mui/icons-material' */


/* -------------------------------------------------------------------------- */
/*                           new things that we try                           */
/* -------------------------------------------------------------------------- */
/* import { useNavigate } from "react-router-dom";
import Alert from '../../../common/Alert'
import { errorStyle } from '../../../common/errorStyle'
import {registerRequest} from '../../../api/regester.api'
import {RegistervalidationSchema} from '../../../common/validationSchema'
import { useFormik } from 'formik';
import axios from 'axios'
import {useStateValue,actionTypes} from '../../../contexts'
import {useParams} from 'react-router-dom'


import  UploadImageToMulter,{useUpLoadConversationImage} from '../../../api/UpLoadConversationImage.api'

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



export default function CreateChannelComponent() {
  const [{ user }, dispatch] = useStateValue();
  const {channelId}=useParams()
  const userId=user.user_id
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
 const [file,setFile]=React.useState()
 const [imageCaption,setimageCaption]=React.useState()
 const {mutate}=useUpLoadConversationImage()
 
  const takeFile=(e)=>{
    setFile(e.target.files[0])
  
  }

  const handleSubmit=async (e)=>{
    e.preventDefault()
    try{
      const imageName=await UploadImageToMulter(file)
      console.log(`image name that come from first step => ${imageName}`)
      mutate({channelId,userId,imageName,imageCaption})
      console.log(`inside the second try`)
      setOpen(false)
      //console.log( `from try result in handle sumit the name of location is ${result}`)

    }
    catch(err){}

  }

  const nav = useNavigate();    
  let gotToLoginPage=()=>{
    nav('/login')
  }




  return (
    <>  
        <Tooltip title={actionTypes.UPLOADIMAGETOOLTIP} >
        <IconButton onClick={handleOpen}>
             <AttachFile/> 
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
        <form   onSubmit={handleSubmit}>
        <Typography variant="h6" sx={{textAlign:'center'}} component="h2">
          {actionTypes.UPLOADIMAGETITLE}
        </Typography>
          <div className= "loginBox" >
          <input
              type='file' 
              accept="image/*" 
              onChange={takeFile}
               required
          /> 

              <TextField
              onChange={(e)=>setimageCaption(e.target.value)}
              fullWidth
              variant="standard"
              name="photoCaption"
              label="photo caption"
              multiline
              rows='3'          
              />
            <button   disabled={false} type="submit"  className="loginButton">upload</button>
          </div> 
        </form>        
      </Box>
       
      </SyledModal>
    </>
  )
}



 */




/* -------------------------------------------------------------------------- */
/*                                  show new                                  */
/* -------------------------------------------------------------------------- */

import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function ColorTextFields() {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField label="Outlined secondary" color="secondary" focused />
      <TextField label="Filled success" variant="filled" color="success" focused />
      <TextField
        label="Standard warning"
        variant="standard"
        color="warning"
        focused
      />
    </Box>
  );
}
