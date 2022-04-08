import React, {useState, useRef, useContext, useEffect} from 'react'
import UserContext from '../../context/userContext'
import Modal from 'react-bootstrap/Modal'
import axios from 'axios'
import {unsplashApi} from '../../config/config.json'

//components
import Header from '../../components/header/header'
import 'bootstrap/dist/css/bootstrap.min.css'

//styles
import './css/create.css'

const CreateHaiku = ({handleChange, handleImgSelection, handleModalImgSelection})=>{
    const imgRef = useRef()
    const data = useContext(UserContext)
    const [openModal, setOpenModal] = useState(false);
    const [apiImages, setAPiImages] = useState([])
    const [mode, setMode] = useState(false)

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

    const SwitchMode = ()=>{
        setMode(!mode)
        //console.log(mode);
    }

    const triggerClick = ()=>{
        imgRef.current.click()
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
            />
            <input 
                onChange = {(e)=>handleImgSelection(e)}
                type="file" ref={imgRef} 
                style={{display:'none'}}/>
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

                <div className="haiku-inputs-box text-center" >
                    <div className="haiku-form-group">
                        <input 
                            type="text"
                            name="line1" 
                            onChange={(e)=>handleChange(e)}
                            className="haiku-input"/>
                    </div>
                    <div className="haiku-form-group">
                        <input 
                             name="line2" 
                             onChange={(e)=>handleChange(e)}
                            type="text" 
                            className="haiku-input"/>
                    </div>
                    <div className="haiku-form-group">
                        <input 
                             name="line3" 
                             onChange={(e)=>handleChange(e)}
                            type="text" 
                            className="haiku-input"/>
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