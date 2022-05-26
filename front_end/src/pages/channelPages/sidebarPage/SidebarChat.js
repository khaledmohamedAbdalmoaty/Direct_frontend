import React from 'react'
import './SidebarChat.css'
import { useNavigate} from 'react-router-dom';
function SidebarChat({channelName,id}) {
  let nav=useNavigate()
  console.log(`channelName`)
  const selectChannel = () => {
    if (id) {
        nav(`/channel/${id}`)
    } else {
        nav(channelName);
    }
  };

  return (
    <div className="sidebarChat" onClick={selectChannel}>
        <div  key={id} className="sidebarChat__info">
            <h2># {channelName}</h2>    
        </div>   
    </div>
  )
}

export default SidebarChat
