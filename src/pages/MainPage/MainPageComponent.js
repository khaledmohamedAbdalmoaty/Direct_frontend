import React from 'react';
import { ThemeProvider } from "@mui/material";
import {theme} from './theme'
import Sidebar from '../channelPages/sidebarPage/Sidebar'
/* -------------------------------------------------------------------------- */
/*                                     --                                     */
/* -------------------------------------------------------------------------- */
import Feed from './Feed'
import {Box,Stack} from "@mui/material"
import { Navbar } from './Navbar';
import  ResponsiveAppBar from './Navbar_2'
const MainPageComponent = () => {
  return (
    <ThemeProvider theme={theme}>
     <Box>
     {/*  <Navbar/> */}
      <ResponsiveAppBar/>
      <Stack 
      direction="row"
      spacing={2}
      justifyContent="space-between"
      >
        <Box  flex={1} p={2}  sx={  {display: { xs: 'none', md: 'block' } } }  position="sticky" > 
          <Sidebar/> 
        </Box> 
        <Feed/>
      {/*   <Sidebar/> */}
      </Stack>
    </Box>
    </ThemeProvider>
  )
}

export default MainPageComponent