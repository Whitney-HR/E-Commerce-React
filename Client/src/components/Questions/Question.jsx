import React, { useState, useEffect } from 'react';
import App from '../app.jsx';
import Questions from './Questions.jsx';
import QuestionFeed from './QuestionFeed.jsx';
import AddAnswer from './AddAnswer.jsx';
import Axios from 'axios';
import token from '../../env/config.js';
import Tracker from '../Shared/Tracker.jsx';

export default function Question({ question_id, question_body, question_date, asker_name, question_helpfulness, reported, answers, showAnswerModal, updateQuestionBody = f => f, updateQuestionId = f => f }) {
  let [helpfulness, setHelpfulness] = useState(question_helpfulness)
  let [addedHelpful, updateAddedHelpful] = useState(false)

  const startAnswerModal = function (e) {
    updateQuestionBody(question_body)
    updateQuestionId(question_id)
    e.preventDefault();
    Tracker('Answer Modal', 'Q & A')
    showAnswerModal();
  }


  let addHelpfulness = function (e) {
    e.preventDefault();
    Tracker('Helpfulness in question', 'Q & A')
    Axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${question_id}/helpful`, null, { headers: { Authorization: token } })
      .then(result => {
        setHelpfulness(helpfulness += 1)
        updateAddedHelpful(true)
      })
      .catch(err => {
        console.log(err)
      })
  }

  if (addedHelpful) {
    return (
      <>
        <h3 className="question-Style">Q: {question_body}</h3> <span className="right-Side-Style-Answer" onClick={startAnswerModal}>Add Answer</span> <span className="right-Side-Style">|</span> <span className="right-Side-Style">({helpfulness})</span><span className="right-Side-no-Padding">Yes</span><span className="right-Side-Style">Helpful?</span>
      </>
    )
  }

  return (
    <>
      <h3 className="question-Style">Q: {question_body}</h3> <span className="right-Side-Style-Answer" onClick={startAnswerModal}>Add Answer</span> <span className="right-Side-Style">|</span> <span className="right-Side-Style">({helpfulness})</span><span className="right-Side-no-Padding" onClick={addHelpfulness}>Yes</span><span className="right-Side-Style">Helpful?</span>
    </>
  )
}

