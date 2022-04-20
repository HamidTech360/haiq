import React, {useState, useRef} from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/landingPage/landing';
import CreateHaiku from './pages/createHaiku/create';
import ReviewHaiku from './pages/ReviewHaiku/review';
import Published from './pages/published/published';
import Haiku from './pages/haiku/haiku';

import UserContext from './context/userContext';

//styles
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'

function App() {
  
  const [data, setData] = useState({
    line1:'',
    line2:'',
    line3:'',
    image:'',
    imageUrl:''
  })

  const handleChange = (e)=>{
    const clone= {...data}
    clone[e.currentTarget.name] = e.currentTarget.value
    setData(clone)
    //console.log(data);
  }

  const handleImgSelection = (e)=>{
    e.preventDefault()
    let reader = new FileReader()
    let file = e.target.files[0]

    reader.onloadend= ()=>{
        const clone = {...data}
        clone['image']= file
        clone['imageUrl'] = reader.result
        setData(clone)
    }
    reader.readAsDataURL(file)
    console.log(data);
  }

  const handleModalImgSelection = (item)=>{
    const clone = {...data}
    clone['imageUrl'] = item.urls.raw
    clone['image'] = 'none'
    setData(clone)
    console.log(clone);
  }
  return ( 

          <UserContext.Provider value={data}>
          <BrowserRouter>
            <Routes>
              <Route path="/create" element={<CreateHaiku 
                                                handleModalImgSelection={handleModalImgSelection}
                                                handleChange={handleChange} 
                                                handleImgSelection={handleImgSelection} />}/>
              <Route path="/published" element={<Published/>}/>
              <Route path="/haiku" element={<Haiku/>}/>
              <Route path="/review" element={<ReviewHaiku/>}/>
              <Route path="/" element={<LandingPage/>}/>
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
     
  );
}

export default App;
