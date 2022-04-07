import React from 'react'

//sibling components
import HaikuCard from './haiku-card';
import Introduction from './introduction';

//styles
import '../css/banner2.css'

const Banner2 = () => {
    return ( 
        <div className="banner-2">
            <div className="what-is-haiku">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 ">
                        <img src="../../../assets/laura.png" alt="laura" className="lauara-img" />
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 ">
                        <div className="what-is-haiku-text">
                            <div className="WIH-header">What is Haiku</div>
                            <button className="WIH-divider"></button>
                            <div className="WIH-normal">
                                A historically Japanese unrhymed poem consisting of three lines and seventeen syllables. It’s arranged five, seven, five respectively. The origin of this format from Japan emerged in 1895-1900. 
                                Allusions and contrast often in native fuel traditional haiku’s.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <HaikuCard/>
            <Introduction/>
        </div>
     );
}
 
export default Banner2;