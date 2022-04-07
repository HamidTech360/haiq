import React from 'react';
import { Link } from 'react-router-dom';

//style
import './footer.css'

const Footer = () => {
    return ( 
        <div className="footer">
           <div className="footer-flex">
                <div>
                    <img src="../../assets/logo.png" alt="logo" className="footer-logo" />
                </div>
                <div className="footer-text">
                    <Link to="create" style={{textDecoration:'none'}}><span className='footer-text-item'>Create a Haiku</span></Link>
                    <span className="footer-text-item ">
                        <img src="../../assets/elipse.png" alt="elipse" /> 
                     </span>
                    <span className="footer-text-item">Contact Us</span>
                    <span className="pull-right copy-right hideOnMobile">&copy;2022 modern Haiq</span>
                </div>

               

           </div>
           <div className="hideOnDesktop copy-right-mobile text-center">
                <span className=" copy-right">&copy;202234 modern Haiq</span>
            </div>
        </div>
     );
}
 
export default Footer;