import React, { useState } from 'react';
import './products.css';
import Product from './Product/Product';

const SearchResults = ({ products }) => {

  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;

  const [sorted, setSort] = useState("low");
  const handleChange = (event) => {
    setSort(event.target.value);
  }

  if (sorted === "low") {
    products.sort(function (a, b) {
      return a.price.formatted - b.price.formatted;
    });
  }
  if (sorted === "high"){
    products.sort(function (a, b) {
      return b.price.formatted - a.price.formatted;
    });
  }
  if (sorted === "newest"){
    products.sort(function (a, b) {
      return b.sku - a.sku;
    });
  }

  return(
    <div className="product-main multiple-items">
        <form>
            <select value={sorted} onChange={handleChange} className="sort-drop-down">
            <option value="low">low to high</option>
            <option value="high">high to low</option>
            <option value="newest">newest</option>
            </select>
        </form>
        <div className="product-box">
            {products.map((product) => (
              <Product key={product.id} product={product}/>
            ))}
        </div>
    </div>
  )
};

export default SearchResults;