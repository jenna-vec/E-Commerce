import React, { useState, useEffect } from 'react';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import { Link } from 'react-router-dom';
import { commerce } from '../../library/commerce'

import './checkout.css';

const steps = [
  {number: 1, title: 'Shipping Address'},
  {number: 2, title: 'Payment Details'}
];

const Checkout = ({ cart, subdivisions, onCaptureCheckout, order, error }) => {

  const [checkoutToken, setCheckoutToken] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState({});

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  useEffect(() => {
    if (cart.id) {
      const generateToken = async () => {
        try {
          const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });
          setCheckoutToken(token);
        } catch {
          console.log("error")
        }
      };

      generateToken();
    }
  }, [cart]);

  const test = (data) => {
    setShippingData(data);
    nextStep();
  };


  let Confirmation = () => (
    <div className='form-div'>
      <h4>Thank you for your purchase !</h4>
      <p>Order ref: </p>
      <br />
      <Link to="/">return to homepage</Link>
    </div>
  );

  if (error) {
    Confirmation = () => (
      <div className='form-div'>
        <h4>Error: {error}</h4>
        <Link to="/">return to homepage</Link>
      </div>
    );
  }
  
  const Form = () => (activeStep === 0
    ? <AddressForm subdivisions={subdivisions} checkoutToken={checkoutToken} nextStep={nextStep} setShippingData={setShippingData} test={test} />
    : <PaymentForm checkoutToken={checkoutToken} nextStep={nextStep} backStep={backStep} shippingData={shippingData} onCaptureCheckout={onCaptureCheckout} />);

  return (
    <div className="checkout-page">
        <div className="stepper">
          {steps.map(({ number, title }) => (
            <li key={number} className="step">
              <div className='circle'>{number}</div>
              <p className="title">{title}</p>
            </li>
          ) )}
        </div>
        <div className='active-form'>
        {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
        </div>
    </div>
  );
};

export default Checkout;