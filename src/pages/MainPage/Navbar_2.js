import  React,{useState,useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

/* -------------------------------------------------------------------------- */
/*                           import custom component                          */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                        import form react router dom                        */
/* -------------------------------------------------------------------------- */
import { useNavigate} from 'react-router-dom';

/* -------------------------------------------------------------------------- */
/*                        import action types from api                        */
/* -------------------------------------------------------------------------- */
import {actionTypes,useStateValue} from '../../contexts'
import {Alert} from '../../common'
import {useGetUserData} from '../../api'




const pages = [actionTypes.GetSideBarChannel];
const settings = [actionTypes.CURRENTUSERPROFILE,actionTypes.USERLOGOUT,actionTypes.GetSideBarChannel];


const Navbar2 = () => {
  const nav=useNavigate()
  const [{user,GlobalAlert},dispatch]=useStateValue()
  const currentUserId=JSON.parse(localStorage.getItem('currentUserInfo')).user_id
  const {data:userData,isLoading}=useGetUserData(currentUserId)
  /* show alert in mainPage */
  const [showAlert,setShowAlert]=useState(false)
  useEffect(()=>{
    setShowAlert(true)
    setTimeout(()=>{
      setShowAlert(false)
      dispatch({
        type:actionTypes.RESETALERT
      })
    },1500)
  },[GlobalAlert.chatState])

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    //here we add the action of profile and other things 
    nav(`/channel/showChannelInSmallScreen`)
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (setting) => {
    if(setting===actionTypes.CURRENTUSERPROFILE){
      nav(`/profile/${userData&&userData._id}`)
    }
    else if (setting===actionTypes.USERLOGOUT){
      localStorage.clear()
      nav(`/login`)
    }
    else if (setting===actionTypes.GetSideBarChannel){
      nav(`/channel/allEmails`)
    }
    setAnchorElUser(null);
  };


  return (
    <>
    <AppBar/*  position="static" */ position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              textDecoration: 'none',
            }}
          >
            Direct
          </Typography>

          <Typography
            variant="h5"
            noWrap
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Direct
          </Typography> 
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Typography varient="span" sx={{ m:1,color:'White'}}> {userData&&userData.username} </Typography>
                <Avatar alt="image?!" src={userData&&userData.profilePicture} imgProps={{crossOrigin:"anonymous" }} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={()=>handleCloseUserMenu(setting)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
        {showAlert&&GlobalAlert.msg&&<Alert message={GlobalAlert}/>}

      </Container>
    </AppBar>
    </>
  );
};
export default Navbar2;
