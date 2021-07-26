import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import token from '/Client/src/env/config.js'

var Overview = () => {
  const [products, productsUpdate] = useState([])
  useEffect (() => {
    Axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products',   { headers: {  Authorization: token } })
      .then(data => {
        productsUpdate(data.data);
      });
  }, []);




  return (
    <div>
      <ul>
        {products.map(item => (
          <li>{item.name}</li>
        ))}
      </ul>
    </div>
  )
};

export default Overview;