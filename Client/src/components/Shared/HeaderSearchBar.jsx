import React from 'react';
import ReactDOM from 'react-dom';
import { BsSearch } from 'react-icons/bs'
import App from '../App.jsx';

export default function HeaderSearchBar() {
  return (
    <form action="/" method="get" >
      <label htmlFor="header-search">
        <span className="visually-hidden">Search Products</span>
      </label>
      <input
        type="text"
        id="header-search"
        placeholder="Search for products"
        name="q"
      />
      <button type="submit">Search</button>
    </form>
  )
}