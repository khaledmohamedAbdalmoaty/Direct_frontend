import axios from 'axios'
const API_URL=process.env.REACT_APP_API_URL
export function registerRequest(setMessage,setLoading,username, email, password,nav){
    setMessage({msg:"",state:false})
    axios.post(`${API_URL}/auth/register`,{ 
      username,
      email,
      password 
     })
     .then((res)=>{

       if(res.data.status===500){
          setLoading(false)
          console.log(res.data)
         return setMessage({msg:`Email Already exist`,state:false})}
       if(res.data.status!==200){
          return setMessage({msg:`Failed to create an account`,state:false})
        }
        setMessage({msg:`Successful create an ccount`,state:true})
        setTimeout(()=>nav('/login'),1000)
        
     })
     .catch(()=>setMessage({msg:`Failed to create an account`,state:false}))
}


