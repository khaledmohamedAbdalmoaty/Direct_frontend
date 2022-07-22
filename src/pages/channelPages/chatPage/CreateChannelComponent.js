import React,{ useState,useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import {RegistervalidationSchema,errorStyle,CreateChannelSchema} from '../../../common'
import { useFormik } from 'formik';
import {TextField} from '@mui/material'


/* -------------------------------------------------------------------------- */
/*                               import from api                              */
/* -------------------------------------------------------------------------- */
import {useCreateChannel} from '../../../api'
import {GoBackComponent,Alert} from '../../../common'
import {useStateValue,actionTypes} from '../../../contexts'
import "./Chat.css"
/* -------------------------------------------------------------------------- */
/*                               import from mui                              */
/* -------------------------------------------------------------------------- */
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function CreateChannelFields() {
  const [showAlert,setShowAlert]=useState(false)
 
    /* ---------------------- select type of channel things --------------------- */
    const [PostOnlyChannel, setPostOnlyChannel] = React.useState();
    const [canMakePost,setCanMakePost]=React.useState()
    const [{user,GlobalAlert},dispatch]=useStateValue()
    const channelOwner=user.user_id
    const {mutate}=useCreateChannel()

    const handleChange = (event) => {
      setPostOnlyChannel(event.target.value);
    };

    const handleCanMakePost=(event)=>{
      setCanMakePost(event.target.value)
    }

    const [message, setMessage] = useState({msg:"",state:false})
    const [loading, setLoading] = useState(false)
    const nav = useNavigate(); 
    
    useEffect(()=>{
      setShowAlert(true)
      setTimeout(()=>{
        setShowAlert(false)
        dispatch({
          type:actionTypes.RESETALERT
        })
      },1500)
    },[GlobalAlert.createChannelComponent])
 
    const handleSubmit=()=>{
    const channelName=formik.values.channelName
    const priority=formik.values.priority
    const postOnly=PostOnlyChannel
    const subScribersCanMakePost=canMakePost 
          
      setLoading(true)
      mutate({channelOwner,
        channelName,
        priority,
        postOnly,
        nav,
        subScribersCanMakePost,dispatch,setLoading})
        setTimeout(()=>setLoading(false),1000)
    }
      
    const formik = useFormik({
      initialValues: {
        channelName:'',
        priority: 1000,
        postOnly:false
      },
      validationSchema:CreateChannelSchema,
      onSubmit:handleSubmit
    });


  return (
 /*  <div className="chat">  
     <div className="chat__body" > */
    <div className="loginRight">
      <GoBackComponent /* bgColor2={'blue'} *//>
            <form onSubmit={formik.handleSubmit}>
            {showAlert&&GlobalAlert.msg&&<Alert message={GlobalAlert}/>}
            <h1>Create channel </h1>
              <div className= "loginBox" style={errorStyle(message.msg)}>
              {message.msg&&<Alert message={message}/>}
              <TextField
              fullWidth
              variant="standard"
              onBlur={formik.handleBlur}
              id="channelName"
              name="channelName"
              label="channelName"
              value={formik.values.channelName}
              onChange={formik.handleChange}
              error={formik.touched.channelName && Boolean(formik.errors.channelName)}
              helperText={formik.touched.channelName && formik.errors.channelName} 
              />

              <TextField
              fullWidth
              variant="standard"
              onBlur={formik.handleBlur}
              id="priority"
              name="priority"
              label="priority"
              type="number"
              value={formik.values.priority}
              onChange={formik.handleChange}
              error={formik.touched.priority && Boolean(formik.errors.priority)}
              helperText={formik.touched.priority && formik.errors.priority} 
              />
            

             {/*  select type of channel ui */}
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={PostOnlyChannel}
                label="Type"
                onChange={handleChange}
              >
                <MenuItem value={true}>post only</MenuItem>
                <MenuItem value={false}>post And chat</MenuItem>
        
              </Select>
            </FormControl>
          </Box>

             
             {/*  select user can make posts*/}

             {
              (!PostOnlyChannel)&&(
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={canMakePost}
                    label="Type"
                    onChange={handleCanMakePost}
                  >
                    <MenuItem value={true}>user can make posts</MenuItem>
                    <MenuItem value={false}>user can't make post on your channel </MenuItem>
            
                  </Select>
                </FormControl>
              </Box>
              )
             }
          


      <button   disabled={ loading} style={ loading?{opacity:0.5}:{opacity:1,margin:"4px"}}type="submit"  className="loginButton">Submit</button>
    </div> 
      </form>        
    </div>
 /*  </div>
  </div> */
  )
}



export default function CreateChannelComponent() {
  return (   
        <div className="chat">
          <div className="chat__body" >
                <CreateChannelFields/>
          </div>
        </div>  
);
}