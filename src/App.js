import React, {useState, useRef} from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/landingPage/landing';
import CreateHaiku from './pages/createHaiku/create';
import ReviewHaiku from './pages/ReviewHaiku/review';
import Published from './pages/published/published';
import Haiku from './pages/haiku/haiku';
import Payment from './pages/payment/payment'
import NotFound from './pages/notFound/notFound';

import UserContext from './context/userContext';

//styles
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'

function App() {
  const [mode, setMode] = useState(false)
  const [data, setData] = useState({
    formData:{
      line1:'',
      line2:'',
      line3:'',
      image:'',
      imageUrl:''
    },
    savedHaik:{}
  })

  const SwitchMode = ()=>{
    setMode(!mode)
  }

  const handleChange = (e)=>{
    const clone= {...data}
    clone.formData[e.currentTarget.name] = e.currentTarget.value
    setData(clone)
    console.log(data);
  }

  const handleImgSelection = (e)=>{
    e.preventDefault()
    let reader = new FileReader()
    let file = e.target.files[0]

    reader.onloadend= ()=>{
        const clone = {...data}
        clone.formData['image']= file
        clone.formData['imageUrl'] = reader.result
        setData(clone)
    }
    reader.readAsDataURL(file)
    console.log(data.formData);
  }

  const handleModalImgSelection = (item)=>{
    const clone = {...data}
    clone.formData['imageUrl'] = item.urls.raw
    clone.formData['image'] = 'none'
    setData(clone)
    console.log(clone);
  }
  const setSavedHaik = (object)=>{
    const clone = {...data}
    clone.savedHaik = object
    setData(clone)
  }
  return ( 

          <UserContext.Provider value={data}>
          <BrowserRouter>
            <Routes>
              <Route path="/create" element={<CreateHaiku 
                                                mode={mode}
                                                SwitchMode={SwitchMode}
                                                handleModalImgSelection={handleModalImgSelection}
                                                handleChange={handleChange} 
                                                handleImgSelection={handleImgSelection} />}/>
              <Route path="/published" element={<Published/>}/>
              <Route path="/haiku" element={<Haiku/>}/>
              <Route path="/review" element={<ReviewHaiku 
                                                mode={mode}
                                                setSavedHaik={setSavedHaik}
                                                SwitchMode={SwitchMode}/>}/>
              <Route path="/pay" element={<Payment/>}/>
              <Route path="/notfound" element={<NotFound/>}/>
              <Route path="/" element={<LandingPage/>}/>
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
     
  );
}

export default App;
