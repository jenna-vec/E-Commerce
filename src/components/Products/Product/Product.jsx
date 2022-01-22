import React from 'react';
import { Link } from "react-router-dom";
import '../products.css';

const Product = ({ product }) => {

  return (
        <div className="products-listing" id={product.id}>
          <Link to='/item' state={{product: product}} >
            <img alt={product.name} className="list-image" src={product.image.url} title={product.name} />
            <h4>{product.name}</h4>
            <p>${product.price.formatted}</p>
          </Link>
        </div>
    )
};

export default Product;
