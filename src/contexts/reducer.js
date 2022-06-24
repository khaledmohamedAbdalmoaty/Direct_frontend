//62b09562c1705d12a59d2c64
export const initialState = {
  /* user:null */
    user: {
        username:'khaled in global variable',
        uid:"62b2a9b7a4c8897d3cf8400e",
        user_id:"62b2a9b7a4c8897d3cf8400e"
      } 
};
  
export const actionTypes = {
    SET_USER: "SET_USER",
    UPLOAd_FILE:'UPLOAd_FILE',
    UPLOAd_IMAGE:'UPLOAd_IMAGE',
    CREATEPOST:'create Post',
    SHOWCHANNELS:'showChannels',
    CREATEPOSTTITLE:'write your post',
    UPLOADIMAGETITLE:'upload your image ',
    UPLOADIMAGETOOLTIP: 'upload an image',
    CREATENEWCHANNEL:"create new channel "
};
  
const reducer = (state, action) => {
    /* console.log(action); */
  
    switch (action.type) {
      case actionTypes.SET_USER:
        return {
          ...state,
          user: action.user,
        };
      default:
        return state;
    }
};
  
 export default reducer; 
  

