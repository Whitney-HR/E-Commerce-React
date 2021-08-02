import React, { useState, useEffect, useLayoutEffect } from 'react';
import App from '../App.jsx';
import Questions from './Questions.jsx';
import Question from './Question.jsx';
import AnswerFeed from './AnswerFeed.jsx';
import AddQuestion from './AddQuestion.jsx';
import AddAnswer from './AddAnswer.jsx';
import MoreAnsweredQuestions from './MoreAnsweredQuestions.jsx';
import Axios from 'axios';
import token from '../../env/config.js';

export default function QuestionFeed({ id, showModal, showAnswerModal, updateQuestionBody = f => f, updateQuestionId = f => f}) {
  const [questions, setQuestions] = useState([])
  const [questionsShowing, setShowingQues] = useState(2)
  const [productId, setProductId] = useState(id)


  useEffect(() => {
    Axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe/qa/questions?product_id=${id}&count=20`, { headers: { Authorization: token } })
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



  //Start of JSX
  if (!sortedQuestions.length) {
    return (
      <>
        <p>No Questions, Would you like to add one?</p>
        <AddQuestion showModal={showModal} />
      </>
    )
  }

  //Total questions is less than 2
  if (sortedQuestions.length <= 2) {
    return (
      <section style={feedstyle}>
        {sortedQuestions.map((question, index) =>
          <div key={index}>
            <Question {...question} showAnswerModal={showAnswerModal} updateQuestionBody={updateQuestionBody} updateQuestionId={updateQuestionId}/>
            <AnswerFeed {...question} />
          </div>
        )}
        <AddQuestion showModal={showModal} />
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
      <Question {...sortedQuestions[x]} showAnswerModal={showAnswerModal} updateQuestionBody={updateQuestionBody} updateQuestionId={updateQuestionId}/>
      <AnswerFeed {...sortedQuestions[x]} />
    </div>);
    x++;
  }

  //More than two questions
  if (questionsShowing === questions.length || questionsShowing === questions.length - 1) {
    return (
      <section style={feedstyle} >
        {showing}
        <AddQuestion showModal={showModal} />
      </section>
    )
  } else {
    return (
      <section style={feedstyle}>
        {showing}
        <MoreAnsweredQuestions load={showTwoMore} /> <AddQuestion showModal={showModal} />
      </section>
    )
  }
}