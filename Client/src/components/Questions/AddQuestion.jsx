import React from 'react';
import ReactDOM from'react-dom';
import App from '../app.jsx';
import Questions from './Questions.jsx';
import Tracker from '../Shared/Tracker.jsx';

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