import React from 'react';

//styles
import '../css/haiku-card.css'

const HaikuCard = () => {
    return ( 
        <div className="haiku-cards">
            <div className="haik-card">
                <div className="haiku-card-text">
                     Over the wintry Forest, wind howl in rage with no leaves to blow
                </div>
                <div className="haiku-card-small-text">
                    -Nastune Soseki, “Over the Wintry”
                </div>
            </div>

            <div className="haik-card">
                <div className="haiku-card-text">
                    love between us is speech and breath. loving you is a long river running
                </div>
                <div className="haiku-card-small-text">
                    -Sonia Sanchez, “Haiku [for you]"
                </div>
            </div>

            <div className="haik-card">
                <div className="haiku-card-text">
                    A world of dew, And within every dewdrop A world of struggle
                </div>
                <div className="haiku-card-small-text">
                    -Kobayashi Issa, “A World of Dew”
                </div>
            </div>
        </div>
     );
}
 
export default HaikuCard;