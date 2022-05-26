import React,{ useState } from 'react'
import { useNavigate } from "react-router-dom";
import Alert from '../../common/Alert'
import { errorStyle } from '../../common/errorStyle'
import {registerRequest} from '../../api/regester.api'
import {RegistervalidationSchema} from '../../common/validationSchema'
import { useFormik } from 'formik';
import {TextField} from '@mui/material'


export default function LoginRight() {
    const [message, setMessage] = useState({msg:"",state:false})
    const [loading, setLoading] = useState(false)
    const nav = useNavigate();    
    let gotToLoginPage=()=>{
      nav('/login')
    }

    let handleSubmit=()=>{
      const userName=formik.values.userName
      const email=formik.values.email
      const password=formik.values.password
      const confirmPassword=formik.values.confirmPassword

        if (password!== confirmPassword) {
          return setMessage({msg:"Passwords do not match",state:false})
        }
        setLoading(true)
       registerRequest(setMessage,setLoading,
        userName,
       email,
        password,nav)
        setTimeout(()=>setLoading(false),1000)
    }
      
    const formik = useFormik({
      initialValues: {
        userName:'',
        email: '',
        password: '',
        confirmPassword:""
      },
      validationSchema:RegistervalidationSchema,
      onSubmit:handleSubmit
    });


  return (
    <div className="loginRight">
            <form onSubmit={formik.handleSubmit}>
              <div className= "loginBox" style={errorStyle(message.msg)}>
              {message.msg&&<Alert message={message}/>}
              <TextField
              fullWidth
              variant="standard"
              onBlur={formik.handleBlur}
              id="userName"
              name="userName"
              label="userName"
              value={formik.values.userName}
              onChange={formik.handleChange}
              error={formik.touched.userName && Boolean(formik.errors.userName)}
              helperText={formik.touched.userName && formik.errors.userName} 
              />

            <TextField
            variant="standard"
            fullWidth
            onBlur={formik.handleBlur}
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
           <TextField
           variant="standard"
          fullWidth
          onBlur={formik.handleBlur}
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
         <TextField
          fullWidth
          variant="standard"
          onBlur={formik.handleBlur}
          id="password"
          name="confirmPassword"
          label="password again"
          type="password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
          helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
        />

      <button   disabled={loading} style={ loading?{opacity:0.5}:{opacity:1,margin:"4px"}}type="submit"  className="loginButton">Sign Up</button>
      <button onClick={gotToLoginPage}  className="loginRegisterButton">
        Log into Account
      </button>
    </div> 
  </form>        
    </div>
  )
}
