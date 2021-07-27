import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import App from '../App.jsx';
import Questions from './Questions.jsx';
import QuestionFeed from './QuestionFeed.jsx';
import Axios from 'axios';
import token from '../../env/config.js';

export default function Question({question}) {
  return (
    <div>
      <p>Q: {question}</p>
    </div>
  )
}