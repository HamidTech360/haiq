import React from 'react';
import { Link } from 'react-router-dom';

//styles
import '../css/enrich.css'

const Enrich = () => {
    const images = ['e1.jpg', 'e2.jpg', 'e1.jpg']
    const randomNo = Math.round(Math.random() *2)
    console.log(randomNo);
    return ( 
        <div className="banner4">
            <div className="banner4-box row" style={{backgroundImage:`url(./assets/${images[randomNo]})`, backgroundPosition:'center', backgroundSize:'cover'}}>
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12"></div>
                <div className="enrinch-box col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <div className="enrich-header">Enrich the mind</div>
                    <button className="enrich-divider"></button>
                    <div className="enrich-text">
                        Portraying an image in a HAIQ format will ignite your mind to cut through the ordinary and express elegantly. A higher form of narration awaits the world. 
                        Sharp depiction is key to a sophisticated soul.
                    </div>
                    <Link to="create">
                       <button className="btn-enrich">Create A HAIQ</button>
                    </Link>
                    
                </div>
            </div>

            <div className="banner4-bold">Free to publish for 17 days or memorialize forever</div>
        </div>
     );
}
 
export default Enrich;