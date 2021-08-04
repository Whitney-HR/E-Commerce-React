import React, {useState, useRef} from 'react';
import ReactDOM from 'react-dom';
import { BsSearch } from 'react-icons/bs'
import App from '../App.jsx';

export default function HeaderSearchBar({searchQuery, setSearchQuery = f => f}) {
  // let [query, setQuery] = useState('')
  const query = useRef();
  const setSearch = (e) => {
    e.preventDefault();
    let newQuery = query.current.value
    setSearchQuery(newQuery);
    query.current.value = ''
  }
  return (
    <form action="/" method="get" >
      <label htmlFor="header-search">
        <span className="visually-hidden">Search Products</span>
      </label>
      <input
        // value={searchQuery}
        ref={query}
        type="text"
        id="header-search"
        placeholder="Search for products"
        name="q"
      />
      <button type="submit" onClick={setSearch}>Search</button>
    </form>
  )
}