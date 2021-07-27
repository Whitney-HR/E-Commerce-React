import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import App from '../App.jsx';
import SearchBar from './SearchBar.jsx';
import AddQuestion from './AddQuestion.jsx';
import MoreAnsweredQuestion from './MoreAnsweredQuestions.jsx';

export default function Questions() {
  return (
    <div>
      <SearchBar />
      <MoreAnsweredQuestion /> <AddQuestion />
    </div>
  )
};


// class Questions extends React.Component {
//   constructor(props) {
//     super(props);

//   }

//   render() {
//     return (
//       <div>
//         <SearchBar />
//       </div>
//     )
//   }
// }