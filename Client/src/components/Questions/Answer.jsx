import React, { useState, useEffect } from 'react';
import App from '../App.jsx';
import Questions from './Questions.jsx';
import QuestionFeed from './QuestionFeed.jsx';
import AnswerFeed from './AnswerFeed.jsx';
import Axios from 'axios';
import token from '../../env/config.js';

export default function Answer({id, body, date, answerer_name, helpfulness, photos}) {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }
  return (
    <div>
      <h3>A: {body}</h3>
      <p>By user: {answerer_name} {formatDate(date)} | Helpful? ({helpfulness}) | report</p>
    </div>
  )
}