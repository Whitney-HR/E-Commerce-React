import React, { useState, useEffect } from 'react';
import axios from 'axios';
import token from '/Client/src/env/config.js';
import Tracker from '../Shared/Tracker.jsx';

var Dropdowns = (props) => {
  const [currentStockAtSize, updateCurrentSAS] = useState();
  const [currentSku, updateCurrentSku] = useState();

  const dropDown = {
    'width': '300px',
    'height': '50px',
    'border': '1px solid black',
    'fontSize': '18px',
    'color': 'black',
    'backgroundColor': '#eee',
    'borderRadius': '5px',
    'boxShadow': '4px 4px #ccc',
    'margin': '10px'
  }

  var skus = Object.keys(props.currentStyle.skus);
  var skuStorage = props.currentStyle.skus;

  var areThereSizes = 0;
  var stock = 'Select Size';


  skus.forEach((sku, index) => {
    if (skuStorage[sku]['quantity'] > 0) {
      areThereSizes ++;
    }
  })

  if (areThereSizes === 0) {
    stock = 'Out of Stock';
  }

  var quantity = '-';

  if (currentStockAtSize) {
    quantity = '1';
  }

  var stockQuantity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15];

  var selectHandler = (e) => {
    var q = skuStorage[e.target.value]['quantity']
    updateCurrentSAS(q);
    updateCurrentSku(e.target.value);
    Tracker('Size Select', 'OverView');
  }

  var addToCart = (e) => {
    e.preventDefault();
    Tracker('Add to Cart', 'OverView');
    axios.post (`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/cart`, {"sku_id": currentSku} , { headers: {  Authorization: token } })
    .then(data => {
      alert('Added to Cart!');
    })
    .catch(err => {
      console.log(err)
    });
  }

  useEffect (() => {
    return (
      <div >
        <div>
          <select style={dropDown} id="SizeSelector" onChange={selectHandler} >
            <option hidden={true} value='apples' >{stock}</option>
            {skus.map((sku, index) => {
              if (skuStorage[sku]['quantity'] > 0) {
                return (
                  <option key={sku} value={sku} >{skuStorage[sku]['size']}</option>
                )
              }
            })}
          </select>
        </div>
        <div>
          <select style={dropDown} onChange={(e)=> { Tracker('Quantity Selector', 'OverView');}}>
            <option hidden={true}>{quantity}</option>
            {stockQuantity.map((number, index) => {
              if (number <= currentStockAtSize) {
                return (
                  <option key={index}>{number}</option>
                )
              }
            })}
          </select>
        </div>
        <div>
          <button style={dropDown} disabled={!currentSku} onClick={addToCart}>
            add to cart
          </button>
        </div>
      </div>
    )
  }, [props]);

  return (
    <div>
      please wait
    </div>
  )
};

export default Dropdowns;
