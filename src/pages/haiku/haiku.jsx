import React from 'react';
import Modal from 'react-bootstrap/Modal'
import {BsShareFill} from 'react-icons/bs'

import './css/haiku.css'

const Haiku = () => {
    return ( 
        <div className="haiku">
            <div className="haiku-header">
                <img src="../../assets/logo.png" alt="logo" className='header-logo' />
                <button className="pull-right btn-share">
                    <BsShareFill/> <span className="share">SHARE</span>
                </button>
            </div>

            <div className="haiku-board">
                <img src="../../assets/banner1.png" alt="haiku" className="haiku-image" />
                <div className="haiku-text text-center">
                    <div className="line1-haiku">Over the wintry Forest, </div>
                    <div className="line2-haiku">wind howl in rage with no</div>
                    <div className="line3-haiku">leaves to blow</div>
                    <div className="pull-right"> . Author</div>
                </div>
            </div>

            <Modal size="xl" show={true}>
                  <div className="haiku-modal">
                    <div className="memorialize-modal-header text-center">Share your work</div>
                  </div>
            </Modal>
        </div>
     );
}
 
export default Haiku;