import React from 'react';
import QuestionFeed from './QuestionFeed.jsx';
import AnswerFeed from './AnswerFeed.jsx';
import Answer from './Answer.jsx';
import Tracker from '../Shared/Tracker.jsx';

export default function LoadMoreAnswers({load}) {
  const handleLoad = function(e) {
    e.preventDefault();
    Tracker('Load more answers', 'Q & A');
    load()
  }

  return (
    <>
      <button onClick={handleLoad} className="load-more-answers">Load more answers</button>
    </>
  )
}

