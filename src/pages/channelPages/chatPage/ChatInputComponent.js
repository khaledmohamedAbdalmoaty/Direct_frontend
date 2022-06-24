import React from 'react'

const ChatInputComponent = () => {

    const handleAddMsg =async (e)=>{
        e.preventDefault()
        const message=inputRef.current.value
        mutate({channelId,message,userId})
        inputRef.current.value=""
      } 
    
  return (
        <div className="chat__footer">
           <form >
             <input  ref={inputRef} placeholder='Type a message' type="text"/>
             <button  onClick={handleAddMsg} type="submit" >send Message</button>
           </form>
       </div>
  )
}

export default ChatInputComponent