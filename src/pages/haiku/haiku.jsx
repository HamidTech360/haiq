import React, {useState, useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import {apiUrl, appBaseUrl} from '../../config/config.json'
import axios from 'axios'
import { useParams} from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import {BsShareFill} from 'react-icons/bs'
import { Fab } from '@material-ui/core';
import {GrFacebookOption} from 'react-icons/gr'
import {AiOutlineTwitter, AiOutlineMail} from 'react-icons/ai'
import {FaLinkedin, FaEnvelope} from 'react-icons/fa'
import {RiErrorWarningLine} from 'react-icons/ri'
import {FacebookShareButton, LinkedinShareButton, TwitterShareButton, EmailShareButton} from 'react-share'

import './css/haiku.css'

const Haiku = (props) => {
   const inptRef = useRef()
   const {id:haikuId} = useParams()
   const navigate = useNavigate()
   const publishedUrl = `${appBaseUrl}/haiku/${haikuId}`
   const [data, setData] = useState({})
   const [showModal, setShowModal] = useState(false)
   const [copied, setCopied] = useState(false)
    useEffect(()=>{
       
        async function getHaiku (){
            try{
                const response = await axios.get(`${apiUrl}/haiku/${haikuId}`)
                console.log(response.data.data);
                setData(response.data.data)
            }catch(err){
                console.log(err.response?.data); 
                 navigate('/notfound')
            }
        }
        getHaiku()
        
    }, [])

    const Copy = ()=>{
        navigator.clipboard.writeText(inptRef.current.value)
        setCopied(true)
        
    }
    
    return ( 
        <div className="haiku" style={{backgroundImage:data.backgroundMode=="light"?"url(../../assets/lightBg.png)":"url(../../assets/darkBg.png)"}}>
            <div className="haiku-header">
                <img src="../../assets/logo.png" alt="logo" className='header-logo' />
                <button className="pull-right btn-share" onClick={()=>setShowModal(true)}>
                    <BsShareFill/> <span className="share" >SHARE</span>
                </button>
            </div>

            <div className="haiku-board">
                <img src={data.image} alt="haiku" className="haiku-image" />
                <div className="haiku-text text-center">
                    <div className="line1-haiku">{data.line1} </div>
                    <div className="line2-haiku">{data.line2}</div>
                    <div className="line3-haiku">{data.line3}</div>
                    <div className="pull-right author"> {data.Author==='unknown'?'':data.Author}</div>
                </div>
            </div>

            <Modal style={{marginTop:'70px'}} size="xl" show={showModal}>
                  <div className="haiku-modal">
                    <div className="memorialize-modal-header text-center">Share your work</div>
                    <div className="publish-form-group text-center">
                        <input 
                            type="text" 
                            className="published-inpt" 
                            value={`${appBaseUrl}/haiku/${data._id}`} 
                            ref={inptRef}
                        />
                        <button className="btn-copy-link" onClick={()=>Copy()}> {copied?'Copied!':'Copy'} </button>
                    </div>

                    <div className="social-links text-center">
                        <LinkedinShareButton title="Modern HAIQ" summary={`View my published HAIQ via ${publishedUrl}`} source="ModernHaiq" url={publishedUrl}>
                            <span className="fabs">
                            <Fab style={{backgroundColor:'#0077B5', color:'white', height:'40px', width:'40px'}}>
                                <FaLinkedin size={20} />
                            </Fab>
                            </span>
                        </LinkedinShareButton>

                        <FacebookShareButton url={publishedUrl} quote={publishedUrl} >
                            <span className="fabs">
                            <Fab style={{backgroundColor:'#3B5998', color:'white',  height:'40px', width:'40px'}}>
                                    <GrFacebookOption size={20} />
                            </Fab>
                            </span>
                        </FacebookShareButton>

                        
                        <TwitterShareButton url={publishedUrl} title="Modern HAIQ" via={publishedUrl} hashtags={['ModernHaiq']}>
                            <span className="fabs">
                            <Fab style={{backgroundColor:'#55ACEE', color:'white', height:'40px', width:'40px'}}>
                                <AiOutlineTwitter size={20} />
                            </Fab>
                            </span>
                        </TwitterShareButton>


                        <EmailShareButton subject="View my HAIQ" body={publishedUrl}>
                            <span className="fabs">
                            <Fab style={{backgroundColor:'#0971BD', color:'white', height:'40px', width:'40px'}}>
                                <FaEnvelope size={20} />
                            </Fab>
                            </span>
                        </EmailShareButton>

                    </div>

                    <div className="return text-center" onClick={()=>setShowModal(false)}>RETURN</div>

                  </div>

                  
            </Modal>
        </div>
     );
}
 
export default Haiku;