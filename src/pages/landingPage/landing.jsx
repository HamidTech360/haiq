import React from 'react'

//components
import Banner from './components/banner'
import Banner2 from './components/banner2'
import Banner3 from './components/banner3'
import Banner4 from './components/banner4'
import Footer from '../../components/footer/footer'

//styles
import './css/landing.css'

const LandingPage = ()=>{
    return(
        <div className="landing-page">
            <Banner/>
            <Banner2/>
            <Banner3/>
            <Banner4/>
            <Footer/>
        </div>
    )
}

export default LandingPage