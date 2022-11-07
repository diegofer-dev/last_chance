import React from 'react';
import { useSelector } from 'react-redux';
import Question from '../../components/question/Question';
import './Questions.scss';

function Questions() {

  const questions = useSelector(state => state.questions.questions);
  const currentQuestionIdx = useSelector(state => state.questions.currentQuestionIdx);
  const currentQuestion = questions[currentQuestionIdx];
  return (
    <div>
      {currentQuestion &&
        <div className="questions-container">
          <Question question={currentQuestion} />
        </div>}
    </div>
  )
}

export default Questions