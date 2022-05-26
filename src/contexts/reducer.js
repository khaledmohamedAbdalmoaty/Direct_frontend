export const initialState = {
  /* user:null */
    user: {
        username:'khaled abdalmoaty',
        uid:'KlAKgoNUiiZfPOhJliWN2VsKpGl1'
      } 
};
  
export const actionTypes = {
    SET_USER: "SET_USER",
    UPLOAd_FILE:'UPLOAd_FILE',
    UPLOAd_IMAGE:'UPLOAd_IMAGE'
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
  

