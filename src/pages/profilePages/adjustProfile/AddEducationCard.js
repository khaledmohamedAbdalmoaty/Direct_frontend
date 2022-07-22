import React ,{useState} from 'react';

/* -------------------------------------------------------------------------- */
/*                      import from materila ui versin 5                      */
/* -------------------------------------------------------------------------- */
import {Box,Modal,Typography,IconButton,styled,Avatar,TextField,Stack,Fab,ButtonGroup,Button,Input,Tooltip} from '@mui/material' 
import PostAddTwoToneIcon from '@mui/icons-material/PostAddTwoTone';
import SendIcon from '@mui/icons-material/Send'; 

/* -------------------------------------------------------------------------- */
/*                 import differetn things from context folder                */
/* -------------------------------------------------------------------------- */
import {actionTypes,useStateValue} from '../../../contexts'
import {Alert} from '../../../common'


/* -------------------------------------------------------------------------- */
/*                   import different things from api folder                  */
/* -------------------------------------------------------------------------- */
import {useCreateUserEducationCard} from '../../../api'

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


const CreatePostComponent=()=> {
  const [{GlobalAlert,user},dispatch]=useStateValue()
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
 const [schoolName,setschoolName]=useState()
 const [schoolStartTime,setschoolStartTime]=useState()
 const [schoolEndTime,setschoolEndTime]=useState()
 const [schoolDesc,setschoolDesc]=useState()
 const {mutate}= useCreateUserEducationCard()
 

  const handleSubmit=async (e)=>{
    e.preventDefault()
    const userId=user.user_id
    mutate({userId,schoolName,schoolStartTime,schoolEndTime,schoolDesc,dispatch})
    setTimeout(()=>{
     dispatch({
      type:actionTypes.RESETALERT
     })
     setOpen(false)
    },2000)
   
  }

  



  return (

    <React.Fragment>
    <Tooltip title={actionTypes.ADDEDUCATIONCARD} >
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
            {actionTypes.ADDEDUCATIONCARD}
          </Typography>
        
            <>
              <TextField
                onChange={(e)=>setschoolName(e.target.value)}
                fullWidth
                variant="standard"
                name="schoolName"
                label="schoolName"
                multiline
                rows='1'          
              />
               <TextField
                onChange={(e)=>setschoolStartTime(e.target.value)}
                fullWidth
                variant="standard"
                name="schoolStartDate"
                label="schoolStartDate"
                multiline
                rows='1'          
              />
               <TextField
                onChange={(e)=>setschoolEndTime(e.target.value)}
                fullWidth
                variant="standard"
                name="schoolEndTime"
                label="schoolGraduate Date"
                multiline
                rows='1'          
              />
               <TextField
                onChange={(e)=>setschoolDesc(e.target.value)}
                fullWidth
                variant="standard"
                name="schoolDesc"
                label="study description"
                multiline
                rows='1'          
              />
              <Button sx={{m:"20px",p:"5px"}} component="button" onClick={handleSubmit}  type="submit" variant="contained" endIcon={<SendIcon/>}>
                submit
              </Button>
              
            </>     
      </Box>

    </SyledModal>

  </React.Fragment>      
   
  )
}


export default CreatePostComponent









