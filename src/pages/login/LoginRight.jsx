import React,{ useState } from 'react'
import { useNavigate } from "react-router-dom";
import Alert from '../../common/Alert'
import { errorStyle } from '../../common/errorStyle'
import {loginValidationSchema} from '../../common/validationSchema'
import { useFormik } from 'formik';
import {TextField} from '@mui/material'
import {signInRequest} from '../../api/login.api'


export default function LoginRight() {
    const [message, setMessage] = useState({msg:"",state:false})
    const [loading, setLoading] = useState(false)
    const nav = useNavigate()

  let handleLogin=()=>{
    signInRequest(formik.values.email,formik.values.password,setMessage,setLoading,nav)    
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema:loginValidationSchema,
    onSubmit:handleLogin
  });


  return (
    <div className="loginRight">
      <form onSubmit={formik.handleSubmit}>
      <div className="loginBox" style={errorStyle(message.msg)}>
      {message.msg&&<Alert message={message}/>}
      <TextField
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
      <button disabled={loading} style={ loading?{opacity:0.5}:{opacity:1}} className="loginButton" type="submit">Log In</button>
      <span className="loginForgot" style={{cursor:"pointer"}} onClick={()=>{nav('/restpassword')}}>Forgot Password?</span>
      <button  onClick={()=>nav("/register")}  className="loginRegisterButton">
          Create a New Account
      </button>
      
      </div>
      </form>
    </div>
  )
}
