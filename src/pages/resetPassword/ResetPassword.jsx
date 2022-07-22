import React,{ useRef, useState } from 'react'
import "../../common/login.css"
import Alert from '../../common/Alert'
import { Form, Button, Card,Container} from "react-bootstrap"
import { Link} from "react-router-dom";

import {auth} from '../../firebase'
import {sendPasswordResetEmail } from "firebase/auth";


export default function ResetPassword() {
  const email = useRef()
  const [message, setMessage] = useState({msg:"",state:false})
  const [loading, setLoading] = useState(false)
  const sendEmail=()=>{
  sendPasswordResetEmail(auth, email.current.value)
  .then(() => {
    setMessage({msg:"Password sent email is send open your email to check ",state:true})
  })
  .catch((error) => {
    setMessage({msg:"Your email is not exist ",state:false})
  });

}

  
  let handleResetPassword=(e)=>{
   e.preventDefault() 
    setLoading(true)
    sendEmail()
    setTimeout(()=>setLoading(false),1000);  
    }
  
  return (
    <>


<Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
<div className="w-100" style={{ maxWidth: "400px" }}>
<Card>
  <Card.Body>
    <h2 className="text-center mb-4">Password Reset</h2>
    {message.msg&&<Alert message={message} />}
    <Form onSubmit={handleResetPassword}>
      <Form.Group id="email">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" ref={email} required />
      </Form.Group>
      <Button className="w-100" type="submit" disabled={loading} style={loading?{opacity:0.5}:{opacity:1}} >
        Reset Password
      </Button>
    </Form>
    <div className="w-100 text-center mt-3">
    </div>
      <Link to="/login" className="btn btn-link">Login</Link>
  </Card.Body>
</Card>
<div className="w-100 text-center mt-2">
  Need an account? <Link to="/register">Sign Up</Link>
</div>
</div>
</Container> 
  
  </>
   
   
)}
