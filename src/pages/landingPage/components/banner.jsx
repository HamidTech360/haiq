import React from 'react';
import { Link } from 'react-router-dom';

//styles
import '../css/banner.css'

const Banner = () => {
    return ( 
        <div className="banner">
           <div className="banner-bg">
                <div className="logo-box">
                    <img src="../../../assets/logo.png" className="logo" alt="haiku logo" />
                </div>
                <div className="banner-text text-center">elegant expression</div>
                <div className="text-center">
                    <Link to="create">
                        <button className="btn-create-haik">Create a Haiku</button>
                    </Link>
                </div>
                
            </div> 
        </div>
     );
}
 
export default Banner;