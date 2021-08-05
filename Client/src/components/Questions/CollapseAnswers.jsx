import React from 'react';
import QuestionFeed from './QuestionFeed.jsx';
import AnswerFeed from './AnswerFeed.jsx';
import Answer from './Answer.jsx';
import Tracker from '../Shared/Tracker.jsx';

export default function CollapseAnswers({reload}) {
  const handleReload = function(e) {
    e.preventDefault()
    Tracker('Collapse Answers', 'Q & A');
    reload()
  }
  return (
    <>
      <button onClick={handleReload} className="collapse-answers">Collapse Answers</button>
    </>
  )
}