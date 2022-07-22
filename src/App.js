/* -------------------------------------------------------------------------- */
/*                  import things related to react technology                 */
/* -------------------------------------------------------------------------- */
import React,{useEffect,useState} from 'react'

/* -------------------------------------------------------------------------- */
/*            import things related to global variable and context            */
/* -------------------------------------------------------------------------- */
import {useStateValue,actionTypes,initialState} from './contexts'


/* -------------------------------------------------------------------------- */
/*                      import things related to channel                      */
/* -------------------------------------------------------------------------- */
import ChannelMainComponent from './pages/channelPages/ChannelMainComponent'


/* -------------------------------------------------------------------------- */
/*        import things related to auth,login ,regsiter ,resetPassword        */
/* -------------------------------------------------------------------------- */
import './common/login.css'
import Login from "./pages/login/Login" ;
import Register from "./pages/register/Register";
import ResetPassword from "./pages/resetPassword/ResetPassword"; 
import UserProfile from './pages/profilePages/UserProfile'
/* -------------------------------------------------------------------------- */
/*                            import from MainPage                            */
/* -------------------------------------------------------------------------- */

import MainPageComponent from './pages/MainPage'

/* -------------------------------------------------------------------------- */
/*                import things related to react router dom v6                */
/* -------------------------------------------------------------------------- */
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

/* -------------------------------------------------------------------------- */
/*                    import things of react query libarary                   */
/* -------------------------------------------------------------------------- */
import {
  QueryClient,
  QueryClientProvider,
 
} from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
const queryClient = new QueryClient();




function App() {
  
  const [{user},dispatch] = useStateValue();
  let currentUser=JSON.parse(localStorage.getItem('currentUserInfo'))
  currentUser= currentUser!==null ? currentUser:initialState.user
  
  useEffect(()=>{
   /*  dispatch function */
    dispatch({
      type:actionTypes.SET_USER,
      user:currentUser
    })

   
},[])
 

  return (
      <Router>
          {!currentUser.user_id ? (
          <Routes>         
              <Route path="/register" element={<Register/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/" element={<Login/>} />    
              <Route path="/restpassword" element={<ResetPassword/>}/> 
        
          </Routes>

        ) : (
        
          <>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="/profile/:userId" element={<UserProfile/>}/> 
                <Route path="/" element={<MainPageComponent/>}/> 
                <Route path="/MainPage" element={<MainPageComponent/>}/> 
                <Route path="/restpassword" element={<ResetPassword/>}/> 
                <Route path="/channel/*" element={<ChannelMainComponent/>}/>
                <Route path="/register" element={<Register/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/logout" element={<Login/>} />
              </Routes>
           {/*  <ReactQueryDevtools initialIsOpen /> */}
          </QueryClientProvider> 

           </>
          )}      
      </Router>
     
  );
}


export default App;
