import React, { useState, useEffect, useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';
import Overview from './Overview/Overview.jsx';
import Questions from './Questions/Questions.jsx';
import Reviews from './Reviews/Review.jsx';
import Axios from 'axios';
import token from '../env/config.js'
import randomNumber from './Shared/randomNumberInator.js'
import SearchBar from './Questions/SearchBar.jsx';


var App = () => {
  const [products, productsUpdate] = useState([]);

  useLayoutEffect (() => {
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
      <h1>E-COMMERCE</h1>
      {/* <div>{item.category}</div>
      <div><h3>{item.name}</h3></div>
      <div>{item.default_price}</div>
      <div>
        <p>{item.slogan}</p>
        <p>{item.description}</p>
      </div>
        {/* <h2>{item.id}</h2> */}
      <Overview id={item.id}/>
      <Questions id={item.id}/>
    </div>

  )
};

export default App;

