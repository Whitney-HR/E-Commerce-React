import React from 'react';
import ReactDOM from'react-dom';
import App from '../App.jsx';
import Questions from './Questions.jsx';
import QuestionFeed from './QuestionFeed.jsx';
import Tracker from '../Shared/Tracker.jsx';

export default function AddAnswer({showAnswerModal}) {
  const startAnswerModal = function(e) {
    e.preventDefault();
    showAnswerModal();
  }

  return (
    <div>
      <button onClick={startAnswerModal}>Add Answer</button>
    </div>
  )
}