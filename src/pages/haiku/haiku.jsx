import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal'
import {BsShareFill} from 'react-icons/bs'
import { Fab } from '@material-ui/core';
import {GrFacebookOption} from 'react-icons/gr'
import {AiOutlineTwitter, AiOutlineMail} from 'react-icons/ai'
import {FaLinkedin, FaEnvelope} from 'react-icons/fa'
import {RiErrorWarningLine} from 'react-icons/ri'

import './css/haiku.css'

const Haiku = () => {
    const [showModal, setShowModal] = useState(false)
    return ( 
        <div className="haiku">
            <div className="haiku-header">
                <img src="../../assets/logo.png" alt="logo" className='header-logo' />
                <button className="pull-right btn-share">
                    <BsShareFill/> <span className="share" onClick={()=>setShowModal(true)}>SHARE</span>
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

            <Modal style={{marginTop:'70px'}} size="xl" show={showModal}>
                  <div className="haiku-modal">
                    <div className="memorialize-modal-header text-center">Share your work</div>
                    <div className="publish-form-group text-center">
                        <input 
                            type="text" 
                            className="published-inpt" 
                            // value={`${appBaseUrl}/haiku/${savedHaik._id}`} 
                            // ref={inptRef}
                        />
                        <button className="btn-copy-link"> Copy </button>
                    </div>

                    <div className="social-links text-center">
                   
                        <span className="fabs">
                        <Fab style={{backgroundColor:'#0077B5', color:'white', height:'40px', width:'40px'}}>
                            <FaLinkedin size={20} />
                        </Fab>
                        </span>

                        <span className="fabs">
                        <Fab style={{backgroundColor:'#3B5998', color:'white',  height:'40px', width:'40px'}}>
                                <GrFacebookOption size={20} />
                        </Fab>
                        </span>

                        <span className="fabs">
                        <Fab style={{backgroundColor:'#55ACEE', color:'white', height:'40px', width:'40px'}}>
                            <AiOutlineTwitter size={20} />
                        </Fab>
                        </span>

                        <span className="fabs">
                        <Fab style={{backgroundColor:'#0971BD', color:'white', height:'40px', width:'40px'}}>
                            <FaEnvelope size={20} />
                        </Fab>
                        </span>

                    </div>

                    <div className="return text-center" onClick={()=>setShowModal(false)}>RETURN</div>

                  </div>

                  
            </Modal>
        </div>
     );
}
 
export default Haiku;