import React,{ useState,useEffect } from 'react'

import { useFormik } from 'formik';
import {TextField} from '@mui/material'


/* -------------------------------------------------------------------------- */
/*                               import from api-common-context               */
/* -------------------------------------------------------------------------- */
import {useSendNewEmail} from '../../../api'
import {GoBackComponent,Alert,RegistervalidationSchema,errorStyle,SendEmailSchema} from '../../../common'
import {actionTypes, useStateValue} from '../../../contexts'

import { useNavigate,useParams } from "react-router-dom";


function InputFields() {
     const {targetPersonId}=useParams()
     const [{GlobalAlert,user},dispatch]=useStateValue()
     const currentUser=JSON.parse(localStorage.getItem('currentUserInfo')).user_id 
     const {mutate,isLoading}=useSendNewEmail()
     const [showAlert,setShowAlert]=useState(false)
     useEffect(()=>{
      setShowAlert(true)
      setTimeout(()=>{
        setShowAlert(false)
        dispatch({
          type:actionTypes.RESETALERT
        })
  
      },1500)
    },[GlobalAlert.sendEmailComponent])

    /* -------------------------------------------------------------------------- */
    /*                         1.handle submit of formik                         */
    /* -------------------------------------------------------------------------- */
    const handleSubmit=()=>{
      console.log(` we are inside submit`)
      const headerTitle=formik.values.headerTitle
      const emailBody=formik.values.emailBody
      mutate({currentUser,targetPersonId,headerTitle,emailBody,dispatch})
      setTimeout(()=>{
        dispatch({
          type:actionTypes.RESETALERT
        })

      },2000)
    }
      
    const formik = useFormik({
      initialValues: {
        headerTitle:'',
        emailBody:'',
      },
      validationSchema:SendEmailSchema,
      onSubmit:handleSubmit
    });



  return (
    <div className="loginRight">
      <GoBackComponent />
      {showAlert&&GlobalAlert.msg&&<Alert message={GlobalAlert}/>}

    
  <form onSubmit={formik.handleSubmit}>
            <h1>Send Email </h1>
              <div className= "loginBox" >
             
              <TextField
              fullWidth
              variant="standard"
              onBlur={formik.handleBlur}
              id="headerTitle"
              name="headerTitle"
              label="headerTitle"
              value={formik.values.headerTitle}
              onChange={formik.handleChange}
              error={formik.touched.headerTitle && Boolean(formik.errors.headerTitle)}
              helperText={formik.touched.headerTitle && formik.errors.headerTitle} 
              />

              <TextField
                fullWidth
                variant="standard"
                onBlur={formik.handleBlur}
                id="emailBody"
                name="emailBody"
                label="emailBody"
          
                value={formik.values.emailBody}
                onChange={formik.handleChange}
                error={formik.touched.emailBody && Boolean(formik.errors.emailBody)}
                helperText={formik.touched.emailBody && formik.errors.emailBody} 
              />
      <button  type="submit"   className="loginButton">Submit</button>
    </div> 
  </form>        
    </div>
  )
}



export default function  SendEmailComponent() {
  return (
     <div className="login">
        <div className="loginWrapper">
          <InputFields/>
        </div>
      </div>
  );
}