import { useEffect, useState, React } from 'react';
import { answerAdded } from '../../slices/answersSlice';
import { nextQuestion } from '../../slices/questionsSlice'
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import './Question.scss';

/**
 * This renders practically of the whole page of the current question
 * Has the logic of checking if the answer is rightm go to the right or wrong page and 
 * tell the redux state to increment the currentQuestionIdx
 * @param {object} param0 
 * @returns 
 */
function Question({ question }) {
  const timerDuration = question.duration
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputWidth, setInputWidth] = useState('');
  const [responseText, setResponseText] = useState('');
  // Due to the need of using useEffect when calling the new navigation API of react router, this state variable is declared
  const [goTo, setGoTo] = useState(''); 
  const [clickedIdx, setClickedIdx] = useState(-1);

  // useEffect for the trick of incrementing width of input as we type
  useEffect(() => {
    //When question is of type other than TEXT, span doesnt exist
    if (question.type !== 'TEXT') return;
    const span = document.querySelector('span');
    // We set the text of the input to a far away span 
    // Need to replace normal spaces to unbreakable spaces, to not mess up the width
    span.innerHTML = responseText.replace(/\s/g, '&nbsp;');
    // Then we read the resulting width of the span and setting it to the input 
    setInputWidth(span.offsetWidth + 'px');
  }, [responseText]);

  // useEffect used to call navigate in a useEffect
  useEffect(() => {
    if (goTo === '') return;
    navigate('/last_chance' + goTo)
  }, [goTo])

  // componentDidMount
  useEffect(() => {
    // We create a timeout with the value of timerDuration seconds
    const timeout = setTimeout(() => {
      checkResponseAndGoNext(''); // Empty response
    }, timerDuration*1000);
    const timer = document.getElementById('timer');
    // We set the value of the timer animation as well
    timer.style.animationDuration = timerDuration + 's';
    // Cleanup of timeout when we leave
    return () => { clearTimeout(timeout) }
  }, [])

  
  /**
   * Function used to check if the answer given is right, add a new answer to the redux state, increment currentQuestionIdx
   * in the state, and go to right page or wrong page
   * @param {string} answer 
   */
  const checkResponseAndGoNext = answer => {
    // we check the uncapitalized response
    if (answer.toLowerCase() === question.correctAnswer.toLowerCase()) {
      dispatch(answerAdded({
        title: question.title,
        answer,
        correctAnswer: question.correctAnswer,
        guessed: true,
        points: question.points
      }));
      dispatch(nextQuestion());
      setGoTo('/right');
    }
    else {
      dispatch(answerAdded({
        title: question.title,
        answer,
        correctAnswer: question.correctAnswer,
        guessed: false,
        points: 0
      }));
      dispatch(nextQuestion());
      setGoTo('/wrong');
    }
  }

  /**
   * Based on the type of question we render a single box with a type text input or a 4 chioce clickable boxes
   * @param {object} question 
   * @returns The rendered reponse/s boxe/s
   */
  const renderResponses = question => {
    switch (question.type) {
      case 'CHOICES':
        return (<div className='d-flex row h-25 justify-content-center'>
          {question.choices.map((choice, idx) =>
            <div key={'response-' + idx} onClick={() => setClickedIdx(idx)} className='col-3 d-flex justify-content-center'>
              <div className='choice answer-container'>
                <p className='fs-1'>{choice}</p>
                {clickedIdx === idx && <button onClick={() => checkResponseAndGoNext(choice)} className='btn btn-dark fs-3'>SUBMIT</button>}
              </div>
            </div>
          )}
        </div>);
      case 'TEXT':
        return (<div className='d-flex row h-25 justify-content-center'>
          <div className='answer-container'>
            <p className='fs-1'>Write your response here:</p>
            <div className='d-flex justify-content-center align-items-center'>
              <input style={{ width: inputWidth }} onChange={(e) => setResponseText(e.target.value)} onKeyDown={(event) => {if(event.key === 'Enter') checkResponseAndGoNext(responseText.trim())}} className='input-container' type='text' />
              {/* Make the submit button appear only when something is wrote on the input*/}
              {responseText.length !== 0 && <button onClick={() => checkResponseAndGoNext(responseText.trim())} className='ms-3 btn btn-dark fs-3'>SUBMIT</button>}
            </div>
            <span></span> {/* Span to make the trick of the input width*/}
          </div>
        </div>)
      default:
        //A default just in case :)
        return (<div>NO QUESTION!</div>);

    }
  }

  return (
    <div className='question-container'>
      <div id='timer' className='timer'></div>
      <div className='title-container d-flex justify-content-center'>
        <div className='title fs-1 fw-bold'>{question.title}</div>
      </div>
      {renderResponses(question)}
    </div>
  )
}

export default Question