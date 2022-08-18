import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-snapshot';
import App from './App';
// import {ChakraProvider} from '@chakra-ui/react'

const rootElm = document.getElementById('root');
if(rootElm.hasChildNodes()){
  render(
    <App />   
 ,
  document.getElementById('root')
);
}else{
  ReactDOM.render(<App/>, rootElm)
}



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

