import React from 'react';
import { Link } from 'react-router-dom';

//style
import './footer.css'

const Footer = () => {
    const redirect = ()=>{
        window.location = 'mailto:help@modernhaiq.com'
    }
    return ( 
        <div className="footer">
           <div className="footer-flex row">
                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                    <img src="../../assets/logo.png" alt="logo" className="footer-logo" />
                </div>
                <div className="footer-text col-lg-9 col-md-9 col-sm-9 col-xs-9">
                    <Link to="create" style={{textDecoration:'none'}}><span className='footer-text-item'>Create a Haiku</span></Link>
                    <span className="footer-text-item ">
                        <img src="../../assets/elipse.png" alt="elipse" /> 
                     </span>
                    <span className="footer-text-item" onClick={()=>redirect()}>Contact us</span>
                    <span className="pull-right copy-right hideOnMobile">&copy;2022 Modern Haiq</span>
                </div>

           </div>

           <div className="hideOnDesktop copy-right-mobile ">
                <span className=" copy-right pull-right">&copy;2022 Modern Haiq</span>
            </div>
        </div>
     );
}
 
export default Footer;