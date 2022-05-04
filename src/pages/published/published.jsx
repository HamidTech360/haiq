import React, {useState,  useRef, useEffect} from 'react';
import { useNavigate, useSearchParams} from 'react-router-dom'
import axios from 'axios'
import joi from 'joi-browser'
import { getRemainingTime } from '../../utils/countdownTimer';
import {appBaseUrl, apiUrl} from '../../config/config.json'
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
    const [formData, setFormData] = useState({
        card_number:'',
        exp_month:'',
        exp_year:'',
        cvc:''
    })
    const [author, setAuthor] = useState('unknown')
    const id = searchParams.get('id')
    const navigate = useNavigate()
    const inptRef = useRef()
    const [memorializeModal, setMemorializeModal] = useState(false)
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [showErrorModal, setShowErrorModal] = useState(false)
    const [lineErrorMsg, setLineErrorMsg] = useState({})
    const [showCheckout, setShowCheckOut] = useState(false)
    const [showPaymentProgress, setShowPaymentProgress] = useState(false)
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

  

    const handleAuthor = (e)=>{
        setAuthor(e.currentTarget.value)
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
    const handleAuthorshipModal = ()=>{
        setAuthorship(false)
        setShowCheckOut(true)
    }
    const handleChange = (e)=>{
        const clone = {...formData}
        clone[e.currentTarget.name] = e.currentTarget.value
        setFormData(clone)
    }
    const validate = ()=>{
        const schema = {
            card_number:joi.string().required(),
            cvc:joi.string().required(),
            exp_month:joi.string().required(),
            exp_year:joi.string().required(),
        }
        const {error} = joi.validate(formData, schema, {abortEarly:false})
        
        if(!error) return null

        const errors = {}
        for(let item of error.details){
            errors[item.path[0]] = item.message
        }
       
        return errors

    }
    const clearField = ()=>{
        const clone = {...formData}
        clone['card_number'] = ''
        setFormData(clone)
    }
    const handleSubmitPayment = async ()=>{
        console.log(formData);
        const errors = validate()
        if(errors){
            console.log(errors);
           return setLineErrorMsg(errors||{})
        }
        setShowPaymentProgress(true)
        try{
            const response = await axios.post(`${apiUrl}/haiku/pay`, {...formData, author, productId:id})
            console.log(response.data);
            if(response.data.status=='success'){
                setShowSuccessModal(true)
                setShowErrorModal(false)
                setShowCheckOut(false)
            }
            setShowPaymentProgress(false)
            clearField()

        }catch(ex){
            console.log(ex.response?.data);
            setShowPaymentProgress(false)
            setShowErrorModal(true)
            setShowSuccessModal(false)
            clearField()
        }
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
                        <span className="pull-right" onClick={()=>handleAuthorshipModal()}>Skip</span>
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
                        <button onClick={()=>handleAuthorshipModal()} className="btn-IWTMMH" style={{marginTop:'20px'}}>Finish</button>
                    </div>

                
                </div>
            </Modal>

            <Modal show={showCheckout} size="xl">
                <div className="checkout-modal">
                    <div className="memorialize-modal-header text-center" id="checkout-header" >Memorialize your craft</div>
                    <div className="payment-modal-text text-center">Keep You Art, Forever...</div>
                    <div className="checkout-price text-center">TOTAL: $100.00</div>

                    <div className="checkout-form">

                        <div className="checkout-flex-card">
                            <div className="form-group checkout-form-group card-number-group ">
                                <label className='checkout-inpt-label' htmlFor="card number">CARD NUMBER</label>
                                <input onChange={(e)=>handleChange(e)} value={formData.card_number} type="text" name='card_number' className="form-control checkout-inpt " />
                                {lineErrorMsg.card_number?
                                <div className="payment-warning-text" >
                                {'Please enter a valid Card Number'}
                                </div>:''}
                            </div>

                            <div className="form-group checkout-form-group cvv-group">
                                 <label className='checkout-inpt-label' htmlFor="cvvr">CVC</label>
                                 <input onChange={(e)=>handleChange(e)} value={formData.cvc} type="number" name='cvc' className=" form-control checkout-inpt" />
                                 {lineErrorMsg.cvc?
                                <div className="payment-warning-text" >
                                {'Please enter a valid CVC'}
                                </div>:''}
                            </div>
                        </div>
                        
                        <div className="checkout-flex">
                            <div className="form-group checkout-form-group cvv-group">
                                <label className='checkout-inpt-label' htmlFor="exp month">EXPIRATION MONTH</label>
                                <input onChange={(e)=>handleChange(e)} value={formData.exp_month} type="number" name='exp_month' className=" form-control checkout-inpt" />
                                {lineErrorMsg.exp_month?
                                <div className="payment-warning-text" >
                                {'Please enter card expiration month'}
                                </div>:''}
                            </div>

                            <div className="form-group checkout-form-group expiration-group">
                                <label className='checkout-inpt-label' htmlFor="exp year">EXPIRATION YEAR</label>
                                <input onChange={(e)=>handleChange(e)} value={formData.exp_year} type="number" name='exp_year' className="form-control checkout-inpt" />
                                {lineErrorMsg.exp_year?
                                <div className="payment-warning-text" >
                                {'Please enter card expiration year'}
                                </div>:''}
                            </div>
                        </div>

                        <div className="checkout-btns">
                            <button className="checkout-cancel-btn" onClick={()=>setShowCheckOut(false)}>Cancel</button>
                            <button className="checkout-submit-btn" onClick={()=>handleSubmitPayment()}> Submit Payment </button>
                        </div>
                    </div>

                </div>
            </Modal>

            <Modal show={showPaymentProgress}>
                <div className="paymet-processing-modal text-center">
                    <img src="../../assets/loader.gif" className='payment-preloader' alt="loader" />
                    <div className="payment-processing-text">Your payment is being processed. Please do not close Modal</div>
                </div>
            </Modal>

            <Modal show={showSuccessModal}>
                <div className="success-modal text-center">
                    <img src="../../assets/success.png" className='payment-preloader' alt="loader" />
                    <div className="payment-processing-text"><h5>Transaction successful. Your haik has been memorialized</h5></div>
                    <div className="cancel cancel-success" onClick={()=>setShowSuccessModal(false)}>Cancel</div>
                </div>
            </Modal>

            <Modal show={showErrorModal}>
                <div className="success-modal text-center">
                    <img src="../../assets/failure.png" className='payment-preloader' alt="loader" />
                    <div className="payment-processing-text"><h5>Transaction Failed.</h5> Unable to charge this card</div>
                    <div className="cancel cancel-success" onClick={()=>setShowErrorModal(false)}>Cancel</div>
                </div>
            </Modal>

            
        </div>
     );
}
 
export default Published;