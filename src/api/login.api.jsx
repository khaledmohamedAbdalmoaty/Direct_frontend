import { auth } from '../firebase'
import {signInWithEmailAndPassword} from "firebase/auth"
import {actionTypes} from '../contexts'
import axios from 'axios'
const API_URL=process.env.REACT_APP_API_URL

    
export const signInRequest=(email,password,setMessage,setLoading,nav,dispatch)=>{
  setMessage({msg:"",state:false})
  setLoading(true)
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
        const user = userCredential.user
        const uid=user.uid
        axios.get(`${API_URL}/users/${uid}`).then((res)=>{
          const {_id,username}=res.data 
          localStorage.setItem('currentUserInfo',JSON.stringify({
            username,uid,user_id:_id
          }))
          setMessage({msg:"login.... ",state:true})
          })//end of axios.then request 
          .catch(()=>{
            setLoading(false)
            localStorage.clear()
            setMessage({msg:"failed to login!! ",state:false})
          })//end of axios catch request 

          setTimeout(()=>nav(`/MainPage`),1000)//go to login or mainpage 

  })//end of send to google request

  .catch((err) => {
    setLoading(false)
      localStorage.clear()
      err.code==="auth/too-many-requests" ?setMessage({msg:"Too many wrong requests ",state:false}) :setMessage({msg:"Your Password or Email is Wrong ",state:false})   
  })//send to google catch 
}