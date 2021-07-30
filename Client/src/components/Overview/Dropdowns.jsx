import React, { useState, useEffect } from 'react';

var Dropdowns = (props) => {
  // console.log(props.currentStyle);
  var skus = Object.keys(props.currentStyle.skus);
  var skuStorage = props.currentStyle.skus;

  // var sizes = () => {
  //   for(var x in skus) {
  //     if (skus[x]['quantity'] > 0) {
  //       return (
  //         <option key={x}>
  //           {skus[x]['size']}
  //         </option>
  //       );
  //     }
  //   }
  // }
  var areThereSizes = 0;
  var stock = 'Select Size';

  skus.forEach((sku, index) => {
    if (skuStorage[sku]['quantity'] > 0) {
      areThereSizes ++;
    }
  })

  if (areThereSizes === 0) {
    stock = 'Out of Stock'
  }


  return (
    <div >
      drop downs
      <div>
        <select>
          <option disable select hidden>{stock}</option>
          {skus.map((sku, index) => {
            if (skuStorage[sku]['quantity'] > 0) {
              return (
                <option key={sku}>{skuStorage[sku]['size']}</option>
              )
            }
          })}
        </select>
      </div>
    </div>

  )
};

export default Dropdowns;

