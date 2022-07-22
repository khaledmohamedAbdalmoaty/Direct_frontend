import React from 'react';
import ReactDOM from 'react-dom';


import App from './App';
import "bootstrap/dist/css/bootstrap.min.css"
import reducer, { initialState } from './contexts/reducer';
import {StateProvider} from './contexts/StateProvider'


ReactDOM.render(
  <React.StrictMode>
  <StateProvider initialState={initialState} reducer={reducer} >
    <App />
  </StateProvider>
 </React.StrictMode>,
  document.getElementById('root')
);

