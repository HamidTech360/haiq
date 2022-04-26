import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import {apiUrl} from '../../config/config.json'
import axios from 'axios'

const Payment = ()=>{
    const handleToken = async (token, address)=>{
        const response = await axios.post(`${apiUrl}/haiku/pay`, {token})
        console.log(response.data);
    } 
    return (
        <div className="payment">
            <div className="payment-box">
                <div className="memorialize-modal">
                        <div className="memorialize-modal-header text-center">Memorialize your craft</div>
                        <div className="memorialize-modal-text text-center">
                            Commemorate your work. rise to the next level and show the world your creation. 
                        </div>
                        <div className="memorialize-modal-text text-center">
                            Make it last exquisitely forever. 
                        </div>

                        <div className="cost-box text-center">
                            <span className="cost-label">COST: </span>
                            <span className="cost-price">$100</span>
                        </div>

                        <div className="memorialize-modal-btns">
                        <StripeCheckout
                            label='Pay now'
                            className='btn-IWTMMH'
                            id="btn-pay"
                            token={handleToken}
                            stripeKey='pk_test_51Kqg3REu5Qc79aW8jrKgq0qyQYwX5wvEAoxxS3Evq4ZrxesK9UPhHThsEaUjLCY9HRyIZOjmG21m3L65xBI4xhEq00r53djqjM'
                            amount={10000}
                            name='haik'
                            ComponentClass='div'
                            billingAddress
                            shippingAddress
                        />
                        </div>
                </div>
            </div>
        </div>
    )
}

export default Payment