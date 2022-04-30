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
    const store = useContext(UserContext)
    const data = store.formData
    const [openModal, setOpenModal] = useState(false);
    const [apiImages, setAPiImages] = useState([])
    const [lineErrorMsg, setLineErrorMsg] = useState({})
    const [syllableErrMsg, setSyllableErrMsg] = useState({})
     const [syllableCount, setSyllableCount] = useState({
        line1:{
            currentValue:0,
            maxValue:5
        },
        line2:{
            currentValue:0,
            maxValue:7
        },
        line3:{
            currentValue:0,
            maxValue:5
        }
     })
    

    useEffect(()=>{
        console.log(data)
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


    const triggerClick = ()=>{
        imgRef.current.click()
    }

    const handleInputChange = (e, allowedSyllable)=>{
        handleChange(e)
        const errors = {}
        const value = e.currentTarget.value
        const noOfSyllable = syllable(value)
        const cloneSyllableCount = {...syllableCount}
        cloneSyllableCount[e.currentTarget.name].currentValue = noOfSyllable
        setSyllableCount(cloneSyllableCount)

        if(noOfSyllable > allowedSyllable){
            errors[e.currentTarget.name] = 'Exceeded the required syllable'
         }else{
             errors[e.currentTarget.name] = null
         }
         setSyllableErrMsg({...syllableErrMsg, ...errors})
         //console.log(syllableErrMsg);
       
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
        if(errors){
            console.log(errors);
            setLineErrorMsg(errors||{})
            return formRef.current.scrollIntoView() 
        }
        if(syllableErrMsg.line1!==null || syllableErrMsg.line2!==null || syllableErrMsg.line3 !== null) {
            
            return formRef.current.scrollIntoView()
           
        }
        
        navigate('/review')
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
                         
                  
                </div>
                {lineErrorMsg.imageUrl?
                        <div className="warning-text text-center" style={{color:!mode?'#c22635':'#c22635'}}>
                            {'Please select an image'}
                        </div>:
                    ''}

                <div className="haiku-inputs-box text-center" ref={formRef} >
                    <div className="haiku-form-group">
                        <input 

                            style={{
                                border:syllableErrMsg.line1? '1px solid #c22635':''
                            }}
                            type="text"
                            name="line1" 
                            onChange={(e)=>handleInputChange(e, 5)}
                            value={data.line1}
                            onClick={(e)=>allowEdit(e)}
                            className="haiku-input"
                            id="haiku-input"
                        />

                            <div className="noOfSyllable" style={{color:!mode?'black':'white'}}>
                                 {syllableCount.line1.currentValue}  
                            </div>

                            {lineErrorMsg.line1?
                            <div className="warning-text" style={{color:!mode?'#c22635':'#c22635'}}>
                               {'Please enter the first line of your haiku'}
                            </div>:''}

                            {syllableErrMsg.line1?
                            <div className="warning-text" style={{color:!mode?'#c22635':'#c22635'}}>
                               {'Please reiew the number of syllables'}
                            </div>:''}
                    </div>


                    <div className="haiku-form-group">
                        <input
                             style={{
                                border:syllableErrMsg.line2? '1px solid #c22635':''
                            }} 
                            name="line2" 
                            value={data.line2}
                            onChange={(e)=>handleInputChange(e, 7)}
                            onClick={(e)=>allowEdit(e)}
                            type="text" 
                            className="haiku-input"
                        />

                            <div className="noOfSyllable" style={{color:!mode?'black':'white'}}>
                                 {syllableCount.line2.currentValue}  
                            </div>

                            {lineErrorMsg.line2?
                            <div className="warning-text" style={{color:!mode?'#c22635':'#c22635'}}>
                               {'Please enter the second line of your haiku'}
                            </div>:''}

                            {syllableErrMsg.line2?
                            <div className="warning-text" style={{color:!mode?'#c22635':'#c22635'}}>
                               {'Please reiew the number of syllables'}
                            </div>:''}
                    </div>


                    <div className="haiku-form-group">
                        <input 
                            style={{
                                border:syllableErrMsg.line3? '1px solid #c22635':''
                            }}
                             name="line3" 
                             value={data.line3}
                             onChange={(e)=>handleInputChange(e, 5)}
                             onClick={(e)=>allowEdit(e)}
                            type="text" 
                            className="haiku-input"
                        />
                            <div className="noOfSyllable" style={{color:!mode?'black':'white'}}>
                                 {syllableCount.line3.currentValue}  
                            </div>
                            {lineErrorMsg.line3?
                            <div className="warning-text" style={{color:!mode?'#c22635':'#c22635'}}>
                               {'Please enter the third line of your haiku'}
                            </div>:''}

                            {syllableErrMsg.line3?
                            <div className="warning-text" style={{color:!mode?'#c22635':'#c22635'}}>
                               {'Please reiew the number of syllables'}
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