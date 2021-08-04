import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import Overview from './Overview/Overview.jsx';
import Questions from './Questions/Questions.jsx';
import Reviews from './Reviews/Review.jsx';
import Axios from 'axios';
import token from '../env/config.js'
import randomNumber from './Shared/randomNumberInator.js'
import SearchBar from './Questions/SearchBar.jsx';
import HeaderSearchBar from './Shared/HeaderSearchBar.jsx'
import Modal from './Shared/SharedModal.jsx';


var App = () => {
  let [products, productsUpdate] = useState([]);
  // let [selectedProduct, updateSelected] = useState({});
  const { search } = window.location
  const query = new URLSearchParams(search).get('q')
  let [searchQuery, setSearchQuery] = useState(query || '')
  const filterProducts = (products, query) => {
    if (!query) {
      return products
    }
    return products.filter((product) => {
      const productName = product.name.toLowerCase();
      return productName.includes(query);
    })
  }

  useLayoutEffect(() => {
    Axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products', { headers: { Authorization: token } })
      .then(data => {
        productsUpdate(data.data)
      })
      .catch(err => {
        console.log('ERROR!!:', err)
      })
  }, []);



  //Styles
  const margins = {
    'marginLeft': '100px ',
    'marginRight': '100px '
  }


  console.log('True product', products)
  // console.log('selected', selectedProduct)
  // var numRand = randomNumber(0, products.length);
  // updateSelected(products[numRand])
  let selected = {};
  let filteredProducts = filterProducts(products, searchQuery)
  console.log('FILTERED:', filteredProducts)
  if (filteredProducts.length === 1) {
    console.log('In ONE filtered')
    return (
      <div >
        <div style={{ 'marginLeft': '50px ' }}>
          <h1>E-COMMERCE</h1>
        </div>
        <HeaderSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <div style={margins}>
          <Overview id={filteredProducts[0].id} />
          <Questions id={filteredProducts[0].id} name={filteredProducts[0].name} />
          <Reviews id={filteredProducts[0].id} />
        </div>
      </div>
    )
  } else if (filteredProducts.length !== 0) {
    console.log('In MULTI filtered')
    var numRand = randomNumber(0, products.length);
    let showingProduct = products[numRand]
    return (
      <div >
        <div style={{ 'marginLeft': '50px ' }}>
          <h1>E-COMMERCE</h1>
        </div>
        <HeaderSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <div style={margins}>
          <Overview id={showingProduct.id} />
          <Questions id={showingProduct.id} name={showingProduct.name} />
          <Reviews id={showingProduct.id} />
        </div>
      </div>
    )
  } else if (products.length !== 0) {
    console.log('In Not filtered')
    return (
      <div >
        <div style={{ 'marginLeft': '50px ' }}>
          <h1>E-COMMERCE</h1>
        </div>
        <HeaderSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <div style={margins}>
          <Overview id={showingProduct.id} />
          <Questions id={showingProduct.id} name={showingProduct.name} />
          <Reviews id={showingProduct.id} />
        </div>
      </div>
    )
  }



  return (
    <div>
      <div style={{ 'marginLeft': '50px' }}>
        <h1>E-Commerce</h1>
        <p>Still loading</p>
      </div>
    </div>
  )
};

export default App;


  // var numRand = randomNumber(0, products.length);


  // var item = {
  //   name: 'Loading please wait'
  // };


  // if (products.length) {
  //   item = products[numRand];


  // useEffect(() => {
  //   console.log('PRODUCTS:', products)
  //   console.log('SELECTED PRODUCTS:', selectedProduct)
  //   var numRand = randomNumber(0, products.length);
  //   updateSelected(products[numRand])
  // }, [])

  // console.log(selectedProduct)

  // if (filteredProducts.length === 1) {
  //   updateSelected(filteredProducts[0])
  // }