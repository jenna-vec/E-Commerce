import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'
import '../products.css';


const ProductDisplay = ({onAddToCart}) => {
    
    const location = useLocation();
    const { product } = location.state;

    const variantId = product.variant_groups[0].id;
    const sizes = product.variant_groups[0].options;
    const id = product.id;

    const [itemSize, setItemSize] = useState(sizes[0].id);
    const handleChange = (e) => {
      setItemSize(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onAddToCart(id, 1, {[variantId]: itemSize});
    }

    return (
        <div className="product-main single-item">
            <div className="item-div">
                <div className="product-feature">
                    <img alt={product.name} className="product-image" id="product-add" src={product.image.url} title={product.name} />
                </div>
                <div className="product-description">
                    <h4>{product.name}</h4>
                    <p>{product.description.slice(3, -4)}</p>
                    <p>{product.price.formatted}</p>
                    <p className='small-text'>Lorem ipsum dolor sit amet, 
                    consectetur adipiscing elit, sed do eiusmod tempor incididunt 
                    ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                    quis nostrud exercitation ullamco laboris nisi ut aliquip 
                    ex ea commodo consequat.</p>
                    <div className='addToCart'>
                        <form className="add-to-bag" onSubmit={handleSubmit}>
                            <select value={itemSize} onChange={handleChange} id="size-options">
                                {sizes.map((size) => (
                                <option key={size.name} value={size.id} >{size.name}</option>
                                ))}
                            </select>
                            <button className="add-button" type="submit">add to bag</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDisplay;
