import React from 'react';
import QuestionFeed from './QuestionFeed.jsx';
import AnswerFeed from './AnswerFeed.jsx';
import Answer from './Answer.jsx';

export default function LoadMoreAnswers({load}) {
  // handleLoad = (e) => {
  //   e.preventDefault()
  //   load()
  // }
  const handleLoad = function(e) {
    e.preventDefault();
    load()
  }

  return (
    <>
      <button onClick={handleLoad} className="load-more-answers">Load more answers</button>
    </>
  )
}

