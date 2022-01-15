import React from 'react';

import '../cart.css'

const CartItem = ({ item , onRemoveFromCart }) => {

  const handleRemoveFromCart = (lineItemId) => onRemoveFromCart(lineItemId);

  return (
    <div className='cart-item-div'>
      <img id="cart-pic" alt={item.name} src={item.image.url} />
      <div id="cart-description">
        <h4>{item.name}</h4>
        <p>{item.price.formatted}</p>
        <p>{item.selected_options[0].option_name}</p>
      </div>
      <div className="exit-flex" type="button" onClick={() => handleRemoveFromCart(item.id)}>x</div>
    </div>
  );
};

export default CartItem;
