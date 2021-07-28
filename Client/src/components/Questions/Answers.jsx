import React, { useState, useEffect } from 'react';
import App from '../App.jsx';
import Questions from './Questions.jsx';
import QuestionFeed from './QuestionFeed.jsx';
import Axios from 'axios';
import token from '../../env/config.js';

export default function Answers({ question_id, question_body, question_date, asker_name, question_helpfulness, reported, answers}) {

  console.log('Answers ===== ', answers)
  let keys = Object.keys(answers)
  if (!keys.length) {
    return (
      <div>
        <p>No Answers Submitted</p>
      </div>
    )
  }
  let first = keys[0];

  // console.log(keys)
  // console.log('BODY: ', answers[first].body);

  return (
    <div>
      <p>A: {answers[first].body}</p>
    </div>
  )
}