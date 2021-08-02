import React from 'react';
import ReactDOM from 'react-dom';
import { BsSearch } from 'react-icons/bs'
import Questions from './Questions.jsx';
import App from '../App.jsx';



export default function SearchBar({searchQuery, setSearchQuery = f => f}) {
  return (
    <form action="/" method="get" className="questions-search">
      <label htmlFor="questions-search">
        <span className="visually-hidden">Search questions</span>
      </label>
      {/* <BsSearch className="search-icon"/> */}
      <input
        value={searchQuery}
        onInput={e => setSearchQuery(e.target.value)}
        type="text"
        id="questions-search"
        placeholder="Search for a question"
        name="s"
        className="qa-search-input"
      />
    </form>
  )
};


{/* <button type="submit">Search</button> */}