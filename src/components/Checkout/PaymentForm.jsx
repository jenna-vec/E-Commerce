import React from 'react';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Review from './Review';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = ({ checkoutToken, nextStep, backStep, shippingData, onCaptureCheckout }) => {
  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });

    if (error) {
      console.log('[error]', error);
    } else {
      const shippingName = shippingData.firstName + " " + shippingData.lastName;
      const orderData = {
        line_items: checkoutToken.live.line_items,
        customer: { 
          firstname: shippingData.firstName, 
          lastname: shippingData.lastName, 
          email: shippingData.email 
        },
        shipping: { 
          name:shippingName, 
          street: shippingData.address, 
          town_city: shippingData.city, 
          county_state: shippingData.shippingSubdivision, 
          postal_zip_code: shippingData.zipCode, 
          country: "US" 
        },
        fulfillment: { shipping_method: shippingData.subdivision },
        payment: {
          gateway: 'stripe',
          card: {
            token: paymentMethod.id,
          }
        },
      };

      onCaptureCheckout(checkoutToken.id, orderData);
      console.log(orderData);
      nextStep();
    }
  };

  return (
    <div className='form-div'>
      <h4>Order Description</h4>
      <Review checkoutToken={checkoutToken} />
      <h4>Payment method</h4>
      <div className='stripe'>
        <Elements stripe={stripePromise}>
          <ElementsConsumer>{({ elements, stripe }) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <div className='stripe-card'><CardElement /></div>
              <br /> <br />
              <div className='button-group'>
                <button id="active-form-button" onClick={backStep}>Back</button>
                <button id="active-form-button" type="submit" disabled={!stripe}>
                  Confirm Payment
                </button>
              </div>
            </form>
          )}
          </ElementsConsumer>
        </Elements>
      </div>
    </div>
  );
};

export default PaymentForm;
