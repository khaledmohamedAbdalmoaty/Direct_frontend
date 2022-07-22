import React from 'react'

/* -------------------------------------------------------------------------- */
/*                           import custom component                          */
/* -------------------------------------------------------------------------- */
import MuiltyEmailComponent from './MuiltyEmailComponent'
import {actionTypes} from '../../../contexts'

const AllEmilYouSend = () => {
  return (
    <MuiltyEmailComponent switchOptions={actionTypes.EmailYouSend}/>
  )
}

export default AllEmilYouSend