import React from 'react';
import { Link } from 'react-router-dom';

//styles
import '../css/banner4.css'

const Banner4 = () => {
    const images = ['banner4.png', 'banner4b.png', 'banner4c.png']
    const randomNo = Math.round(Math.random() *2)
    console.log(randomNo);
    return ( 
        <div className="banner4">
            <div className="banner4-box " style={{backgroundImage:`url(./assets/${images[randomNo]})`}}>
                <div className="enrinch-box pull-right">
                    <div className="enrich-header">Enrich the mind</div>
                    <button className="enrich-divider"></button>
                    <div className="enrich-text">
                        Portraying an image in a HAIQ format will ignite your mind to cut through the ordinary and express elegantly. A higher form of narration awaits the world. 
                        Sharp depiction is key to a sophisticated soul.
                    </div>
                    <Link to="create">
                       <button className="btn-enrich">Create A Haiku</button>
                    </Link>
                    
                </div>
            </div>

            <div className="banner4-bold">Publish for free for 17 days only or memorialize forever</div>
        </div>
     );
}
 
export default Banner4;