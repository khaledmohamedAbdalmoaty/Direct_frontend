import * as React from 'react';

/* -------------------------------------------------------------------------- */
/*                      import from materila ui versin 5                      */
/* -------------------------------------------------------------------------- */
import {Box,Modal,Typography,IconButton,styled,Avatar,TextField,Stack,Fab,ButtonGroup,Button,Input,Tooltip} from '@mui/material' 
import PostAddTwoToneIcon from '@mui/icons-material/PostAddTwoTone';
import SendIcon from '@mui/icons-material/Send'; 
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';


/* -------------------------------------------------------------------------- */
/*                 import differetn things from context folder                */
/* -------------------------------------------------------------------------- */
import {useStateValue,actionTypes} from '../../../contexts'

/* -------------------------------------------------------------------------- */
/*            import didfferent things from react router dom var.6            */
/* -------------------------------------------------------------------------- */

import {useParams, useNavigate} from 'react-router-dom'

/* -------------------------------------------------------------------------- */
/*                   import different things from api folder                  */
/* -------------------------------------------------------------------------- */
import {UploadImageToMulter,useUpdateImageLocation} from '../../../api'

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



const CreatePostComponent=()=> {
  /* const [{ user }, dispatch] = useStateValue();
  const {channelId}=useParams()
  const userId=user.user_id */
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
 const [file,setFile]=React.useState()
 const {mutate}=useUpdateImageLocation() 
  const takeFile=(e)=>{
    setFile(e.target.files[0])
  
  }

  const [{user}]=useStateValue()
 

  const handleSubmit=async (e)=>{
    e.preventDefault()
    try{
      const userImageLocation=await UploadImageToMulter(file)
      const userId=user.user_id
      mutate({userImageLocation,userId})
      setOpen(false)
    }
    catch(err){}

  }






  return (
    <>  
       <Tooltip title={actionTypes.UPLOADUSERPHOTO} >
        <IconButton onClick={handleOpen}>
             <AddAPhotoIcon/>
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
        <Typography variant="h6" sx={{textAlign:'center'}} component="h2">
          {actionTypes.UPLOADUSERPHOTO}
        </Typography>
          
            <input
              type='file' 
              accept="image/*" 
              onChange={takeFile}
               required
            /> 

            <Button sx={{m:"10px"}} component="button" onClick={handleSubmit}  type="submit" variant="contained" endIcon={<SendIcon/>}>
                submit
            </Button>       
              
      </Box>
       
      </SyledModal>
    </>
  )
}


export default CreatePostComponent
