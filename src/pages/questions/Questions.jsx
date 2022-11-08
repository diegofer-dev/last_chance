import React from 'react';
import { useSelector } from 'react-redux';
import Question from '../../components/question/Question';
import './Questions.scss';

function Questions() {

  const questions = useSelector(state => state.questions.questions); // Questions provided at the start of the App.jsx
  const currentQuestionIdx = useSelector(state => state.questions.currentQuestionIdx);
  const currentQuestion = questions[currentQuestionIdx]; // We take the current question and pass it
  return (
    <div>
      {/* Just in case no question is fetched, to not break the app*/}
      {currentQuestion &&
        <div className="questions-container">
          <Question question={currentQuestion} />
        </div>}
    </div>
  )
}

export default Questions