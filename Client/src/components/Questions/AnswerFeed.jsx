import React, { useState, useEffect } from 'react';
import App from '../App.jsx';
import Questions from './Questions.jsx';
import QuestionFeed from './QuestionFeed.jsx';
import AddAnswer from './AddAnswer.jsx';
import Answer from './Answer.jsx';
import LoadMoreAnswers from './LoadMoreAnswers.jsx';
import CollapseAnswers from './CollapseAnswers.jsx';
import Axios from 'axios';
import token from '../../env/config.js';

export default function AnswerFeed({ question_id, question_body, question_date, asker_name, question_helpfulness, reported, answers }) {
  const [loaded, updateLoaded] = useState('false')

  const loadAnswers = function () {
    updateLoaded('true')
  }

  const reloadAnswers = () => {
    updateLoaded('false')
  }
  //Gathering the answers
  let values = Object.values(answers)
  let keys = Object.keys(answers)
  if (!keys.length) {
    return (
      <div>
        <p>No Answers Submitted. Please Add One!</p>
      </div>
    )
  }

  //Sorting function
  let compareHelpfulness = function(answer1, answer2) {
    return answer2.helpfulness - answer1.helpfulness
  }
  let sortedAnswers = values.sort(compareHelpfulness)

  if (loaded === 'false') {
    if (sortedAnswers.length > 2) {
      return (
        <div>
          <Answer {...sortedAnswers[0]} />
          <Answer {...sortedAnswers[1]} />
          <LoadMoreAnswers load={loadAnswers} />
        </div>
      )
    } else {
      return (
        <div >
          {sortedAnswers.map((answer, index) =>
            <Answer key={index} {...answer} />
          )}
        </div>
      )
    }
  } else {
    return (
      <div>
        {sortedAnswers.map((answer, index) =>
          <Answer key={index} {...answer} />
        )}
        <CollapseAnswers reload={reloadAnswers}/>
      </div>
    )
  }
}