import React from 'react';

//styles
import '../css/haiku-card.css'

const HaikuCard = () => {
    return ( 
        <div>
        <div className="haiku-cards text-center">
            <div className="haik-card">
                <div className="haiku-card-text">
                     Over the wintry Forest, <br /> wind howl in rage with no <br /> leaves to blow
                </div>
                <div className="haiku-card-small-text">
                    -Nastune Soseki, “Over the Wintry”
                </div>
            </div>

            <div className="haik-card">
                <div className="haiku-card-text">
                  Two Stages in life: <br /> Before you get glasses <br /> & shortly thereafter
                </div>
                <div className="haiku-card-small-text">
                    -Warby Parker
                </div>
            </div>

            <div className="haik-card">
                <div className="haiku-card-text">
                    A world of dew, And <br /> within every dewdrop <br /> A world of struggle
                </div>
                <div className="haiku-card-small-text">
                    -Kobayashi Issa, “A World of Dew”
                </div>
            </div>
        </div>
        </div>
     );
}
 
export default HaikuCard;