import React, { useState, useEffect } from 'react';

var Dropdowns = (props) => {
  const [currentStockAtSize, updateCurrentSAS] = useState();

  var skus = Object.keys(props.currentStyle.skus);
  var skuStorage = props.currentStyle.skus;

  var areThereSizes = 0;
  var stock = 'Select Size';
  var quantity = '-';

  skus.forEach((sku, index) => {
    if (skuStorage[sku]['quantity'] > 0) {
      areThereSizes ++;
    }
  })

  if (areThereSizes === 0) {
    stock = 'Out of Stock';
  }

  if (currentStockAtSize) {
    quantity = '1';
  }

  var stockQuantity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 15];

  var selectHandler = (e) => {
    updateCurrentSAS(e.target.value);
  }

  const dropDown = {
    'width': '120px',
    'height': '30px',
    'border': '1px solid #999',
    'fontSize': '18px',
    'color': '#1c87c9',
    'backgroundColor': '#eee',
    'borderRadius': '5px',
    'boxShadow': '4px 4px #ccc',
  }
  return (
    <div >
      <div>
        <select style={dropDown} id="SizeSelector" onChange={selectHandler}>
          <option hidden={true} value='apples'>{stock}</option>
          {skus.map((sku, index) => {
            if (skuStorage[sku]['quantity'] > 0) {
              return (
                <option key={sku} value={skuStorage[sku]['quantity']}>{skuStorage[sku]['size']}</option>
              )
            }
          })}
        </select>
      </div>
      <div>
        <select style={dropDown}>
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
    </div>

  )


};

export default Dropdowns;

//onClick={() => updateCsAs(skuStorage[sku]['quantity'])}