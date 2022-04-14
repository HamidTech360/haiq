import React, {useState} from 'react';
import { Fab } from '@material-ui/core';
import {GrFacebookOption} from 'react-icons/gr'
import {AiOutlineTwitter, AiOutlineMail} from 'react-icons/ai'
import {FaLinkedin, FaEnvelope} from 'react-icons/fa'
import {RiErrorWarningLine} from 'react-icons/ri'
import Modal from 'react-bootstrap/Modal'

//styles
import './css/published.css'

const Published = () => {
    const [memorializeModal, setMemorializeModal] = useState(true)
    return ( 
        <div className="published">
            <div className="published-pg-header">
                <img src="../../assets/logo.png" alt="logo" className="header-logo" />
            </div>
            <div className="published-body text-center">
                <div className="published-header">Congratulations! Your Haiq Shines</div>
                <div className="share-work">Share your work</div>

                <div className="publish-form-group">
                    <input type="text" className="published-inpt" />
                    <button className="btn-copy-link">Copy Link</button>
                </div>

                <div className="social-links">
                   
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

                <div className="days-box text-center">
                    <div className="time">
                        <div>16</div>
                        <div>DAYS</div>
                    </div>

                    <div className="time">
                        <div>20</div>
                        <div>HOURS</div>
                    </div>

                    <div className="time">
                        <div>26</div>
                        <div>MINUTES</div>
                    </div>

                    <div className="time">
                        <div>10</div>
                        <div>SECONDS</div>
                    </div>
                </div>

                <div className="published-btns">
                    <button className="btn-memorialize">Memorialize Forever <RiErrorWarningLine/> </button>
                    <button className="btn-view-work">View Your Work</button>
                </div>

            </div> 

            <Modal show={memorializeModal}>
                <div className="memorialize-modal">
                    <div className="memorialize-modal-header text-center">Memorialize your craft</div>
                    <div className="memorialize-modal-text text-center">
                        Commemorate your work. rise to the next level and show the world your creation. 
                    </div>
                    <div className="memorialize-modal-text text-center">
                        Make it last exquisitely forever. 
                    </div>

                    <div className="cost-box text-center">
                        <span className="cost-label">COST: </span>
                        <span className="cost-price">$100</span>
                    </div>

                    <div className="memorialize-modal-btns">
                        <button className="btn-IWTMMH">I want to memorialize my Haiq</button>
                        <button className="btn-memorialize-cancel">Cancel</button>
                    </div>
                </div>
            </Modal>
        </div>
     );
}
 
export default Published;