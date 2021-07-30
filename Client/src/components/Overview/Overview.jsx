import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import token from '/Client/src/env/config.js'
import Features from './Features';
import Hub from './Hub';



var Overview = (props) => {
  const [product, productUpdate] = useState({});
  const [styles, stylesUpdate] = useState({});
  const [chosenStyle, updateChosenStyle] = useState({});

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

  var prodst = {'results': [ { 'name': 'Patience', 'photos': [{'url':'a', 'thumbnail_url': 'b'}], 'skus': {'12345': {'quantity': 7, 'size': 'M'}} } ] } ;

  var stylesKeys = Object.keys(styles)
  if (stylesKeys.length > 0 ) {
    prodst = styles;
  }

  const shrinkToLeft = {
    maxWidth: '600px',
    float: 'left'
  }

  return (
    <div className="overview-body">
      <div className="to-the-right">
        <h3>Stars</h3>
        {/* <h3>{product.category}</h3>
        <h2>{product.name}</h2> */}
        <Hub styles={prodst} name={product.name} category={product.category}/>
        <h3>share</h3>
      </div>
      <div style={shrinkToLeft}>
        <h3>{product.slogan}</h3>
        <h5>{product.description}</h5>
      </div>
      <div >
        <Features feat={prodft}/>
      </div>
    </div>
  )
};

export default Overview;