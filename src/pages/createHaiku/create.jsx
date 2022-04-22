import React, {useState, useRef, useContext, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import { syllable } from 'syllable'
import UserContext from '../../context/userContext'
import Modal from 'react-bootstrap/Modal'
import axios from 'axios'
import joi from 'joi-browser'
import {unsplashApi} from '../../config/config.json'

//components
import Header from '../../components/header/header'
import 'bootstrap/dist/css/bootstrap.min.css'

//styles
import './css/create.css'

const CreateHaiku = ({handleChange, handleImgSelection, handleModalImgSelection, mode, SwitchMode})=>{
    const imgRef = useRef()
    const formRef = useRef()
    const navigate = useNavigate()
    const data = useContext(UserContext)
    const [openModal, setOpenModal] = useState(false);
    const [apiImages, setAPiImages] = useState([])
    // const [mode, setMode] = useState(true)
    const [lineErrorMsg, setLineErrorMsg] = useState({})

    useEffect(()=>{
        async function getImages (){
            try{
                const response = await axios.get(`${unsplashApi}&count=20&page=2`)
                // console.log(response.data);
                setAPiImages(response.data)
            }catch(err){
                console.log(err.response?.message);
            }
        }
        getImages()
    },[])
    const handleCloseModal = () => {
      setOpenModal(false);
    };

    const selectModalImages = (item, i)=>{
        const clone = [...apiImages]
       try{
            clone.map(item=>item.selected = false)
            clone[i].selected = true
            setAPiImages(clone)
            handleModalImgSelection(item)
            // console.log(item);
       }catch(err){
            console.log(err);
       }
    }

    const handleOpenModal = ()=>{
        setOpenModal(true)
    }

    // const SwitchMode = ()=>{
    //     setMode(!mode)
    // }

    const triggerClick = ()=>{
        imgRef.current.click()
    }

    const handleInputChange = (e, allowedSyllable)=>{
        handleChange(e)
        const value = e.currentTarget.value
        const noOfSyllable = syllable(value)
        if(noOfSyllable >= allowedSyllable) e.currentTarget.readOnly= true
    }

    
    const allowEdit = (e)=>{
        const target = e.currentTarget
        target.readOnly = false      
    }

    const validate = ()=>{
        const schema = {
            line1:joi.string().required(),
            line2:joi.string().required(),
            line3:joi.string().required(),
            image:joi.required(),
            imageUrl:joi.string().required()
        }
        const {error} = joi.validate(data, schema, {abortEarly:false})
        
        if(!error) return null

        const errors = {}
        for(let item of error.details){
            errors[item.path[0]] = item.message
        }
       
        return errors

    }

    const handleReview = ()=>{
        const errors = validate()
        if(!errors){
            navigate('/review')
        }
        console.log(errors);
        setLineErrorMsg(errors||{})
        formRef.current.scrollIntoView()

    }
   

    


    // const count = [1,2,3,4,5,6,7,8,9,10]
    return(
       
        <div className="create-haiku">
            <Header
                handleCloseModal={handleCloseModal}
                handleOpenModal={handleOpenModal}
                SwitchMode={SwitchMode}
                triggerClick={triggerClick}
                mode = {mode}
                activeTab={0}
                handleReview={handleReview}
            />
            <input 
                onChange = {(e)=>handleImgSelection(e)}
                type="file" ref={imgRef} 
                style={{display:'none'}}
            />
            <div className="haiku-container" style={{backgroundImage: mode==false? 'url(./assets/lightBg.png)':'url(./assets/darkBg.png)', backgroundSize:'cover'}}>
                
                <div className="image-board">
                    
                    {
                        data.imageUrl?
                        <>
                            <div className="upload-pics-header">UPLOAD A PHOTO</div>
                            <img src={data.imageUrl} alt="upload" className='board-img' />
                        </>:''
                    }
                         
                    {lineErrorMsg.imageUrl?
                        <div className="warning-text" style={{color:!mode?'#C79398':'#C79398'}}>
                            {'Please select an image'}
                        </div>:
                    ''}
                </div>

                <div className="haiku-inputs-box text-center" ref={formRef} >
                    <div className="haiku-form-group">
                        <input 
                            readOnly={false}
                            type="text"
                            name="line1" 
                            onChange={(e)=>handleInputChange(e, 5)}
                            value={data.line1}
                            onClick={(e)=>allowEdit(e)}
                            className="haiku-input"
                        />

                            {lineErrorMsg.line1?
                            <div className="warning-text" style={{color:!mode?'#C79398':'#C79398'}}>
                               {lineErrorMsg.line1}
                            </div>:''}
                    </div>
                    <div className="haiku-form-group">
                        <input 
                            name="line2" 
                            value={data.line2}
                            onChange={(e)=>handleInputChange(e, 7)}
                            onClick={(e)=>allowEdit(e)}
                            type="text" 
                            className="haiku-input"
                        />

                            {lineErrorMsg.line2?
                            <div className="warning-text" style={{color:!mode?'#C79398':'#C79398'}}>
                               {lineErrorMsg.line2}
                            </div>:''}
                    </div>
                    <div className="haiku-form-group">
                        <input 
                             name="line3" 
                             value={data.line3}
                             onChange={(e)=>handleInputChange(e, 5)}
                             onClick={(e)=>allowEdit(e)}
                            type="text" 
                            className="haiku-input"
                        />

                            {lineErrorMsg.line3?
                            <div className="warning-text" style={{color:!mode?'#C79398':'#C79398'}}>
                               {lineErrorMsg.line3}
                            </div>:''}
                    </div>
                </div>
            </div>

            {openModal? 
            <Modal size="xl" show={true}>
                <div className="image-display">
                  
                   
                    <div className="img-grid">
                        {apiImages.map((item, i)=>
                            <div key={i} style={{border:item.selected?'4px solid #22ED0B':''}} className="img-grid-item" onClick={()=>selectModalImages(item, i)}>
                                <img src={item?.urls.raw} alt="" className='apiImages' />
                            </div>
                        )}
                        </div>
                   </div>
                 
                   <div className="baseBtns">
                       <button className="btn-back" onClick={()=>handleCloseModal()}>Back</button>
                       <button className="btn-upload" onClick={()=>handleCloseModal()}>Upload</button>
                   </div>
            </Modal>:''}

          
        </div>
    )
}

export default CreateHaiku