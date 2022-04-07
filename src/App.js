import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/landingPage/landing';
import CreateHaiku from './pages/createHaiku/create';

//styles
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'

function App() {
  return ( 
      <BrowserRouter>
        <Routes>
          <Route path="/create" element={<CreateHaiku/>}/>
          <Route path="/" element={<LandingPage/>}/>
        </Routes>
      </BrowserRouter>
   
  );
}

export default App;
