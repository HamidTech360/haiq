import React, {useState, useContext, useRef, useEffect} from 'react';
import axios from 'axios'
import {apiUrl} from '../../config/config.json'
import { getRemainingTime } from '../../utils/countdownTimer';
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import { Elements, CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";
import StripeCheckout from 'react-stripe-checkout'
// import { loadStripe } from "@stripe/stripe-js";
import UserContext from '../../context/userContext';
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

    const store = useContext(UserContext)
    const savedHaik = store.savedHaik
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
    //console.log(store.savedHaik);

    

    //Countdown timer calculator
        // let future = new Date()
        // future.setDate(future.getDate() + 1)
        // let countdownDate = new Date(future).getTime()
       // console.log('future is', future, 'while countdown is ', countdownDate);

       
        // let x = setInterval(function(){
        //     let now = new Date().getTime()
        //     let distance = countdownDate-now
    
        //     let days = Math.floor(distance/(1000*60*60*24))
        //     let hours = Math.floor((distance%(1000*60*60*24))/(1000*60*60))
        //     let minutes = Math.floor((distance%(1000*60*60))/(1000*60)) 
        //     let seconds =  Math.floor((distance%(1000*60))/1000)

        //     const clone = {...timer}
        //     clone['days'] = days
        //     clone['hours'] = hours
        //     clone['minutes'] = minutes
        //     clone['seconds'] = seconds
        //     setTimer(clone)
    
            // console.log(days, hours, minutes, seconds);
            // if(distance < 0){
            //     clearInterval(x)
            //     alert('Item expired')
            // }
        // }, 1000)
        //------------------------------


    //http://localhost:3000/haiku/62631517df1498326647107a
    useEffect(()=>{
        const intervalId = setInterval(()=>{
            updateTimer()
        }, 1000)
         function clearItv (){
             clearInterval(intervalId)
         }

       
    }, [])

    const renderStripe = ()=>{
        
        try{
            return(
                <div>
                <StripeCheckout
                    label='memorialize'
                    className='btn-IWTMMH'
                    id="btn-pay"
                    token={handleToken}
                    stripeKey='pk_test_51Kqg3REu5Qc79aW8jrKgq0qyQYwX5wvEAoxxS3Evq4ZrxesK9UPhHThsEaUjLCY9HRyIZOjmG21m3L65xBI4xhEq00r53djqjM'
                    amount={10000}
                    name='haik'
                    ComponentClass='div'
                    billingAddress
                    shippingAddress
                />
                </div>
            )
        }catch(ex){
            return(
                <h1>Hello</h1>
            )
        }
    }

    const updateTimer = (countDown)=>{
        setTimer(getRemainingTime('2022-04-26T11:10:35.192+00:00'))
    }

    

    const AuthorshipDisplay = ()=>{
        setMemorializeModal(false)
        setAuthorship(true)
    }
    const handleToken = async (token, address)=>{
        const response = await axios.post(`${apiUrl}/haiku/pay`, {token})
        console.log(response.data);
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
                        value={`${appBaseUrl}/haiku/${savedHaik._id}`} 
                        ref={inptRef}
                     />
                    <button className="btn-copy-link" onClick={()=>Copy()}> {copied?'Text Copied!':'Copy Link'} </button>
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
                                
                                type="text" 
                                className='email-inpt'
                                name='email-inpt'

                            />
                        </div>
                        <button className="btn-IWTMMH" style={{marginTop:'20px'}}>Finish</button>
                    </div>

                    {/* <div className="memorialize-modal-btns">
                        <button className="btn-IWTMMH">Finish</button>
                    </div> */}
                </div>
            </Modal>

            

            
                {/* <Modal show={true}>
                    <div className='payment-modal'>
                    <Elements stripe={stripeTestPromise}>
                      <CardElement 
                            options={{
                                style:{
                                    base:{
                                        height:'100px',
                                        backgroundColor:'red',
                                        width:'100%'
                                    }
                                }
                            }}
                       />
                       </Elements>
                    </div>
                </Modal> */}
            
        </div>
     );
}
 
export default Published;