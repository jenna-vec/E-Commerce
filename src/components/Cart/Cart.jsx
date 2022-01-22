import React from 'react';
import { Link } from 'react-router-dom';

import CartItem from './CartItem/CartItem';
import './cart.css';


const Cart = ({ cart, onRemoveFromCart }) => {


  const renderEmptyCart = () => (
    <>
      <div>  </div>
      <div className='empty-cart'>
        <h4>You have no items in your shopping cart.</h4>
        <Link to="/">start adding some</Link>
      </div>
      <div>  </div>
    </>
  );

  const renderCart = () => (
    <>
      <div className="cart-item-page">
          {cart.line_items.map((lineItem) => (
            <CartItem key={lineItem.id} item={lineItem} onRemoveFromCart={onRemoveFromCart} />
          ))}
        </div>
      <div className="totals">
        <h4 id="order-title">Order Summary</h4>
        <div className="pricing">
          <div id="line"></div>
          <div className='order-details'>
            <p>subtotal</p>
            <p>{cart.subtotal.formatted_with_symbol}</p>
          </div>
        </div>
        <Link to="/checkout" className="checkout-button">
          <button className="checkout" type="button">checkout</button>
        </Link>
      </div>
    </>
  );

  return (
    <div className='cart-body'>
      <h2 id="cart-title">CART</h2>
      <div className="cart-page">
        { !cart.line_items.length ? renderEmptyCart() : renderCart() }
      </div>
    </div>
  );
};

export default Cart;
