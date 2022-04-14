import React, {useState, useContext} from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../../context/userContext'
import Modal from 'react-bootstrap/Modal'
import Header2 from '../../components/header/header2'

//styles
import './css/review.css'

const ReviewHaiku = ()=>{
    const [mode, setMode] = useState(true)
    const [openSaveModal, setOpenSaveModal] = useState(false);
    const data = useContext(UserContext)
    const SwitchMode = ()=>{
        setMode(!mode)
        //console.log(mode);
    }
    return(
        <div className="preview-haiku">
             <Header2
                SwitchMode={SwitchMode}
                mode = {mode}
                activeTab={2}
            />

            <div className="haiku-container" 
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
                   <button className="btn-publish" onClick={()=>setOpenSaveModal(true)}>Publish Haiku</button>
               </div>
            </div>

            
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
                        <label htmlFor="email">Email</label>
                        <div >
                            <input 
                                type="text" 
                                className='email-inpt'
                                name='email-inpt'

                            />
                        </div>
                        <button className="btn-continue-publish">Continue</button>
                    </div>
                </div>
            </Modal>
            :''}
        </div>
    )
}

export default ReviewHaiku