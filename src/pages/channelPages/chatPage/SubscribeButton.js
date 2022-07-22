import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { purple } from '@mui/material/colors';

import {useUnSubscribe, useSubscribe} from '../../../api'
import {useStateValue} from '../../../contexts'


/* 
const BootstrapButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 12px',
  border: '1px solid',
  lineHeight: 1.5,
  backgroundColor: '#0063cc',
  borderColor: '#0063cc',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:hover': {
    backgroundColor: '#0069d9',
    borderColor: '#0062cc',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#0062cc',
    borderColor: '#005cbf',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
}); */

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: "#005cbf",
  '&:hover': {
    backgroundColor:"#1976d2",
  },
}));

export default function SubscribeButton({channelId}) {

    const {mutate}=useSubscribe()
    const[{user},dispatch]=useStateValue()
    const handleSubscribe=()=>{
        const userId=user.user_id
        mutate({userId,channelId,dispatch})
    }
    
  return (
    <Stack spacing={0}  direction="row">
       <ColorButton sx={{margin:'auto',width:"30%",marginBottom:"10px"}} onClick={()=>handleSubscribe()} variant="contained">Subscribe</ColorButton>
  
   {/*  <BootstrapButton variant="contained" >
        Subscribe
    </BootstrapButton> */}
    </Stack>
  );
}
