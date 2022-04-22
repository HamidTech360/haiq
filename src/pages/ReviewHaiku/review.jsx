import React, {useState, useContext, useRef, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import joi from 'joi-browser'
import _ from 'lodash'
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom'
import UserContext from '../../context/userContext'
import Modal from 'react-bootstrap/Modal'
import Header2 from '../../components/header/header2'

//styles
import './css/review.css'
import 'react-toastify/dist/ReactToastify.css';

const ReviewHaiku = ({mode, SwitchMode})=>{
 
    const modalInpt = useRef()
    const [openSaveModal, setOpenSaveModal] = useState(false);
    const [showError, setShowError] = useState(false)
    const data = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(()=>{
        const schema = {
            line1:joi.string().required(),
            line2:joi.string().required(),
            line3:joi.string().required(),
            image:joi.required(),
            imageUrl:joi.string().required()
        }
        const {error} = joi.validate(data, schema, {abortEarly:false})
        if(error) navigate('/create')
    },[])
  
    const notify = (message) =>  {
        toast.error(message, {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    }

    const review = ()=>{
        
        setOpenSaveModal(true)
    }

    const publish = ()=>{
        const userEmail = modalInpt.current.value
        console.log(userEmail);
        if(!userEmail) return setShowError(true)

        console.log('Connecting to the server...');
    }



    return(
        <div className="preview-haiku">
             <Header2
                SwitchMode={SwitchMode}
                mode = {mode}
                activeTab={2}
            />

            <div
                className="haiku-container" 
                style={{
                    backgroundImage: mode==false? 'url(./assets/lightBg.png)':'url(./assets/darkBg.png)',
                     backgroundSize:'cover',
                }}
            >
                
                <div className="image-board" id="preview-board" style={{backgroundColor:mode==false? 'white':'#C4C4C4'}}>
                    <img src={data.imageUrl} alt="upload" className='board-img' />    
                    <div className="text-center review-texts">
                    <div className="review-line1"> {data.line1} </div>
                    <div className="review-line2"> {data.line2} </div>
                    <div className="review-line3"> {data.line3} </div>
                </div>
                </div>
                
               <div className="review-btns">
                   <Link to="/create"><button className="btn-continue-editing">Continue Editing</button></Link>
                   <button className="btn-publish" onClick={()=>review()}>Publish Haiku</button>
               </div>
            </div>
            <ToastContainer style={{backgroundColor:'red'}} />
            
           {openSaveModal? 
            <Modal show={true} size="lg">
                <div className="save-haiku-popup">
                    <div className="save-modal-header text-center">Save your craft</div>
                    <div className="save-modal-text1 text-center">
                         Enter your email below to continue. We will send you an email with the link to your HAIQ.
                    </div>
                    <div className="save-modal-text2 text-center">
                        Free publish for 17 days or memorialize forever.
                    </div>
                    <div className="save-haiku-form-group">
                        <label htmlFor="email">EMAIL</label>
                        <div >
                            <input 
                                ref={modalInpt}
                                type="text" 
                                className='email-inpt'
                                name='email-inpt'

                            />

                        {showError?<div className="warning-text" style={{color:!mode?'#C79398':'#C79398'}}>
                            {'EMAIL is not allowed to be empty'}
                        </div>:''}

                        </div>
                        <button className="btn-continue-publish" onClick={()=>publish()} >Continue</button>
                        <div className="text-center cancel-modal" onClick={()=>setOpenSaveModal(false)} >Cancel</div>
                    </div>
                </div>
            </Modal>
            :''}
        </div>
    )
}

export default ReviewHaiku