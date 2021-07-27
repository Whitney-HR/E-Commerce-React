import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import App from '../App.jsx';
import SearchBar from './SearchBar.jsx';
import AddQuestion from './AddQuestion.jsx';
import MoreAnsweredQuestion from './MoreAnsweredQuestions.jsx';
import QuestionFeed from './QuestionFeed.jsx';

export default function Questions(props) {
  return (
    <div>
      {/* <p>{props.id}</p> */}
      {/* <SearchBar /> */}
      <QuestionFeed id={props.id}/>
      {/* <MoreAnsweredQuestion /> <AddQuestion /> */}
      {/* <h1>Q and A</h1> */}
    </div>
  )
};
