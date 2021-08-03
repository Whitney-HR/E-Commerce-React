import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import Axios from 'axios';
import token from '/Client/src/env/config.js';
import Features from './Features';
import Hub from './Hub';



var Overview = (props) => {
  const [product, productUpdate] = useState({});
  const [styles, stylesUpdate] = useState({});
  const [chosenStyle, updateChosenStyle] = useState({});
  const [reviewCount, updateReviewCount] = useState();
  const [reviewMeta, updateReviewMeta] = useState();

  useEffect (() => {
    Axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${props.id}`,   { headers: {  Authorization: token } })
      .then(data => {
        productUpdate(data.data);
      })
      .catch(err => {
        console.log(err)
      });

    Axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${props.id}/styles`,   { headers: {  Authorization: token } })
      .then(data => {
        stylesUpdate(data.data);
      })
      .catch(err => {
        console.log(err)
      });

    Axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/?product_id=${props.id}&sort=relevant`,   { headers: {  Authorization: token } })
      .then(data => {
        updateReviewCount(data.data.results.length);
      })
      .catch(err => {
        console.log(err)
      });

    Axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/meta/?product_id=${props.id}`,   { headers: {  Authorization: token } })
    .then(data => {
      updateReviewMeta(data.data.ratings);
    })
    .catch(err => {
      console.log(err)
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

  const style = {
    'height': '1000px',

  }
  const shrinkToLeft = {
    maxWidth: '800px',
    float: 'left'
  }

  if (reviewMeta && reviewCount && product && styles && chosenStyle) {
    return (
      <div  style={style}>
        <div >
          <Hub styles={prodst} name={product.name} category={product.category} reviewCount={reviewCount} reviewMeta={reviewMeta}/>
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
  } else {
    return (
      <div> Loading Please Wait</div>
    )
  }
};

export default Overview;