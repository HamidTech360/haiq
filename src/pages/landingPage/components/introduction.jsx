import React from 'react';

//styles
import '../css/introduction.css'

const Introduction = () => {
    return ( 
        <div className="introduction">
           <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 intro-grid-1">
                    <div className="introduction">
                        <div className="introduction-header">Introduction</div>
                        <button className="introduction-divider"></button>
                        <div className="introduction-normal">
                            <p>
                                A haiku is the perfect literary vehicle for bite-sized observations and contemplations. Limited to 17 syllables, 
                                there isn't much room for tiptoeing around your idea-it begins and ends in three concise lines.  We've been writing haikus for a while now at Warby Parker.
                            </p> 

                            <p>
                                They're inscribed on the walls of our headquarters, slipped into emails, and peppered into daily correspondence. 
                                This book is a trim anthology of some favorites that we've composed over the years, arranged in no particular order. (We promise the title makes sense by the end.)
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 intro-grid-2">
                    <div className="intro-box">
                        <div className="intro-inner-box text-center">
                            <span className="intro-box-text">
                                Two Stages in life: Before you get glasses & shortly thereafter
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
     );
}
 
export default Introduction;