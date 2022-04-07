import React, {useState} from 'react'
import Backdrop from '@material-ui/core/Backdrop'
import Modal from 'react-bootstrap/Modal'

//components
import Header from '../../components/header/header'
import 'bootstrap/dist/css/bootstrap.min.css'

//styles
import './css/create.css'

const CreateHaiku = ()=>{
    const [openModal, setOpenModal] = useState(false);
    const handleCloseModal = () => {
      setOpenModal(false);
    };

    const handleOpenModal = ()=>{
        setOpenModal(true)
    }


    const count = [1,2,3,4,5,6,7,8,9,10]
    return(
       
        <div className="create-haiku">
            <Header
                handleCloseModal={handleCloseModal}
                handleOpenModal={handleOpenModal}
            />
            <div className="haiku-container" style={{backgroundImage:'url(./assets/lightBg.png)'}}>
                <div className="image-board"> </div>

                <div className="haiku-inputs-box text-center" >
                    <div className="haiku-form-group">
                        <input type="text" className="haiku-input"/>
                    </div>
                    <div className="haiku-form-group">
                        <input type="text" className="haiku-input"/>
                    </div>
                    <div className="haiku-form-group">
                        <input type="text" className="haiku-input"/>
                    </div>
                </div>
            </div>

            {openModal? 
            <Modal size="xl" show={true}>
                <div className="image-display">
                  
                   
                    <div className="img-grid">
                        {count.map((item, i)=>
                            <div className="img-grid-item"></div>
                        )}
                        </div>
                   </div>
                 
                   <div className="baseBtns">
                       <button className="btn-back" onClick={()=>handleCloseModal()}>Back</button>
                       <button className="btn-upload">Upload</button>
                   </div>
            </Modal>:''}
          
        </div>
    )
}

export default CreateHaiku