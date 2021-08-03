import React from 'react';
import ReactDOM from'react-dom';
import App from '../App.jsx';
import Questions from './Questions.jsx';

export default function AddQuestion({showModal}) {

  const startModal = function(e) {
    e.preventDefault();
    showModal();
  }

  return (
    <>
    <button onClick={startModal} className="question-button">Add A Question +</button>
    </>
  )
}