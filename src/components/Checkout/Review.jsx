import React from 'react';

const Review = ({ checkoutToken }) => (
  <div className='review-div'>
    <div>
      <p className='review-title summary'>Order Summary</p>
      {checkoutToken.live.line_items.map((product) => (
        <div className='review-products' key={product.name}>
          <p>{product.name}</p>
          <p>{product.quantity}</p>
          <p>{product.line_total.formatted_with_symbol}</p>
        </div>
      ))}
    </div>
    <div className="review-total">
      <p className='review-title'>Total</p>
      <p>{checkoutToken.live.subtotal.formatted_with_symbol}</p>
    </div>
  </div>
);

export default Review;
