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

  useEffect(() => {
    Axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/questions?product_id=${id}`, { headers: {Authorization: token} })
      .then(data => {
        setQuestions(data.data.results)
      })
      .catch(err => {
        console.log(err)
      })
  }, [id]);

  let feedstyle = {
    'width': '1000px',
    'height': '400px'
  }

  let compareHelpfulness = function(question1, question2) {
    return question2.question_helpfulness - question1.question_helpfulness
  }
  let sortedQuestions = questions.sort(compareHelpfulness)

  if (!sortedQuestions.length) {
    return (
      <p>Still Loading</p>
    )
  } else if (sortedQuestions.length <= 2) {
    return (
      <section style={feedstyle}>
        {sortedQuestions.map((question, index) =>
        <div key={index}>
          <Question {...question} />
          <Answers {...question} />
        </div>
        )}
        <AddQuestion />
      </section>
    )
  } else {
    return (
      <section style={feedstyle}>
        <Question {...sortedQuestions[0]} />
        <Answers {...sortedQuestions[0]} />
        <Question {...sortedQuestions[1]} />
        <Answers {...sortedQuestions[1]} />
        <MoreAnsweredQuestion /> <AddQuestion />
      </section>
    )
  }
}

// {/* {questions.map((question, index) =>
//         <div key={index}>
//           <Question {...question} />
//           <Answers {...question} />
//         </div>
//         )} */}