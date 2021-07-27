import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import token from '/Client/src/env/config.js'
import Features from './Features';
import Hub from './Hub';




var Overview = (props) => {
  const [product, productUpdate] = useState({});
  const [styles, stylesUpdate] = useState({});

  useEffect (() => {
    Axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/${props.id}`,   { headers: {  Authorization: token } })
      .then(data => {
        productUpdate(data.data);
      });

    Axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/products/${props.id}/styles`,   { headers: {  Authorization: token } })
      .then(data => {
        stylesUpdate(data.data);
      });

  }, [props.id]);

  var prodft = [{'feature': 'loading please wait'}];

  if (product.features) {
    prodft = product.features;
  }

  var prodst = {'results': [ { 'name': 'Patience', 'photos': ['loading please wait'] } ] } ;

  var stylesKeys = Object.keys(styles)
  if (stylesKeys.length > 0 ) {
    console.log(true);
    prodst = styles;
  }

  return (
    <div className="overview-body">
      <div className="to-the-left">
        images
      </div>
      <div className="to-the-right">
        <h3>Stars</h3>
        <h3>{product.category}</h3>
        <h2>{product.name}</h2>
        <h3>{product.default_price}</h3>
        <Hub styles={prodst}/>
        <h3>share</h3>
      </div>
      <div className="to-the-left">
        <h3>{product.slogan}</h3>
        <h5>{product.description}</h5>
      </div>
      <div className="to-the-right">
        <Features feat={prodft}/>
      </div>
    </div>
  )
};

export default Overview;