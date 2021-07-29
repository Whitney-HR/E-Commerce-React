import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import App from '../App.jsx';
import Questions from './Questions.jsx';
import QuestionFeed from './QuestionFeed.jsx';
import AddAnswer from './AddAnswer.jsx';
import Axios from 'axios';
import token from '../../env/config.js';

export default function Question({ question_id, question_body, question_date, asker_name, question_helpfulness, reported, answers}) {
  return (
    <div>
      <h3>Q: {question_body}</h3>
      <AddAnswer />
    </div>
  )
}