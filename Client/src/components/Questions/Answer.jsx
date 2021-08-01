import React, { useState, useEffect } from 'react';
import App from '../App.jsx';
import Questions from './Questions.jsx';
import QuestionFeed from './QuestionFeed.jsx';
import AnswerFeed from './AnswerFeed.jsx';
import Axios from 'axios';
import token from '../../env/config.js';

export default function Answer({id, body, date, answerer_name, helpfulness, photos}) {
  let [showingHelpfulness, setHelpfulness] = useState(helpfulness);

  let addHelpfulness = function(e) {
    e.preventDefault();
    Axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/answers/${id}/helpful`, null, { headers: {Authorization: token}})
      .then(results => {
        setHelpfulness(showingHelpfulness += 1)
      })
      .catch(err => {
        console.log(err)
      })
  }
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }
  return (
    <div>
      <h3>A: {body}</h3>
      <span>By user: {answerer_name} {formatDate(date)}  | Helpful? </span><span className="report-Answer" onClick={addHelpfulness}> Yes </span><span> ({showingHelpfulness}) | </span><span className="report-Answer">Report</span>
    </div>
  )
}
{/* <span>By user: {answerer_name} {formatDate(date)} <span>| Helpful? ({helpfulness})</span> | report</span> */}