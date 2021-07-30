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
  const [addQuestionModal, updateQuesModal] = useState(false)
  const newQuestion = useRef();
  const userNickname = useRef();
  const userEmail = useRef();

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
          <textarea ref={newQuestion} className="QuestionToBeAsked" cols="20" rows="5" maxLength="1000" placeholder="Enter your question..."></textarea>
          <h5>What is your nickname?*</h5>
          <input ref={userNickname} type="text" placeholder="Example: jackson11!" maxLength="60" style={inputStyle}></input>
          <p>For privacy reasons, do not use your full name or email address</p>
          <h5>Your Email*</h5>
          <input ref={userEmail} type="text" maxLength="60" placeholder="ExampleEmail@fake.com" style={inputStyle}></input>
          <p>For Authentication reasons, you will not be emailed.</p>
          <button onClick={hideQuesModal}>Submit Question</button>
        </form>
      </Modal>
      <SearchBar />
      <QuestionFeed id={id} showModal={showQuesModal}/>
    </section>
  )
};
