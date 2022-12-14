import  React ,{useState} from 'react';

/* -------------------------------------------------------------------------- */
/*                      import from materila ui version 5                     */
/* -------------------------------------------------------------------------- */
import {InputBase,Box,AppBar ,styled, alpha,IconButton } from '@mui/material'
import {Search as SearchIcon} from '@mui/icons-material'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.30),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color:'black'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'black',
  fontSize:"18px",
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
})); 

/* -------------------------------------------------------------------------- */
/*                        import from react router dom                        */
/* -------------------------------------------------------------------------- */
import { useNavigate } from 'react-router-dom';

export default function SearchComponent() {
  const [searchStatment,setSearchStatment]=useState()
  const nav=useNavigate()
  const handleSubmit=(e)=>{
    e.preventDefault()
    nav(`/channel/showChannelSearchResult?search=${searchStatment}`)
  }
  return (
    <IconButton>
    <Box>
    
      <AppBar position="static"   sx={{backgroundColor:'#f7f0f0'}}> 
      <form onSubmit={handleSubmit}>
            <Search sx={{backgroundColor:'#f7f0f0'}} >
                <SearchIconWrapper>
                <SearchIcon />
                </SearchIconWrapper>
                
                <StyledInputBase
                onChange={(e)=>setSearchStatment(e.target.value)}
                placeholder="Search???"
                inputProps={{ 'aria-label': 'search' }}
               
                />
              
            </Search>
      </form>
      </AppBar> 
      
    </Box>
  </IconButton>
  );
}