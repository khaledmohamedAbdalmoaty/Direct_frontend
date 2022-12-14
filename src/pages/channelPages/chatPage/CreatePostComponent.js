import * as React from 'react';


/* -------------------------------------------------------------------------- */
/*                      import from materila ui versin 5                      */
/* -------------------------------------------------------------------------- */
import {Box,Modal,Typography,IconButton,styled,Avatar,TextField,Stack,Fab,ButtonGroup,Button,Input,Tooltip} from '@mui/material' 
import PostAddTwoToneIcon from '@mui/icons-material/PostAddTwoTone';
 

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
import {UploadImageToMulter,useUploadPost} from '../../../api'

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

const [{ user }, dispatch] = useStateValue();
const {channelId}=useParams()
const userId=user.user_id
const [open, setOpen] = React.useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);
const [file,setFile]=React.useState()
const [imageCaption,setimageCaption]=React.useState()
const {mutate}=useUploadPost()

 
  const takeFile=(e)=>{
    setFile(e.target.files[0])
  
  }

  const handleSubmit=async (e)=>{
    e.preventDefault()
    try{
      const imageName=await UploadImageToMulter(file)
      mutate({channelId,userId,imageName,imageCaption})
      setOpen(false)
    }
    catch(err){}

  }

  const nav = useNavigate();    
  let gotToLoginPage=()=>{
    nav('/login')
  }




  return (
    <>  
       <Tooltip title={actionTypes.CREATEPOST} >
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
        <form   onSubmit={handleSubmit}>
        <Typography variant="h6" sx={{textAlign:'center'}} component="h2">
          {actionTypes.CREATEPOSTTITLE}
        </Typography>
          <div className= "loginBox" >
          <input
              type='file' 
              accept="image/*" 
              onChange={takeFile}
              /*  required */
          /> 

            <TextField
            onChange={(e)=>setimageCaption(e.target.value)}
            fullWidth
            variant="standard"
            name="photoCaption"
            label="post Description"
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


export default CreatePostComponent