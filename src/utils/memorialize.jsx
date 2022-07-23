import React, {useState, useRef} from 'react'
import { Modal } from 'react-bootstrap'
import joi from 'joi-browser'
import axios from 'axios'
import {apiUrl} from '../config/config.json'

const Memorialize = ({id, memorializeModal, handleMemorializeModal, enableCancel})=>{

    const [author, setAuthor] = useState('unknown')
    const [data, setData] = useState({})
    const [formData, setFormData] = useState({
        card_number:'',
        exp_month:'',
        exp_year:'',
        cvc:''
    })
    const inptRef = useRef()
    //const [memorializeModal, setMemorializeModal] = useState(true)
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [showErrorModal, setShowErrorModal] = useState(false)
    const [lineErrorMsg, setLineErrorMsg] = useState({})
    const [showCheckout, setShowCheckOut] = useState(false)
    const [showPaymentProgress, setShowPaymentProgress] = useState(false)
    const [authorship, setAuthorship] = useState(false)
    const [copied, setCopied] = useState(false)
    const months = ['01','02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
    
    const handleAuthor = (e)=>{
        setAuthor(e.currentTarget.value)
    }


    const AuthorshipDisplay = ()=>{
        handleMemorializeModal(false)
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

    const closeCheckout = ()=>{
        
        setShowCheckOut(false)
        if(enableCancel==false){
           handleMemorializeModal(true)
        }
    }
    const handleChange = (e)=>{
        const clone = {...formData}
        clone[e.currentTarget.name] = e.currentTarget.value
        setFormData(clone)
    }
    const validate = ()=>{
        const schema = {
            card_number:joi.string().required().min(16).max(16),
            cvc:joi.number().required(),
            exp_month:joi.string().required(),
            exp_year:joi.string().required().min(4).max(4),
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
            //alert(enableCancel);
            if(enableCancel==false){
                handleMemorializeModal(false)
            }

        }catch(ex){
            console.log(ex.response?.data);
            setShowPaymentProgress(false)
            setShowErrorModal(true)
            setShowSuccessModal(false)
            clearField()
            if(enableCancel==false){
                handleMemorializeModal(true)
            }

        }
    }


    return(
        <>
            <Modal show={memorializeModal} className="memorializeModal">
                <div className="memorialize-modal">
                    <div className="memorialize-modal-header text-center">Memorialize your craft</div>
                    <div className="memorialize-modal-text text-center">
                        Commemorate your work. Rise to the next level and show the world your creation. 
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
                        <button className="btn-IWTMMH" onClick={()=>AuthorshipDisplay()} >I want to memorialize my HAIQ</button>
                        {enableCancel?<button className="btn-memorialize-cancel" onClick={()=>handleMemorializeModal(false)}>Cancel</button>:""}
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
                        Sign below to put a stamp on your hard work. Max character count is 17 characters 
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
                    <div className="payment-modal-text text-center">This is your modern masterpiece, attach it to the universe for all to view and forever feel</div>
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
                                 <input onChange={(e)=>handleChange(e)} value={formData.cvc} type="text" name='cvc' className=" form-control checkout-inpt" />
                                 {lineErrorMsg.cvc?
                                <div className="payment-warning-text" >
                                {'Please enter a valid CVC'}
                                </div>:''}
                            </div>
                        </div>
                        
                        <div className="checkout-flex">
                            <div className="form-group checkout-form-group cvv-group">
                                <label className='checkout-inpt-label' htmlFor="exp month">EXPIRATION MONTH</label>
                                {/* <input onChange={(e)=>handleChange(e)} value={formData.exp_month} type="number" name='exp_month' className=" form-control checkout-inpt" /> */}
                                <select name="exp_month" id="" className="form-control checkout-inpt" value={formData.exp_month} onChange={(e)=>handleChange(e)}>
                                    <option value="">Seelect Month</option>
                                    {months.map((item, i)=>
                                        <option value={item}>{item}</option>
                                    )}
                                </select>
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
                            <button className="checkout-cancel-btn" onClick={()=>closeCheckout()}>Cancel</button>
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
                    <div className="payment-processing-text"><h5>Transaction successful. Your HAIQ has been memorialized</h5></div>
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

        </>
    )
}

export default Memorialize