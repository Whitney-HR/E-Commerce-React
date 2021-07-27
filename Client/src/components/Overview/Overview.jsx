import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import token from '/Client/src/env/config.js'
import randomNumber from '../Shared/randomNumberInator.js'

var Overview = (props) => {
  const [product, productUpdate] = useState({});

  useEffect (() => {
    Axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/${props.id}`,   { headers: {  Authorization: token } })
      .then(data => {
        productUpdate(data.data);
      });
  }, [props.id]);


  return (
    <div>
      <h1>
        {product.name}
      </h1>
    </div>

  )
};

export default Overview;