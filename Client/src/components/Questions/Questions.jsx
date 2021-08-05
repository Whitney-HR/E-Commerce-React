import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import App from '../App.jsx';
import AddQuestion from './AddQuestion.jsx';
import MoreAnsweredQuestion from './MoreAnsweredQuestions.jsx';
import QuestionFeed from './QuestionFeed.jsx';
import Modal from '../Shared/SharedModal.jsx';
import Axios from 'axios';
import token from '../../env/config.js';
import Tracker from '../Shared/Tracker.jsx';

export default function Questions({ id, name }) {
  //State
  const [addQuestionModal, updateQuesModal] = useState(false)
  const [addAnswerModal, updateAnswerModal] = useState(false)
  const [questionBody, updateQuestionBody] = useState('Body')
  const [questionId, updateQuestionId] = useState([])

  //References
  const newQuestion = useRef();
  const userNickname = useRef();
  const userEmail = useRef();

  const newAnswer = useRef();
  const answererName = useRef();
  const answererEmail = useRef();

  //Updating State
  //Question
  const showQuesModal = function () {
    updateQuesModal(true)
    Tracker('Question Modal', " Q & A")
  }
  const hideQuesModal = function () {
    updateQuesModal(false)
    Tracker('Question Modal', " Q & A")
  }
  const submitQuestion = function (e) {
    e.preventDefault();
    Tracker('Question Modal', " Q & A")
    const quest = newQuestion.current.value;
    const nickname = userNickname.current.value;
    const email = userEmail.current.value;
    if (!quest.length || !nickname.length || !email.length) {
      alert('All entries must be filled out')
    }
    if (email.indexOf('@') === -1) {
      alert('Email must be in proper email format')
    }
    let body = {
      "body": quest,
      "name": nickname,
      "email": email,
      "product_id": id
    }
    Axios.post('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions', body, { headers: { Authorization: token } })
      .then(results => {
        alert('Thank you asking your question!')
      })
      .catch(err => {
        console.log(err)
      })
    newQuestion.current.value = '';
    userNickname.current.value = '';
    userEmail.current.value = '';
  }

  //QUESTION ID & Body FOR answer Modal
  //Answer
  const showAnswerModal = function () {
    updateAnswerModal(true);
    Tracker('Answer Modal', " Q & A")
  }
  const hideAnswerModal = function () {
    updateAnswerModal(false);
    Tracker('Answer Modal', " Q & A")
  }
  const submitAnswer = function (e) {
    e.preventDefault();
    Tracker('Answer Modal', " Q & A")
    const answer = newAnswer.current.value;
    const nickname = answererName.current.value;
    const email = answererEmail.current.value;
    if (!answer.length || !nickname.length || !email.length) {
      alert('All entries must be filled out')
    }
    if (email.indexOf('@') === -1) {
      alert('Email must be in proper email format')
    }
    let body = {
      "body": answer,
      "name": nickname,
      "email": email,
      "photos": []
    }
    Axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${questionId}/answers`, body, { headers: {Authorization: token} })
      .then(results => {
        alert('Thank you for submitting your answer!')
      })
      .catch(err => {
        console.log(err)
      })
    newAnswer.current.value = '';
    answererName.current.value = '';
    answererEmail.current.value = '';
  }

  // Styles
  let inputStyle = {
    width: '200px'
  }





  return (
    <section id="Q and A" className="questions-container">
      <Modal show={addQuestionModal} handleClose={hideQuesModal} className="question-modal">
        <form onSubmit={submitQuestion} className="question-form">
          <h3 className="modal-header">Ask Your Question about the "{name}"</h3>
          <h5 className="user-question-header">Your Question*</h5>
          <textarea ref={newQuestion} className="question-tobe-asked" cols="33" rows="5" maxLength="1000" placeholder="Enter your question"></textarea>
          <br />
          <h5 className="user-question-nickname">Your nickname*</h5>
          <input ref={userNickname} type="text" placeholder="Example: jackson11!" maxLength="60"  className="user-nickname-input"></input>
          <p className="question-modal-advisary">For privacy reasons, do not use your full name or email address.</p>
          <h5 className="user-question-email">Your Email*</h5>
          <input ref={userEmail} type="text" maxLength="60" placeholder="ExampleEmail@fake.com"  className="user-email-input"></input>
          <p className="question-modal-authentication">For Authentication reasons, you will not be emailed.</p>
          <button onClick={hideQuesModal} className="modal-submit-button">Submit Question</button>
        </form>
          <button onClick={hideQuesModal} className="modal-close-button">Close</button>
      </Modal>
      <Modal show={addAnswerModal} handleClose={hideAnswerModal} >
        <form onSubmit={submitAnswer} className="answer-form">
          <h3 className="modal-header">Submit your Answer about {name}: "{questionBody}"</h3>
          <h5 className="user-answer-header">Your Answer*</h5>
          <textarea ref={newAnswer} className="user-answer-input" cols="33" rows="5" maxLength="1000" placeholder="Enter your answer"></textarea>
          <br />
          <h5 className="user-question-nickname">Your nickname*</h5>
          <input ref={answererName} type="text" placeholder="Example: jack543!" maxLength="60" className="user-nickname-input"></input>
          <p className="question-modal-advisary">For privacy reasons, do not use your full name or email address.</p>
          <h5 className="user-question-email">Your Email*</h5>
          <input ref={answererEmail} type="text" placeholder="Example: jack@email.com" maxLength="60" className="user-email-input"></input>
          <p className="question-modal-authentication">For Authentication reasons, you will not be emailed.</p>
          <button onClick={hideAnswerModal} className="modal-submit-button">Submit Answer</button>
        </form>
          <button onClick={hideAnswerModal} className="modal-close-button">Close</button>
      </Modal>
      <h2>Questions & Answers</h2>
      <QuestionFeed id={id} showModal={showQuesModal} showAnswerModal={showAnswerModal} updateQuestionBody={updateQuestionBody} updateQuestionId={updateQuestionId}/>
    </section>
  )
};
