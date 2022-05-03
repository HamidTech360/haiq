import React, {useState, useContext, useRef, useEffect} from 'react';
import { useNavigate, useSearchParams} from 'react-router-dom'
import axios from 'axios'
import {apiUrl} from '../../config/config.json'
import { getRemainingTime } from '../../utils/countdownTimer';
import {appBaseUrl} from '../../config/config.json'
import { Fab } from '@material-ui/core';
import {GrFacebookOption} from 'react-icons/gr'
import {AiOutlineTwitter, AiOutlineMail} from 'react-icons/ai'
import {FaLinkedin, FaEnvelope} from 'react-icons/fa'
import {RiErrorWarningLine} from 'react-icons/ri'
import Modal from 'react-bootstrap/Modal'

//styles
import './css/published.css'

const Published = () => {

    const [searchParams, setSearchParams] = useSearchParams()
    const [data, setData] = useState({})
    const [author, setAuthor] = useState(null)
    const id = searchParams.get('id')
    //console.log(id)
    const navigate = useNavigate()
    const inptRef = useRef()
    const [memorializeModal, setMemorializeModal] = useState(false)
    const [authorship, setAuthorship] = useState(false)
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
               // console.log(response.data);
                setData(response.data.data)
                //console.log(data);
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

  

    const handleAuthor = (e)=>{
        setAuthor(e.currentTarget.value)
        console.log(author);
    }

    const updateTimer = (countDown)=>{
        setTimer(getRemainingTime(data?.createdAt))
    }

    const AuthorshipDisplay = ()=>{
        setMemorializeModal(false)
        setAuthorship(true)
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
                <img src="../../assets/logo.png" alt="logo" className="header-logo" />
            </div>
            <div className="published-body text-center">
                <div className="published-header">Congratulations! Your Haiq Shines</div>
                <div className="share-work">Share your work</div>

                <div className="publish-form-group">
                    <input 
                        type="text" 
                        className="published-inpt" 
                        value={`${appBaseUrl}/haiku/${id}`} 
                        ref={inptRef}
                     />
                    <button className="btn-copy-link" onClick={()=>Copy()}> {copied?'Copied!':'Copy'} </button>
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
                        <div>{timer.days}</div> <div>DAYS</div>
                    </div>

                    <div className="time">
                        <div>{timer.hours}</div><div>HOURS</div>
                    </div>

                    <div className="time">
                        <div>{timer.minutes}</div><div>MINUTES</div>
                    </div>

                    <div className="time">
                        <div>{timer.seconds}</div><div>SECONDS</div>
                    </div>
                </div>

                <div className="published-btns">
                    <button className="btn-memorialize" onClick={()=>setMemorializeModal(true)} >Memorialize Forever <RiErrorWarningLine/> </button>
                    <button className="btn-view-work" onClick={()=>navigate(`/haiku/${id}`)}>View Your Work</button>
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
                        {/* {StripeCheckout? renderStripe():''} */}
                        <button className="btn-IWTMMH" onClick={()=>AuthorshipDisplay()} >I want to memorialize my Haiq</button>
                        <button className="btn-memorialize-cancel" onClick={()=>setMemorializeModal(false)}>Cancel</button>
                    </div>
                </div>
            </Modal>

            <Modal show={authorship}>
                <div className="memorialize-modal" id="authorship-modal">
                    <div className="pull-righ skip">
                        <span className="pull-right" onClick={()=>setAuthorship(false)}>Skip</span>
                    </div>
                    
                    <div className="memorialize-modal-header text-center">Authorship</div>
                    <div className="memorialize-modal-text text-center">
                        Sign your masterpiece in 17 characters. 
                    </div>

                    <div className="save-haiku-form-group" id="authorship-form-group">
                        <label htmlFor="email">Author</label>
                        <div >
                            <input 
                                onChange = {(e)=>handleAuthor(e)}
                                type="text" 
                                className='email-inpt'
                                name='email-inpt'

                            />
                        </div>
                        <button className="btn-IWTMMH" style={{marginTop:'20px'}}>Finish</button>
                    </div>

                
                </div>
            </Modal>

            <Modal show={false} size="xl">
                <div className="checkout-modal">
                    <div className="memorialize-modal-header text-center" id="checkout-header" >Memorialize your craft</div>
                    <div className="payment-modal-text text-center">Keep You Art, Forever...</div>
                    <div className="checkout-price text-center">TOTAL: $100.00</div>

                    <div className="checkout-form">

                        <div className="form-group checkout-form-group card-number-group">
                            <label htmlFor="card number">CARD NUMBER</label>
                            <input type="text" className="form-control checkout-inpt " />
                        </div>

                        
                        <div className="checkout-flex">
                            <div className="form-group checkout-form-group cvv-group">
                                <label htmlFor="card number">CVV</label>
                                <input type="text" className=" form-control checkout-inpt" />
                            </div>

                            <div className="form-group checkout-form-group expiration-group">
                                <label htmlFor="card number">EXPIRATION DATE</label>
                                <input type="text" className="form-control checkout-inpt" />
                            </div>
                        </div>

                        <div className="checkout-btns">
                            <button className="checkout-cancel-btn">Cancel</button>
                            <div className="checkout-submit-btn">Submit Payment</div>
                        </div>
                    </div>

                </div>
            </Modal>

            
        </div>
     );
}
 
export default Published;