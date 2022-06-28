const axios=require('axios')
const API_URL="http://localhost:8800/api"
async function getPost(){
       axios.get(`${API_URL}/posts/mainPage/posts?id=62b2a9b7a4c8897d3cf8400e`)
       .then((res)=>{
        res.data.forEach((arr)=>{
            arr.forEach((data)=>{
                console.log(data)
            })
        })


       })
       .catch((err)=> console.log(err.message))
      
}

const result = getPost()

console.log(result)