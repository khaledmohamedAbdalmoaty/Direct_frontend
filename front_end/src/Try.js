import React from 'react'
import axios from 'axios'
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
      const fileName=Date.now()+file.name
      data.append('image',file)
      data.append('name',fileName)
      const result=await axios.post('http://localhost:8800/api/upLoadFile/single',data)
      console.log(`result from handle Submit ${JSON.stringify(result.data)}`)
    }


  }
  return (
    <form  onSubmit={handleSubmit}>
      <input type='file'  accept="image/*"  onChange={handle}/>
      <button type='submit'> submit </button>
    </form>
  )
}
