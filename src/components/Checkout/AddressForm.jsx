import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { commerce } from '../../library/commerce';
import FormInput from './CustomTextField'
import './checkout.css';

const AddressForm = ({ subdivisions, checkoutToken, test }) => {

  const [shippingSubdivision, setShippingSubdivision] = useState('');
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState('');

  const methods = useForm();

  const fetchShippingOptions = async (checkoutTokenId, stateProvince = null) => {
    const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country: 'US', region: stateProvince });
    setShippingOptions(options);
  };

  useEffect(() => {
    if (shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingSubdivision);
  }, [checkoutToken, shippingSubdivision]);


  return (
    <div className='form-div'>
      <h4>Shipping Address</h4>
      <br />
      <FormProvider { ...methods}>
        <form className='address-form' id='address-form' onSubmit={e => {
          e.preventDefault();
          var AddressData = {
						"firstName": e.target[0].value,
						"lastName": e.target[1].value,
						"email": e.target[2].value,
						"address": e.target[3].value + " " + e.target[4].value,
            "city": e.target[5].value,
            "subdivision": e.target[6].value,
            "zipCode": e.target[7].value,
            "shippingOption": e.target[8].value,
					}

          if(AddressData.firstName === '' || AddressData.lastName === '' || 
              AddressData.email === '' || AddressData.address === '' || AddressData.city === '' ||
              AddressData.subdivision === '' || AddressData.zipCode === "" || AddressData.shippingOption === ""){
            alert("Error: All fields required.")
          }
          else{
            test(AddressData);
          }
        }}>
          <div id='address-flex'>
            <p className='tiny'>Contact</p>
            <FormInput name='firstName' label='First Name'/>
            <FormInput name='lastName' label='Last Name'/>
            <FormInput name='email' label='Email' />
          </div>
          <div id='address-flex'>
            <p className='tiny'>Address</p>
            <FormInput name='address' label='Address'  />
            <FormInput name='address2' label='Address Line 2' />
            <FormInput name='city' label='City' />
            <select name='subdivision' className='address-select' value={shippingSubdivision} onChange={e => {
              e.preventDefault()
              setShippingSubdivision(e.target.value)}}>
              <option>State</option>
              {Object.entries(subdivisions).map(([code, name]) => ({ id: code, label: name })).map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
              </select>
            <FormInput name='zipCode' label='Zip Code' />
          </div>
          <div id='address-flex'>
            <p className='tiny'>Shipping</p>
            <select name='shippingOption' className='address-select' value={shippingOption} onChange={e => {
              e.preventDefault();
              setShippingOption(e.target.value)}}>
                <option>Shipping Option</option>
                {shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})` })).map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
          </div>
          <div className='button-group'>
            <Link to="/cart"><button id="active-form-button">Back to Cart</button></Link>
            <button type='submit' id="active-form-button">Next</button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default AddressForm;