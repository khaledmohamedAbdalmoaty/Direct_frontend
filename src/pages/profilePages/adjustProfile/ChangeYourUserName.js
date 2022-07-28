import * as React from 'react';

/* -------------------------------------------------------------------------- */
/*                      import from materila ui versin 5                      */
/* -------------------------------------------------------------------------- */
import {Box,Modal,Typography,IconButton,styled,Avatar,TextField,Stack,Fab,ButtonGroup,Button,Input,Tooltip} from '@mui/material' 
import PostAddTwoToneIcon from '@mui/icons-material/PostAddTwoTone';
import SendIcon from '@mui/icons-material/Send'; 
import TitleIcon from '@mui/icons-material/Title';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

/* -------------------------------------------------------------------------- */
/*                 import differetn things from context folder                */
/* -------------------------------------------------------------------------- */
import {actionTypes,useStateValue} from '../../../contexts'



/* -------------------------------------------------------------------------- */
/*                   import different things from api folder                  */
/* -------------------------------------------------------------------------- */
import {useUpdateUserName} from '../../../api'

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



const ChangeYourUserName=()=> {
  const {mutate}=useUpdateUserName()
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
 const [UserName,setUserName]=React.useState()
 const [{user}]=useStateValue()
 

  const handleSubmit=async (e)=>{
    e.preventDefault()
    const userId=user.user_id
    mutate({userId,UserName})
    setOpen(false)
  }

  



  return (

    <React.Fragment>
    <Tooltip title={"change your Name"} >
        <IconButton onClick={handleOpen}>
             <DriveFileRenameOutlineIcon/>
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
            {actionTypes.UserName}
          </Typography>
        
            <>
              <TextField
                onChange={(e)=>setUserName(e.target.value)}
                fullWidth
                variant="standard"
                name="UserName"
                label="UserName"
                multiline
                rows='1'          
              />
              <Button sx={{m:"10px"}} component="button" onClick={handleSubmit}  type="submit" variant="contained" endIcon={<SendIcon/>}>
                submit
              </Button>
              
            </>     
      </Box>

    </SyledModal>

  </React.Fragment>      
   
  )
}


export default ChangeYourUserName