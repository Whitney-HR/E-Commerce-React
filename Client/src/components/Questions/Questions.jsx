import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import App from '../App.jsx';
import SearchBar from './SearchBar.jsx';

// function Questions() {

// }
class Questions extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <SearchBar />
      </div>
    )
  }
}

export default Questions;