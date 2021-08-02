import React from 'react';
import ReactDOM from'react-dom';
import App from '../App.jsx';
import Questions from './Questions.jsx';

export default function MoreAnsweredQuestions({load}) {

  const handleLoad = function(e) {
    e.preventDefault();
    load();
  }

  return (
    <>
     <button onClick={handleLoad} className="more-questions">More Answered Questions</button>
    </>
  )
}