import React from 'react';
import QuestionFeed from './QuestionFeed.jsx';
import AnswerFeed from './AnswerFeed.jsx';
import Answer from './Answer.jsx';

export default function CollapseAnswers({reload}) {
  const handleReload = function(e) {
    e.preventDefault()
    reload()
  }
  return (
    <>
      <button onClick={handleReload}>Collapse Answers</button>
    </>
  )
}