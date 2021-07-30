import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import App from '../App.jsx';
import Questions from './Questions.jsx';
import QuestionFeed from './QuestionFeed.jsx';
import AddAnswer from './AddAnswer.jsx';
import Axios from 'axios';
import token from '../../env/config.js';

export default function Question({ question_id, question_body, question_date, asker_name, question_helpfulness, reported, answers}) {
  let questionStyle = {
    "display": 'inline-block',
    "textAlign": 'left',
    "marginBottom": 0
  }
  let rightSideStyle = {
    "display": 'inline-block',
    "float": 'right'
  }
  return (
    <>
      <h3 style={questionStyle}>Q: {question_body}</h3> <p style={rightSideStyle}>Add Answer</p> <p style={rightSideStyle}>({question_helpfulness}) | </p><p style={rightSideStyle}>Yes?</p><p style={rightSideStyle}>Helpful?</p>
    </>
  )
}