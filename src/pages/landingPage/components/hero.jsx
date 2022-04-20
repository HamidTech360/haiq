import React from 'react';
import { Link } from 'react-router-dom';

//styles
import '../css/hero.css'

const Hero = () => {

    const images = ['banner1.png', 'banner1b.png', 'banner1c.png']
    const randomNo = Math.round(Math.random() *2)
    console.log(randomNo);

    return ( 
        <div className="banner">
           <div className="banner-bg" style={{backgroundImage:`url(../../../../../assets/${images[0]})`}}>
                <div className="logo-box">
                    <img src="../../../assets/logo.png" className="logo" alt="haiku logo" />
                </div>
                <div className="banner-text text-center">elegant expression</div>
                <div className="text-center">
                    <Link to="create">
                        <button className="btn-create-haik">Create a HAIQ</button>
                    </Link>
                </div>
                
            </div> 
        </div>
     );
}
 
export default Hero;