import React, { useState, useEffect, useLayoutEffect } from 'react';
import App from '../App.jsx';
import Questions from './Questions.jsx';
import Question from './Question.jsx';
import AnswerFeed from './AnswerFeed.jsx';
import AddQuestion from './AddQuestion.jsx';
import MoreAnsweredQuestions from './MoreAnsweredQuestions.jsx';
import Axios from 'axios';
import token from '../../env/config.js'

export default function QuestionFeed({ id }) {
  const [questions, setQuestions] = useState([])
  const [questionsShowing, setShowingQues] = useState(2)


  useEffect(() => {
    Axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/questions?product_id=${id}`, { headers: { Authorization: token } })
      .then(data => {
        setQuestions(data.data.results)
      })
      .catch(err => {
        console.log(err)
      })
  }, [id]);

  //Handling State
  const showTwoMore = function () {
    setShowingQues(questionsShowing + 2)
  }


  //Sorting function
  let compareHelpfulness = function (question1, question2) {
    return question2.question_helpfulness - question1.question_helpfulness
  }
  let sortedQuestions = questions.sort(compareHelpfulness)

  //STYLES
  let feedstyle = {
    'width': '1000px',
    'height': '400px'
  }


  //Nothing loaded
  if (!sortedQuestions.length) {
    return (
      <p>Still Loading</p>
    )
  }

  //Total questions is less than 2
  if (sortedQuestions.length <= 2) {
    return (
      <section style={feedstyle}>
        {sortedQuestions.map((question, index) =>
          <div key={index}>
            <Question {...question} />
            <AnswerFeed {...question} />
          </div>
        )}
        <AddQuestion />
      </section>
    )
  }

  //JSX for questions showing
  let x = 0;
  let showing = []
  while (x < questionsShowing) {
    if (questions[x] === undefined) {
      break;
    }
    showing.push(<div key={x}>
      <Question {...sortedQuestions[x]} />
      <AnswerFeed {...sortedQuestions[x]} />
    </div>);
    x++;
  }

  //More than two questions
  if (questionsShowing === questions.length) {
    return (
      <section style={feedstyle} >
        {showing}
        <AddQuestion />
      </section>
    )
  } else {
    return (
      <section style={feedstyle}>
        {showing}
        <MoreAnsweredQuestions load={showTwoMore} /> <AddQuestion />
      </section>
    )
  }
}