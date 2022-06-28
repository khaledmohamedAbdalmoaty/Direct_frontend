import * as React from 'react';

/* -------------------------------------------------------------------------- */
/*                           import things from mui                           */
/* -------------------------------------------------------------------------- */

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { OptionUnstyled } from '@mui/base';

/* -------------------------------------------------------------------------- */
/*              import different custom component from chatPages              */
/* -------------------------------------------------------------------------- */
import CreatePostComponent from './chatPage/CreatePostComponent'

/* -------------------------------------------------------------------------- */
/*                             import from context                            */
/* -------------------------------------------------------------------------- */

import {actionTypes} from '../../contexts'

/* -------------------------------------------------------------------------- */
/*                     import things from react router dom                    */
/* -------------------------------------------------------------------------- */
import { useNavigate} from 'react-router-dom';


const ITEM_HEIGHT = 48;

export default function ShowListComponent({options}) {
  let nav=useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(`event.currentTarget=>${event.currentTarget}`)
  };
  const handleClose = (option) => {    
    if(option===actionTypes.CREATENEWCHANNEL){
      nav(`/channel/createChannel`)
    }
   

    setAnchorEl(null); 
  };

  return (
    <>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
         <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option+Date.now()} selected={option === 'Pyxis'} onClick={()=>handleClose(option)}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
