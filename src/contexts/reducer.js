export const initialState = {
  /* user:null */
    user: {
        username:null,
        uid:null,
        user_id:null
      },
      GlobalAlert:{
        msg:null,
        state:false,
        chatState:'',
        sendEmailComponent:'',
        createChannelComponent:'',
        changeChannelPriorityNumber:''  
      }
};


export const actionTypes = {
 /*  related to login and logout */
    USERLOGIN:'login',
    USERLOGOUT:'logout',
    SET_USER: "SET_USER",
    /* upload things  */
    UPLOAd_FILE:'UPLOAd_FILE',
    UPLOAd_IMAGE:'UPLOAd_IMAGE',
    CREATEPOST:'create Post',
    SHOWCHANNELS:'showChannels',
    CREATEPOSTTITLE:'write your post',
    UPLOADIMAGETITLE:'upload your image ',
    UPLOADIMAGETOOLTIP: 'upload an image',
    CREATENEWCHANNEL:"create new channel ",
    MAINPAGE:"Main Page",
    GetSideBarChannel:'channels',
  /*   profile page  */
    EditEducationCard:"Edit education card ",
    CURRENTUSERPROFILE:'Your profile',
    PROFILE:'Profile',
    CHANGECHANNELPRIORITYNUMBER:'change priority Number',
    WORKTITLE:'change your profile title ',
    ABOUT:'change  ABOUT section',
    ADDEDUCATIONCARD:'Add education school , university ',
    ADDPROJECTCARD:'Add project you work own here',
    EDITPROJECTCARD:'Edit project',
    SKILLNAME:"add new  skill ",
    UPLOADUSERPHOTO:'uplaod profile picture',
    /* different alert  */
    SUCCESSALERT:'success alert',
    FAILEDALERT:'failed alert',
    RESETALERT:'reset alert',
    /* post component */
    DELETEPOST:'Delete post ',
    BLOCKUSER:'Block user',
    UNBLOCKUSER:'unblock user',
    UPDATEPOST:'update post',
    SEND_MAIL:'send email to user',
   /*  realted to channel */
   UNSUBSCRIBE:'unSubscribe',
   DELETECHANNEL:'delete channel',
   /* related to message  */
   DELETEMESSAGE:'delete message',
  /*  related to Email */
  DELETEEMAILPOST:'delete Email',
  DELETEEMAILREPLY:'delete Reply',
  EmailYouSend:'Email you Send',
  EmailSendToYou:'Email in your box ',
  /* real time stuff */
  getChannelConversation:'getChannelConversation',
  getUserChannel:'getUserChannel',
  getMainPagePosts:'getMainPagePosts',
  getPostById:'getPostById',
  getPostComments:'getPostComments',
  getSearchChannels:'getSearchChannels',
  getUserData:'getUserData',
 /*  Email real stuff */
  getAllEmails:'getAllEmails',
  getAllReply:'getAllReply',
 /*  getAllEmailsFromToUser:'getAllEmailsFromToUser',
  getAllEmailsYouSend:'getAllEmailsYouSend', */
  /* getEmailById:'getEmailById' */
};


const reducer = (state, action) => {  
    switch (action.type) {
      case actionTypes.SET_USER:
        initialState.user={
          username:action.user.username,
          uid:action.user.uid ,
          user_id:action.user.user_id
        }
        return {
          ...state,
          user: action.user
        };
      case actionTypes.SUCCESSALERT:
        return {
          ...state,
         GlobalAlert:action.GlobalAlert
        };
      case actionTypes.FAILEDALERT:
        return {
          ...state,
          GlobalAlert:action.GlobalAlert
        }
        case actionTypes.RESETALERT:
        return {
          ...state,
          GlobalAlert:{
            msg:null,
            state:false,
            chatState:'',
            sendEmailComponent:'',
            createChannelComponent:'' }
        }
        
      default:
        return {...state}
    }
};
  
 export default reducer; 
  

