import React from 'react'
import {Menu,MenuItem,Avatar,InputBase, Box,AppBar,Toolbar,styled, Typography,Badge} from '@mui/material'
import {Pets,Mail,Notifications} from '@mui/icons-material'

const StyledToolbar=styled(Toolbar)({
  display:"flex",
  justifyContent:"space-between"
});


const Search=styled("div")(({theme})=>({
  backgroundColor:"white",
  padding:"0 10px",
  borderRadius:theme.shape.borderRadius,
  width:"40%"

}))

const Icons=styled(Box)(({theme})=>({
  display:"none",
  gap:"20px",
  alignItems:"center",
  [theme.breakpoints.up("sm")]:{
    display:"flex"
  }
 
}))

const UserBox=styled(Box)(({theme})=>({
  display:"flex",
   gap:"10px",
  alignItems:"center",
  [theme.breakpoints.up("sm")]:{
    display:"none"
  }
 
}))


export const Navbar = () => {
  const [open ,setOpen]=React.useState(false)
  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Typography variant="h6" sx={{display:{xs:"none",sm:"block"}}}>
          Direct
        </Typography>
        <Pets sx={{display:{xs:"block",sm:"none"}}} onClick={()=>console.log("what")}/>
        {'channel'}
        <Icons>
          <Badge badgeContent={4} color="error">
            <Mail/>
          </Badge>
          <Badge badgeContent={4} color="error">
            <Notifications/>
          </Badge>
          <Avatar onClick={(e)=>setOpen(true)} sx={{width:"40px",height:"40px"}}src='https://media.gettyimages.com/photos/studio-waist-up-portrait-of-a-beautiful-businesswoman-with-crossed-picture-id1180926773?s=612x612'/>
        </Icons> 
       <UserBox onClick={(e)=>{setOpen(true)}}>
       <Avatar 
       sx={{width:"30px",height:"30px"}}
       src='https://media.gettyimages.com/photos/studio-waist-up-portrait-of-a-beautiful-businesswoman-with-crossed-picture-id1180926773?s=612x612'/>
        <Typography varient="span">khaled abdalmoaty </Typography>
       </UserBox >
      
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={e=>setOpen(false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem >Profile</MenuItem>
        <MenuItem >My account</MenuItem>
        <MenuItem >Logout</MenuItem>
      </Menu>
    </AppBar>
  )
}
