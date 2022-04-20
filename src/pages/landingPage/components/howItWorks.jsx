import React from 'react';

//styles
import '../css/howItWorks.css'

const HowItWorks = () => {
   
    return ( 
        <div className="banner3">
            <div className="banner3-header text-center">How this works</div>
            <div className="text-center">
                <button className="banner3-divider"></button>
            </div>

            <div className="broken-line"></div>

            <div className="how-it-works">
                <div className="HIW-item">
                    <div className="fab">
                        <img src="../../../assets/Vector.png" alt="vector" className="HIW-vector" />
                    </div>

                    <div className="HIW-text">
                        Upload an image from your own collection or a stock collection. 
                    </div>
                </div>

                <div className="HIW-item">
                    <div className="fab">
                        <img src="../../../assets/Vector (1).png" alt="vector" className="HIW-vector" />
                    </div>

                    <div className="HIW-text">
                        Upload an image from your own collection or a stock collection. 
                    </div>
                </div>


                <div className="HIW-item">
                    <div className="fab">
                        <img src="../../../assets/Vector (2).png" alt="vector" className="HIW-vector" />
                    </div>

                    <div className="HIW-text">
                    Express your chosen piece in haiku form 
                    </div>
                </div>

                <div className="HIW-item">
                    <div className="fab">
                        <img src="../../../assets/Vector (3).png" alt="vector" className="HIW-vector" />
                    </div>

                    <div className="HIW-text">
                    Streamline your thoughts for humanity in three lines and seventeen syllabes 5,7,5. 
                    </div>
                </div>

                <div className="HIW-item">
                    <div className="fab">
                        <img src="../../../assets/Vector (4).png" alt="vector" className="HIW-vector" />
                    </div>

                    <div className="HIW-text">
                    Highlight your IQ and challenge yourself. 
                    </div>
                </div>
            </div>

            <div className="banner3-slant-text">"What's your Haiq? Publish yourself and share it with the universe."</div>
            
        </div>
     );
}
 
export default HowItWorks;