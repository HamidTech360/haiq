import React, {useState,  useRef, useEffect} from 'react';
import { useNavigate, useSearchParams} from 'react-router-dom'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Memorialize from '../../utils/memorialize';
import { getRemainingTime } from '../../utils/countdownTimer';
import {appBaseUrl, apiUrl} from '../../config/config.json'
import { Fab } from '@material-ui/core';
import {GrFacebookOption} from 'react-icons/gr'
import {AiOutlineTwitter, AiOutlineMail} from 'react-icons/ai'
import {FaLinkedin, FaEnvelope} from 'react-icons/fa'
import {RiErrorWarningLine} from 'react-icons/ri'
import Modal from 'react-bootstrap/Modal'
import {FacebookShareButton, LinkedinShareButton, TwitterShareButton, EmailShareButton} from 'react-share'

//styles
import './css/published.css'

const Published = () => {

    const [searchParams, setSearchParams] = useSearchParams()
    const [data, setData] = useState({})
    const id = searchParams.get('id')
    const publishedUrl = `${appBaseUrl}/haiku/${id}`
    const navigate = useNavigate()
    const inptRef = useRef()
    const [memorializeModal, setMemorializeModal] = useState(false)
    const [copied, setCopied] = useState(false)
    const [timer, setTimer]= useState({
        days:'00',
        hours:'00',
        minutes:'00',
        seconds:'00'
    })
    
    useEffect(()=>{
        async function getHaik (){
            try{
                const response = await axios.get(`${apiUrl}/haiku/${id}`)
                setData(response.data.data)
            }catch(ex){
                console.log(ex.response?.data);
            }
        }
        getHaik()    
    },[])

    useEffect(()=>{
        const intervalId = setInterval(()=>{
            updateTimer()
        }, 1000)
         return ()=> clearInterval(intervalId)   
    }, [data])

  
    const handleMemorializeModal = (value)=>{
        setMemorializeModal(value)
    }

    const updateTimer = (countDown)=>{
        setTimer(getRemainingTime(data?.createdAt))
    }

    const Copy = ()=>{
        navigator.clipboard.writeText(inptRef.current.value)
        setCopied(true)    
    }
    
   
    return ( 
        <div className="published">
            <div className="hideOnDesktop hideOnMobile">
                
            </div>
            <div className="published-pg-header">
                <Link to="/">
                    <img src="../../assets/logo.png" alt="logo" className="header-logo" />
                </Link>
            </div>
            <div className="published-body text-center">
                <div className="published-header">Congratulations! Your HAIQ Shines</div>
                <div className="share-work">Share your work</div>

                <div className="publish-form-group">
                    <input 
                        type="text" 
                        className="published-inpt" 
                        value={publishedUrl} 
                        ref={inptRef}
                     />
                    <button className="btn-copy-link" onClick={()=>Copy()}> {copied?'Copied!':'Copy'} </button>
                </div>

                <div className="social-links">
                   
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

                <div className="days-box text-center">
                    <div className="time">
                        <div>{timer.days || '00'}</div> <div>DAYS</div>
                    </div>

                    <div className="time">
                        <div>{timer.hours || '00'}</div><div>HOURS</div>
                    </div>

                    <div className="time">
                        <div>{timer.minutes || '00'}</div><div>MINUTES</div>
                    </div>

                    <div className="time">
                        <div>{timer.seconds || '00'}</div><div>SECONDS</div>
                    </div>
                </div>

                <div className="published-btns">
                    <button className="btn-memorialize" onClick={()=>setMemorializeModal(true)} >Memorialize Forever <RiErrorWarningLine/> </button>
                    <button className="btn-view-work" onClick={()=>navigate(`/haiku/${id}`)}>View Your Work</button>
                </div>

            </div> 

           <Memorialize
                handleMemorializeModal={handleMemorializeModal}
                memorializeModal={memorializeModal}
                id={id}
                enableCancel={true}
            />

            
        </div>
     );
}
 
export default Published;