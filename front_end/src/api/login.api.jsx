import { auth } from '../firebase'
import {signInWithEmailAndPassword} from "firebase/auth"
    
export const signInRequest=(email,password,setMessage,setLoading,nav)=>{
    setMessage({msg:"",state:false})
    setLoading(true)
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    /* const user = userCredential.user; */
    /* let uid=user.uid */
    /* console.log(`User Uid =>${uid}`) */
    setLoading(false)
    setMessage({msg:"login now... ",state:true})
    setTimeout(()=> nav("/profile"),1000)
   
    })
    .catch((err) => {
      setLoading(false)
      err.code==="auth/too-many-requests" ?setMessage({msg:"Too many wrong requests ",state:false}) :setMessage({msg:"Your Password or Email is Wrong ",state:false})   
    })
}