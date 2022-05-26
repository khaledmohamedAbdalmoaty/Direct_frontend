/* -------------------------------------------------------------------------- */
/*                  import things related to react technology                 */
/* -------------------------------------------------------------------------- */
import React,{useEffect,useState} from 'react'

/* -------------------------------------------------------------------------- */
/*            import things related to global variable and context            */
/* -------------------------------------------------------------------------- */
import {AuthProvider} from './contexts/StateProvider'
import {useStateValue} from './contexts/StateProvider'


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
import Try from './Try'
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
  const [{ user }, dispatch] = useStateValue();

  return (
      <Router>
          {!user ? (
          <Routes>         
              <Route path="/register" element={<Register/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/" element={<Login/>} />  
          </Routes>

        ) : (
        
          <>
          <QueryClientProvider client={queryClient}>
            <Routes>
                    {/*    <PrivateRoute exact path="/profile" element={<Profile2/>} />
                  <PrivateRoute exact path="/" element={<Login/>} /> 
                <PrivateRoute path="/update-profile" element={UpdateProfile} /> 
              <Route path="/logout" element={<Logout/>} />  */}
                <Route path="/" element={<h1>you are in the mainPage</h1>}/> 
                <Route path="/restpassword" element={<ResetPassword/>}/> 
                <Route path="/channel/*" element={<ChannelMainComponent/>}/>
                <Route path="/register" element={<Register/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/try" element={<Try/>} />  
                {/*  <Route path="/login" element={Login} />
                  <Route path="/forgot-password" element={ForgotPassword} /> */}
            </Routes>
            <ReactQueryDevtools initialIsOpen />
          </QueryClientProvider> 

           </>
          )}      
      </Router>
     
  );
}


export default App;
