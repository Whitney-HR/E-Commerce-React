import React, { useState, useEffect } from 'react';
import App from '../App.jsx';
import Questions from './Questions.jsx';
import QuestionFeed from './QuestionFeed.jsx';
import AnswerFeed from './AnswerFeed.jsx';
import Axios from 'axios';
import token from '../../env/config.js';
import Tracker from '../Shared/Tracker.jsx';

export default function Answer({ id, body, date, answerer_name, helpfulness, photos }) {
  let [showingHelpfulness, setHelpfulness] = useState(helpfulness);
  let [reported, updateReported] = useState(false)
  let [addedHelpful, updateAddedHelpful] = useState(false)

  let addHelpfulness = function (e) {
    e.preventDefault();
    Tracker('Helpfulness in answer', 'Q & A');
    Axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/answers/${id}/helpful`, null, { headers: { Authorization: token } })
      .then(results => {
        setHelpfulness(showingHelpfulness += 1)
        updateAddedHelpful(true)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const reportAnswer = function (e) {
    e.preventDefault();
    Tracker('Reported answer', 'Q & A');
    Axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/answers/${id}/report`, null, { headers: { Authorization: token } })
      .then(results => {
        updateReported(true)
      })
      .catch(err => {
        console.log(err)
      })
  }
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  if (reported) {
    return (
      <div>
        <h3>A: {body}</h3>
        <span className="answerer-info">By user - {answerer_name} {formatDate(date)}  | Helpful? </span><span className="report-Answer" onClick={addHelpfulness}> Yes </span><span className="answerer-info"> ({showingHelpfulness}) | </span><span className="report-Answer">Reported</span>
      </div>
    )
  }

  if (addedHelpful) {
    return (
      <div>
        <h3>A: {body}</h3>
        <span className="answerer-info">By user - {answerer_name} {formatDate(date)}  | Helpful? </span><span className="report-Answer"> Yes </span><span className="answerer-info"> ({showingHelpfulness}) | </span><span className="report-Answer" onClick={reportAnswer}>Report</span>
      </div>
    )
  }


  return (
    <div>
      <h3>A: {body}</h3>
      <span className="answerer-info">By user - {answerer_name} {formatDate(date)}  | Helpful? </span><span className="report-Answer" onClick={addHelpfulness}> Yes </span><span className="answerer-info"> ({showingHelpfulness}) | </span><span className="report-Answer" onClick={reportAnswer}>Report</span>
    </div>
  )
}
