import React from 'react';
import { Link } from 'react-router-dom';

//styles
import '../css/hero.css'

const Hero = () => {

    const images = ['h2.jpg', 'h1.jpg', 'h3.jpg']
    const randomNo = Math.round(Math.random() *2)
    console.log(randomNo);

    return ( 
        <div className="banner">
           <div className="banner-bg" style={{backgroundImage:`url(../../../../../assets/${images[randomNo]})`}}>
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