import React, { useState, useEffect, useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';
import Overview from './Overview/Overview.jsx';
import Questions from './Questions/Questions.jsx';
import Reviews from './Reviews/Review.jsx';
import Axios from 'axios';
import token from '../env/config.js'
import randomNumber from './Shared/randomNumberInator.js'
import SearchBar from './Questions/SearchBar.jsx';
import Modal from './Shared/SharedModal.jsx';


var App = () => {
  const [products, productsUpdate] = useState([]);

  React.useEffect(() => {
    Axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products',   { headers: {  Authorization: token } })
      .then(data => {
        productsUpdate(data.data);
      });
    }, []);

    var numRand = randomNumber(0, products.length);


    var item = {
      name: 'Loading please wait'
    };

    const margins = {
      'marginLeft': '100px ',
      'marginRight': '100px '
    }

    if (products.length) {
      item = products[numRand];

    }



    return (
      <div >
        <div style={{'marginLeft': '50px '}}>
          <h1>E-COMMERCE</h1>
        </div>
        <div style={margins}>
          <Overview id={item.id}/>
          <br/>
          {/* <Questions id={item.id} name={item.name} />
          <Reviews id={item.id}/> */}
        </div>
      </div>
    )





};

export default App;

