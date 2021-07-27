import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import App from '../App.jsx';
import Questions from './Questions.jsx';
import Question from './Question.jsx';
import Axios from 'axios';
import token from '../../env/config.js'

export default function QuestionFeed({id}) {
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    Axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/questions?product_id=${id}`, { headers: {Authorization: token} })
      .then(data => {
        setQuestions(data.data.results)
      })
      .catch(err => {
        console.log(err)
      })
  }, [id]);

  // var question = {
  //   question_body: 'Loading please wait'
  // };

  // if (questions.length) {
  //   question = questions[0]
  // }
  // console.log(question)
  // return (

  //   <div>
  //     <Question question={question.question_body}/>
  //     {/* <p>{question.answers[0].body}</p> */}
  //   </div>
  // )
  if (!questions.length) {
    return (
      <p>Still Loading</p>
    )
  } else {
    return (
      <div>
        {questions.map((question, index) =>
          <Question key={index} question={question.question_body} />
        )}
        <p>SUP World</p>
      </div>
    )
  }
}