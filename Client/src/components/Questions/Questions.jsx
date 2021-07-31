import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import App from '../App.jsx';
import SearchBar from './SearchBar.jsx';
import AddQuestion from './AddQuestion.jsx';
import MoreAnsweredQuestion from './MoreAnsweredQuestions.jsx';
import QuestionFeed from './QuestionFeed.jsx';
import Modal from '../Shared/SharedModal.jsx';

export default function Questions({id}) {
  //State
  const [addQuestionModal, updateQuesModal] = useState(false)
  const [addAnswerModal, updateAnswerModal] = useState(false)

  //References
  const newQuestion = useRef();
  const userNickname = useRef();
  const userEmail = useRef();

  const newAnswer = useRef();
  const answererName = useRef();
  const answererEmail = useRef();

  //Updating State
    //Question
  const showQuesModal = function() {
    updateQuesModal(true)
  }
  const hideQuesModal = function() {
    updateQuesModal(false)
  }
  const submitQuestion = function(e) {
    e.preventDefault();
    const quest = newQuestion.current.value;
    const nickname = userNickname.current.value;
    const email = userEmail.current.value;
    //SEND AXIOS REQUEST TO API
    newQuestion.current.value = '';
    userNickname.current.value = '';
    userEmail.current.value = '';
  }
    //Answer
  const showAnswerModal = function() {
    updateAnswerModal(true);
  }
  const hideAnswerModal = function() {
    updateAnswerModal(false);
  }
  const submitAnswer = function(e) {
    e.preventDefault();
    const answer = newAnswer.current.value;
    const nickname = answererName.current.value;
    const email = answererEmail.current.value;
    //SEND axios request to API
    newAnswer.current.value = '';
    answererName.current.value = '';
    answererEmail.current.value = '';
  }

  //Styles
  let inputStyle = {
    width: '200px'
  }

  let style = {
    width: '1000px',
    height: '450px',
    overflow: 'scroll',
    border: '3px solid black'
  }



  return (
    <section id="Q and A" style={style}>
      <Modal show={addQuestionModal} handleClose={hideQuesModal}>
        <form onSubmit={submitQuestion}>
          <h3>Ask Your Question</h3>
          <p>About the "Product Name Here"</p>
          <h5>Your Question*</h5>
          <textarea ref={newQuestion} className="QuestionToBeAsked" cols="20" rows="5" maxLength="1000" placeholder="Enter your question"></textarea>
          <h5>Your nickname*</h5>
          <input ref={userNickname} type="text" placeholder="Example: jackson11!" maxLength="60" style={inputStyle}></input>
          <p>For privacy reasons, do not use your full name or email address.</p>
          <h5>Your Email*</h5>
          <input ref={userEmail} type="text" maxLength="60" placeholder="ExampleEmail@fake.com" style={inputStyle}></input>
          <p>For Authentication reasons, you will not be emailed.</p>
          <button onClick={hideQuesModal}>Submit Question</button>
        </form>
      </Modal>
      <Modal show={addAnswerModal} handleClose={hideAnswerModal} >
        <form onSubmit={submitAnswer}>
          <h3>Submit your Answer</h3>
          <p>"Product name here": 'Question body"</p>
          <h5>Your Answer*</h5>
          <textarea ref={newAnswer} className="new_Answer" cols="20" rows="5" maxLength="1000" placeholder="Enter your answer"></textarea>
          <h5>Your nickname*</h5>
          <input ref={answererName} type="text" placeholder="Example: jack543!" maxLength="60" style={inputStyle}></input>
          <p>For privacy reasons, do not use your full name or email address.</p>
          <h5>Your Email*</h5>
          <input ref={answererEmail} type="text" placeholder="Example: jack@email.com" maxLength="60" style={inputStyle}></input>
          <p>For Authentication reasons, you will not be emailed.</p>
          <button onClick={hideAnswerModal}>Submit Answer</button>
        </form>
      </Modal>
      <SearchBar />
      <QuestionFeed id={id} showModal={showQuesModal} showAnswerModal={showAnswerModal}/>
    </section>
  )
};
