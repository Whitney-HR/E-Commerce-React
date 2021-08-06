import React from 'react';
import ReactDOM from'react-dom';
import App from '../app.jsx';
import Questions from './Questions.jsx';
import Tracker from '../Shared/Tracker.jsx';

export default function MoreAnsweredQuestions({load}) {

  const handleLoad = function(e) {
    e.preventDefault();
    Tracker('Load more questions', 'Q & A')
    load();
  }

  return (
    <>
     <button onClick={handleLoad} className="more-questions">More Answered Questions</button>
    </>
  )
}