import React from 'react'

export default function Alert({message}) {
    let alertColor={
        fontSize:"large",
        backgroundColor:message.state?"green":'#dc3545',
        padding:"20px",
        "color":"white",
        borderRadius: "10px",
        display: "flex",
        justifyContent: "center",
        textAlign:"center",
        margin:"5px 10px"
    }
  return (
    <div style={alertColor}>
        {message.msg}
    </div>
  )
}
