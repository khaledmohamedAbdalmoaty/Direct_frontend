
import React from 'react'
import './try.css'
import axios from 'axios'
const API_URL=process.env.REACT_APP_API_URL


const Try = () => {
  const [state,setState]=React.useState({
    file:'',
    userImage:'',
    message:'',
    success:false
  })
 
  const [progress,setProgress]=React.useState(0)

  const submitForm=async(e)=>{
    e.preventDefault()
    if(state.file){
      const Data=new FormData();
      Data.append('file',state.file)

      const result= await axios.post(`${API_URL}/upLoadFile/single`,Data,{
        headers:{'Content-Type':'multipart/form-data'}
      ,onUploadProgrss:progressEvent=>{
        setProgress(
          parseInt(
            Math.round(  (progressEvent.loaded * 100) / progressEvent.total))
        )
      }
    })
      console.log(result)
      setState({
        ...state,
        message:result.data.message,
        sucess:result.data.success
      })

    }else {
      setState({
        ...state,
        message:'Please Select an image to upload '
      })
    }

    



  }

  const handleInput=(e)=>{
    let reader=new FileReader();
    let file =e.target.files[0]

    reader.onloadend=()=>{
      setState({
        ...state,
        file:file,
        userImage:reader.result,
        message:''
      })
    }

    reader.readAsDataURL(file);
 
  }

  return (
    <div className="App_try">
      <form onSubmit={submitForm}>
        <input type="file" onChange={handleInput}/>
        <br/>
        <button className="submitBtn" type="submit">Upload iMage</button>
      </form>

      {state.message && <h3>{state.message}</h3>}

      <div className="progressContainer ">
        <div style={{ 
          width: `${state.success ? progress:0 }%`,
          height:'30px',
          backgroundColor:'lightgreen'
        }}>
          {progress !==0 && state.success && `${progress}%`}
        </div>

      </div>
      <div className="imageContainer">
        {state.userImage && ( <img src={state.userImage} alt="preview" />)}
       
      </div>

    </div>
  )
}

export default Try




/* -------------------------------------------------------------------------- */
/*                       old image upload implementation                      */
/* -------------------------------------------------------------------------- */
/* 
import React from 'react'
import axios from 'axios'
import { Container } from 'react-bootstrap';
export default function Try() {
  const [file,setFile]=React.useState()
  const handle= (e)=>{
    setFile(e.target.files[0])
     console.log(e.target.files[0])
   }
  const handleSubmit=async (e)=>{
    e.preventDefault()
    if(file){
      const data=new FormData()
      data.append('image',file)
      console.log(`data is => ${data}`)
      const result=await axios.post('http://localhost:8800/api/upLoadFile/single',data)
      console.log(`result from handle Submit => ${JSON.stringify(result.data)}`)
    }


  }
  return (
    <form  onSubmit={handleSubmit}>
      <input type='file'  accept="image/*"  onChange={handle}/>
      <button type='submit'> submit </button>
    </form>
  )
}
 */