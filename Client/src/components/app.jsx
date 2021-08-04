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
<<<<<<< HEAD
  const [products, productsUpdate] = useState([]);

  const margins = {
    marginLeft: '5%',
    marginRight: '5% '
  }

  useEffect(() => {
    Axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products',   { headers: {  Authorization: token } })
=======
  let [products, productsUpdate] = useState([]);
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
>>>>>>> 460ad788adb13467a370256f958a1a4b41cf0665
      .then(data => {
        productsUpdate(data.data)
      })
      .catch(err => {
        console.log('ERROR!!:', err)
      })
  }, []);


<<<<<<< HEAD
    var item = {
      name: 'Loading please wait'
    };

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
          <Questions id={item.id} name={item.name} />
          <Reviews id={item.id}/>
        </div>
      </div>
    )
};
=======

  //Styles
  // const margins = {
  //   'marginLeft': '100px ',
  //   'marginRight': '100px '
  // }




  let selected = {};
  let filteredProducts = filterProducts(products, searchQuery)
  console.log('FILTERED:', filteredProducts)
  if (filteredProducts.length === 1) {
    return (
      <>
        <header className="header-container">
          <h1 className="header-title">Whitney Technological Solutions</h1>
          <HeaderSearchBar className="header-search" searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </header>
        <main className="main-container">
          <Overview id={filteredProducts[0].id} />
          <Questions id={filteredProducts[0].id} name={filteredProducts[0].name} />
          <Reviews id={filteredProducts[0].id} />
        </main>
      </>
    )
  } else if (filteredProducts.length !== 0) {
    var numRand = randomNumber(0, products.length);
    let showingProduct = products[numRand]
    return (
      <>
        <header className="header-container">
          <h1 className="header-title">Whitney Technological Solutions</h1>
          <HeaderSearchBar className="header-search" searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </header>
        <main className="main-container">
          <Overview id={showingProduct.id} />
          <Questions id={showingProduct.id} name={showingProduct.name} />
          <Reviews id={showingProduct.id} />
        </main>
      </>
    )
  } else if (products.length !== 0) {
    console.log('In Not filtered')
    return (
      <>
        <header className="header-container">
          <h1 className="header-title">Whitney Technological Solutions</h1>
          <HeaderSearchBar className="header-search" searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </header>
        <main className="main-container">
          <Overview id={showingProduct.id} />
          <Questions id={showingProduct.id} name={showingProduct.name} />
          <Reviews id={showingProduct.id} />
        </main>
      </>
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
>>>>>>> 460ad788adb13467a370256f958a1a4b41cf0665


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