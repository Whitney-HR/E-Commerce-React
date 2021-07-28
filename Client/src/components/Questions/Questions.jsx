import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import App from '../App.jsx';
import SearchBar from './SearchBar.jsx';
import AddQuestion from './AddQuestion.jsx';
import MoreAnsweredQuestion from './MoreAnsweredQuestions.jsx';
import QuestionFeed from './QuestionFeed.jsx';

export default function Questions({id}) {
  return (
    <div>
      <SearchBar />
      <QuestionFeed id={id}/>
      {/* <MoreAnsweredQuestion /> <AddQuestion /> */}
    </div>
  )
};
