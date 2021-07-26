import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import token from '/Client/src/env/config.js'
import randomNumber from '../Shared/randomNumberInator.js'

var Overview = () => {
  const [products, productsUpdate] = useState([]);

  useEffect (() => {
    Axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products',   { headers: {  Authorization: token } })
      .then(data => {
        productsUpdate(data.data);
      });
  }, []);

  var numRand = randomNumber(0, products.length);

  var item = {
    name: 'Loading please wait'
  };

  if (products.length) {
    item = products[numRand];
  }

  return (
    <div>
      <div>{item.category}</div>
      <div><h3>{item.name}</h3></div>
      <div>{item.default_price}</div>
      <div>
        <p>{item.slogan}</p>
        <p>{item.description}</p>
      </div>
    </div>
  )
};

export default Overview;