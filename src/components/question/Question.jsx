import { useEffect, useState, React } from 'react';
import { answerAdded } from '../../slices/answersSlice';
import { nextQuestion } from '../../slices/questionsSlice'
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import './Question.scss';

function Question({ question }) {
  const timerDuration = question.duration
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputWidth, setInputWidth] = useState('');
  const [responseText, setResponseText] = useState('');
  const [goTo, setGoTo] = useState('');
  const [clickedIdx, setClickedIdx] = useState(-1);

  useEffect(() => {
    if (question.type !== 'TEXT') return;
    const span = document.querySelector('span');
    span.innerHTML = responseText.replace(/\s/g, '&nbsp;'); //Para que tambien cuente los espacios
    setInputWidth(span.offsetWidth + 'px');
  }, [responseText]);

  useEffect(() => {
    if (goTo === '') return;
    navigate('/last_chance' + goTo)
  }, [goTo])

  useEffect(() => {
    const timeout = setTimeout(() => {
      checkResponseAndGoNext('');
    }, timerDuration*1000);
    const timer = document.getElementById('timer');
    timer.style.animationDuration = timerDuration + 's';
    return () => { clearTimeout(timeout) }
  }, [])

  const checkResponseAndGoNext = answer => {
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
              {responseText.length !== 0 && <button onClick={() => checkResponseAndGoNext(responseText.trim())} className='ms-3 btn btn-dark fs-3'>SUBMIT</button>}
            </div>
            <span></span>
          </div>
        </div>)
      default:
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