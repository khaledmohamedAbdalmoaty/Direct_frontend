import React,{ useState,useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Alert from '../../../common/Alert'
import {errorStyle,changePriorityNumberScheam,GoBackComponent} from '../../../common'
import { useFormik } from 'formik';
import {TextField} from '@mui/material'


/* -------------------------------------------------------------------------- */
/*                               import from api                              */
/* -------------------------------------------------------------------------- */
import {useChangePriorityNumber} from '../../../api'
import {actionTypes,useStateValue} from '../../../contexts'
/* -------------------------------------------------------------------------- */
/*                               import from mui                              */
/* -------------------------------------------------------------------------- */
/* import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
 */

/* -------------------------------------------------------------------------- */
/*            import things related to  react router dom version.6            */
/* -------------------------------------------------------------------------- */
import {useParams} from 'react-router-dom'



function ChangePriorityField() {
    const {channelId,channelName}=useParams()
    const [loading, setLoading]=useState(false)
    const nav = useNavigate();    
    const [showAlert,setShowAlert]=useState()
    const [{user,GlobalAlert},dispatch]=useStateValue()
    const userId=JSON.parse(localStorage.getItem('currentUserInfo')).user_id
    const {mutate}= useChangePriorityNumber()
    const SubmitStyle={
      marginTop:"10px",
      textAlign:'center',
      width:"100px",
      height:"50px",
      opacity:loading?'.5':'1'
    }

    useEffect(()=>{
      setShowAlert(true)
      setTimeout(()=>{
        setShowAlert(false)
        dispatch({
          type:actionTypes.RESETALERT
        })
      },1500)
    },[GlobalAlert.changeChannelPriorityNumber])
    

    let handleSubmit=()=>{     
      const priority=formik.values.priority
      setLoading(true)
      mutate({userId,priority,channelId,dispatch})
      setTimeout(()=>setLoading(false),1000)
    }
      
    const formik = useFormik({
      initialValues: {
        priority:0,
      },
      validationSchema:changePriorityNumberScheam,
      onSubmit:handleSubmit
    });


  return (
    <div className="loginRight">
            <GoBackComponent/>
            <form onSubmit={formik.handleSubmit}>
            <h4> change priorty number of:{`${channelName}`} </h4>
              {showAlert&&GlobalAlert.msg&&<Alert message={GlobalAlert}/>}
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

      <button   disabled={loading}  style={SubmitStyle} type="submit"  className="loginButton">Submit</button>
      </form>        
  </div>
  )
}



export default function CreateChannelComponent() {
  return (
     <div className="login">
        <div className="loginWrapper">
          <ChangePriorityField/>
        </div>
      </div>
  );
}