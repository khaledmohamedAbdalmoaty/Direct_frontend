import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

/* const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
 */
/* -------------------------------------------------------------------------- */
/*                         import from context folder                         */
/* -------------------------------------------------------------------------- */
import {actionTypes, useStateValue} from '../../contexts'


/* -------------------------------------------------------------------------- */
/*                        show alert message component                        */
/* -------------------------------------------------------------------------- */

export default function ShowAlertMessage(state) {
  const [{Alert},dispatch]=useStateValue()
  const [open, setOpen] = React.useState(false);
  setOpen(state)
 

 /*  const handleClick = () => {
    setOpen(true);
  }; */

  const handleClose = () => {
    setOpen(false);
  };

  return (
    
    <Stack spacing={2} sx={{ width: '100%' }}>
    { Alert.state? ( <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {Alert.msg}
        </Alert>
      </Snackbar>
     ) :
     ( <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} sx={{ width: '100%' }} severity="warning">{Alert.msg}</Alert>
      </Snackbar>
     
    )
    }
       
       {/* resent alert part  */}
     {/*   {
          dispatch({
            type: actionTypes.RESETALERT
          })
                   
      } */}
    </Stack>
  );
}
