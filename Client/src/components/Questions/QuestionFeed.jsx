import React, { useState, useEffect, useLayoutEffect } from 'react';
import App from '../App.jsx';
import Questions from './Questions.jsx';
import Question from './Question.jsx';
import Answers from './Answers.jsx';
import AddQuestion from './AddQuestion.jsx';
import MoreAnsweredQuestion from './MoreAnsweredQuestions.jsx';
import Axios from 'axios';
import token from '../../env/config.js'

export default function QuestionFeed({id}) {
  const [questions, setQuestions] = useState([])

  useLayoutEffect(() => {
    Axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/questions?product_id=${id}`, { headers: {Authorization: token} })
      .then(data => {
        setQuestions(data.data.results)
      })
      .catch(err => {
        console.log(err)
      })
  }, [id]);


  if (!questions.length) {
    return (
      <p>Still Loading</p>
    )
  } else if (questions.length <= 2) {
    return (
      <div>
        {questions.map((question, index) =>
        <div key={index}>
          <Question {...question} />
          <Answers {...question} />
        </div>
        )}
        <AddQuestion />
      </div>
    )
  } else {
    return (
      <div>
        {questions.map((question, index) =>
        <div key={index}>
          <Question {...question} />
          <Answers {...question} />
        </div>
        )}
        <MoreAnsweredQuestion /> <AddQuestion />
      </div>
    )
  }
}