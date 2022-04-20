import React from 'react'

//components
import Hero from '././components/hero'
import Definition from './components/definition'
import HowItWorks from './components/howItWorks'
import Enrich from './components/enrich'
import Footer from '../../components/footer/footer'

//styles
import './css/landing.css'

const LandingPage = ()=>{
    return(
        <div className="landing-page">
            <Hero/>
            <Definition/>
            <HowItWorks/>
            <Enrich/>
            <Footer/>
        </div>
    )
}

export default LandingPage