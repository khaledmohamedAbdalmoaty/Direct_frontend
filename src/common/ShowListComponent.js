import  React from 'react';

/* -------------------------------------------------------------------------- */
/*                           import things from mui                           */
/* -------------------------------------------------------------------------- */

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { OptionUnstyled } from '@mui/base';

/* -------------------------------------------------------------------------- */
/*              import different custom component from chatPages              */
/* -------------------------------------------------------------------------- */
import CreatePostComponent from '../pages/channelPages/chatPage/CreatePostComponent'

/* -------------------------------------------------------------------------- */
/*                             import from context                            */
/* -------------------------------------------------------------------------- */

import {actionTypes,useStateValue} from '../contexts'
import {useDeletePost,useBlockUser,useUnBlockUser,useUpdatePost} from '../api'

/* -------------------------------------------------------------------------- */
/*                     import things from react router dom                    */
/* -------------------------------------------------------------------------- */
import { useNavigate} from 'react-router-dom';


const ITEM_HEIGHT = 48;



export default function ShowListComponent({options,userInfo,post,msg,msgChannelOwner}) {
  let nav=useNavigate() 
  const [{},dispatch]=useStateValue()
  const currentUser=JSON.parse(localStorage.getItem('currentUserInfo')).user_id
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  /* ---------------------- 1.1 different variable declare --------------------- */
   const channelId=post&&post.channelId._id

   const channelOwnerId=post&&post.channelId.channelOwner
   const postOwnerId=userInfo&&userInfo._id
   const postId=post&&post._id
   const msgOwnerId=msg&&msg.whoSendMsg._id
  

  /* ---------------------- 1.2 different mutate function --------------------- */
  const {mutate:deletePost}=useDeletePost()
  const {mutate:blockUser}=useBlockUser()
  const {mutate:unBlockUser}=useUnBlockUser() 
  /* ------------- 1.3 show different option based it's condition ------------- */
  const showOptions=(option)=>{
      if(option===actionTypes.BLOCKUSER){
        if(currentUser===((msgOwnerId)||(postOwnerId)))return 
        //we must put && not ||but fro developing purpose we put ||
        else if((channelOwnerId==currentUser)||(channelOwnerId!==postOwnerId)){
          return option
        }
        return ''
      }
      else if(option===(actionTypes.DELETEPOST||actionTypes.DELETEMESSAGE)){
        if ((currentUser==postOwnerId)|| (currentUser==channelOwnerId))return option 
        return  
      }
      else if (option===actionTypes.UPDATEPOST){
        if ((currentUser==postOwnerId)) return option 
        return 
      }
      else if (option===actionTypes.UNBLOCKUSER){
        return 
      }

      else if (option===actionTypes.DELETEMESSAGE){
        if ((currentUser==msgOwnerId)|| (currentUser==msgChannelOwner))return option 
        return  

      }

    
    return option
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
/*     console.log(`event.currentTarget=>${event.currentTarget}`)
 */  };

  /* --------------- 1.4 take action based on click different option -------------- */
  const handleClose = (option) => {    
    if(option===actionTypes.CREATENEWCHANNEL){
      nav(`/channel/createChannel`)
    }

    else if(option===actionTypes.CURRENTUSERPROFILE){
      nav(`/profile/${currentUser}`)
    }

    else if (option===actionTypes.MAINPAGE){
      nav('/')
    }

    /* actions related post */ 
    //1.post
    else if(option===actionTypes.DELETEPOST){
      const postOwner=postOwnerId
      const postId=post._id
      const msgId=msg&&msg._id
      deletePost({postOwner,postId,channelOwnerId,dispatch,msgId}) 
    }
 
    //2.user
    else if(option===actionTypes.BLOCKUSER){
      const userId=userInfo._id
      blockUser({userId,channelId,dispatch})
    }
    else if(option===actionTypes.UNBLOCKUSER){
      const userId=userInfo._id
      unBlockUser({userId,channelId,dispatch})
    }
    //3. E-mail
    else if (option===actionTypes.SEND_MAIL){
      const targetPersonId=postOwnerId
     nav(`/channel/sendEmail/${targetPersonId}`)    
    }
    setAnchorEl(null); 
  };

  return (
    <>
      <>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? 'long-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <><MoreVertIcon /></>
          
        </IconButton>
      </>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((option) => (
          (showOptions(option)&&(
            <MenuItem key={option+"akjsdfqiwnvvbq108fhoa)"} selected={option === 'Pyxis'} onClick={()=>handleClose(option)}>
              {option}         
            </MenuItem>
          ))
        
        ))}
      </Menu>
    </>
  );
}
