import React, { useState, useEffect, useLayoutEffect } from 'react';
import App from '../App.jsx';
import Questions from './Questions.jsx';
import Question from './Question.jsx';
import SearchBar from './SearchBar.jsx';
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
  const { search } = window.location;
  const query = new URLSearchParams(search).get('s');
  const [searchQuery, setSearchQuery] = useState(query || '');

  useEffect(() => {
    Axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions?product_id=${id}&count=20`, { headers: { Authorization: token } })
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


  //Helper functions
  let compareHelpfulness = function (question1, question2) {
    return question2.question_helpfulness - question1.question_helpfulness
  }
  let sortedQuestions = questions.sort(compareHelpfulness)

  const filterQuestions = (questions, query) => {
    if (!query) {
      return questions;
    }

    return questions.filter((question) => {
      const quesName = question.question_body.toLowerCase();
      return quesName.includes(query)
    })
  }


  //Setting Sorted and filtered Questions
  let filteredQuestions = filterQuestions(sortedQuestions, searchQuery)

  //Start of JSX
  if (!filteredQuestions.length) {
    return (
      <>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
        <p>No Questions, Would you like to add one?</p>
        <AddQuestion showModal={showModal} />
      </>
    )
  }

  //Total questions is less than 2
  if (filteredQuestions.length <= 2) {
    return (
      <section className="question-feed">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
        {filteredQuestions.map((question, index) =>
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
      <Question {...filteredQuestions[x]} showAnswerModal={showAnswerModal} updateQuestionBody={updateQuestionBody} updateQuestionId={updateQuestionId}/>
      <AnswerFeed {...filteredQuestions[x]} />
    </div>);
    x++;
  }

  //More than two questions
  if (questionsShowing === questions.length || questionsShowing === questions.length - 1) {
    return (
      <section className="question-feed">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
        {showing}
        <AddQuestion showModal={showModal} />
      </section>
    )
  } else {
    return (
      <section className="question-feed">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
        {showing}
        <MoreAnsweredQuestions load={showTwoMore} /> <AddQuestion showModal={showModal} />
      </section>
    )
  }
}