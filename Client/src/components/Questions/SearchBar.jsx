import React from 'react';
import ReactDOM from 'react-dom';
import Questions from './Questions.jsx';
import App from '../App.jsx';



export default function SearchBar() {
  return (
    <form>
      <label >
        <span className="QA-search"></span>
      </label>
      <input
        type="text"
        placeholder="Have A Question? Search For Answers!"
        name="s"
      />
      <button type="submit">Search</button>
    </form>
  )
};