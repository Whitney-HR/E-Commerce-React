import React, { useState, useEffect } from 'react';
import App from '../App.jsx';
import Questions from './Questions.jsx';
import QuestionFeed from './QuestionFeed.jsx';
import AddAnswer from './AddAnswer.jsx';
import Answer from './Answer.jsx';
import LoadMoreAnswers from './LoadMoreAnswers.jsx';
import Axios from 'axios';
import token from '../../env/config.js';

export default function Answers({ question_id, question_body, question_date, asker_name, question_helpfulness, reported, answers}) {

  console.log('Answers ===== ', answers)
  let values = Object.values(answers)
  let keys = Object.keys(answers)
  if (!keys.length) {
    return (
      <div>
        <p>No Answers Submitted. Please Add One!</p>
      </div>
    )
  }
  if (values.length > 2) {
    return (
      <div>
        <Answer {...values[0]} />
        <Answer {...values[1]} />
        <LoadMoreAnswers />
      </div>
    )
  } else {
    return (
      <div >
        {values.map((answer, index) =>
        <Answer key={index} {...answer} />
        )}
      </div>
    )
  }
}