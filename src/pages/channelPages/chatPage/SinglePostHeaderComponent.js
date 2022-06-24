/* -------------------------------------------------------------------------- */
/*                  import things related to react technology                 */
/* -------------------------------------------------------------------------- */
import React from 'react'

/* -------------------------------------------------------------------------- */
/*                     import things related to css files                     */
/* -------------------------------------------------------------------------- */
import './Chat.css'

/* -------------------------------------------------------------------------- */
/*                 import things related to custom components                 */
/* -------------------------------------------------------------------------- */
import SearchComponent from '../SearchComponent'
import UploadImageComponent from './UploadImageComponent'
import ShowListComponent from '../ShowListComponent'
import CreatePostComponent from './CreatePostComponent'
/* -------------------------------------------------------------------------- */
/*                       import things related to mui.v5                      */
/* -------------------------------------------------------------------------- */
import {Tooltip,Avatar,TextField}  from '@mui/material'

/* -------------------------------------------------------------------------- */
/*                  import things related to global variable                  */
/* -------------------------------------------------------------------------- */
import {actionTypes} from '../../../contexts'


const SinglePostHeaderComponent = ({channelName,channelImageLocation}) => {
  return (

      <div className="chat__header">
        {/*   <Avatar srcSet={channelImageLocation}/>  */}
          <div className="chat__headerInfo">
            <h3>{channelName}</h3>
          </div>  
          <div className="chat__headerRight">
            <ShowListComponent options={[actionTypes.CREATEPOST,actionTypes.SHOWCHANNELS]}/>
          </div>
      </div>
  
  )
}

export default   SinglePostHeaderComponent