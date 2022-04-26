import React from 'react';
import Footer from '../../components/footer/footer'

import './css/notFound.css'

const NotFound = () => {
    return ( 
        <div className="notFound">
            <div className="haiku-header" id="notfoundHeader">
                <img src="../../assets/logo.png" alt="logo" className='header-logo' />
            </div>

            <div className="notFoundBox">
                <div className="status-code text-center">404</div>
                <div className="status-label text-center">Page not Found!</div>
                <div className="not-found-text text-center">
                    Looks like this page doesn’t exist.Please head to the homepage and try again.
                </div>
               <div className="text-center"> <button className="btn-not-found-create">Create a haiku</button></div>
            </div>
            <Footer/>
        </div>
     );
}
 
export default NotFound;