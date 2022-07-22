import * as React from 'react';
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
import MoreVertIcon from '@mui/icons-material/MoreVert';


import './ChatHeader.css'

/* -------------------------------------------------------------------------- */
/*                              custom component                              */
/* -------------------------------------------------------------------------- */
import UploadImageComponent from './UploadImageComponent'
/* import ShowListComponent from './ShowListComponent'
 */
import CreatePostComponent from './CreatePostComponent'
import ShowSidebarInSmallScreen from '../sidebarPage/ShowSidebarInSmallScreen'


/* -------------------------------------------------------------------------- */
/*                     import things from react router dom                    */
/* -------------------------------------------------------------------------- */
import { useNavigate} from 'react-router-dom';

/* -------------------------------------------------------------------------- */
/*                             import form context                            */
/* -------------------------------------------------------------------------- */
import { actionTypes,useStateValue} from '../../../contexts'


import {useUnSubscribe,useDeleteChannel} from '../../../api'

/* -------------------------------------------------------------------------- */
/*                            chat header component                           */
/* -------------------------------------------------------------------------- */

const settings = [actionTypes.DELETECHANNEL,actionTypes.MAINPAGE,actionTypes.CHANGECHANNELPRIORITYNUMBER,actionTypes.PROFILE,actionTypes.UNSUBSCRIBE];

const ChatHeaderComponent2 = ({channelName,channelId,channelOwner,canMakePost,postOnly,isSubScribe}) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const nav=useNavigate()
  const [{user},dispatch]=useStateValue()
  const currentUser=JSON.parse(localStorage.getItem('currentUserInfo')).user_id
  const {mutate}=useUnSubscribe()
  const {mutate:deleteChannel}=useDeleteChannel()


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (setting) => {
    setAnchorElNav(null);
  }
  

  const handleCloseUserMenu = (setting) => {
    if(setting === actionTypes.MAINPAGE){
      return nav(`/`)
    }
    if (setting === actionTypes.CHANGECHANNELPRIORITYNUMBER){
      return nav(`/channel/setPriority/${channelId}/${channelName}`)
    }
    if(setting===actionTypes.PROFILE){
      return nav(`/profile/${channelOwner}`)
    }
    else if (setting===actionTypes.UNSUBSCRIBE){
      const userId=currentUser
      mutate({userId,channelId,dispatch})
    }
    else if (setting===actionTypes.DELETECHANNEL){
      deleteChannel({channelId})
    }
    setAnchorElUser(null)
 
  };
 

  return (
    <AppBar  position="sticky" sx={{ width: 1}}>
    <Container/*  maxWidth="xl" */ >
      <Toolbar disableGutters>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
        >
         {channelName}
        </Typography>

        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
          >
          {/*  here we put thing in menu of small screen  */}
          <MenuItem>
          {((channelOwner==currentUser)||(canMakePost&&isSubScribe))&&<CreatePostComponent/>} 
           {postOnly?'':(isSubScribe||(channelOwner==currentUser))&&(<UploadImageComponent/>)}

            <ShowSidebarInSmallScreen/>
          </MenuItem>
           
          </Menu>
        </Box>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
        >
          {channelName}
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
           {/*  here we put component in laptop screen  */}
           {((channelOwner==currentUser)||(canMakePost&&isSubScribe))&&<CreatePostComponent/>} 
           {postOnly?'':(isSubScribe||(channelOwner==currentUser))&&(<UploadImageComponent/>)}

        </Box>

        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
             <MoreVertIcon/>
            {/*   <Avatar alt="Remy Sharp" src={} /> */}
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
            {
              settings.map((setting,index)=>{
                if((setting===actionTypes.DELETECHANNEL)&&(currentUser!==channelOwner))return 
                else if((setting===actionTypes.UNSUBSCRIBE)&&((currentUser==channelOwner)||(!isSubScribe)))return 
                else {
                  return (
                    <MenuItem key={setting+index} onClick={()=>handleCloseUserMenu(setting)}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  )
                }

              })
            }
          </Menu>
        </Box>
      </Toolbar>
    </Container>
  </AppBar>
  );
};
export default ChatHeaderComponent2;


