import { React} from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Summary.scss';

function Summary() {
  // We take all the answers and display them 
  const answers = useSelector(state => state.answers);
  return (
    <div className='summary-container'>
      <div className='w-100 text-center fs-1 p-3'>RESULTS</div>
      <div className='row'>
        {answers.map((answer, idx) =>{
        const didRespond = answer.answer !== '';
        return (
          <div key={'summary-' + idx} className='col-6 d-flex justify-content-center mb-3'>
            <div className={`summary-question-container ${answer.guessed? 'summary-correct-answer' : 'summary-wrong-answer'}`}>
              <p className='fw-bold fs-4'>{answer.title}</p>
              <div className='summary-answer fs-5'>
                {// If the user didnt guessed, we display his or her wrong answer in red (No answer in orange) and the correct one in green
                answer.guessed? 
                <p>{answer.answer}</p> : 
                <div className='d-flex'>
                    <p style={{color: didRespond? 'red' : 'orange'}}>{didRespond? answer.answer : 'No answer'}</p><p>{'->'}</p><p style={{color: 'green'}}>{answer.correctAnswer}</p>
                </div>}
              </div>
            </div>
          </div>
        );
        }
        )}
      </div>
      <div className='w-100 text-center'>
        {/* Here we compute the worthiness value, which is the summ of all the points in the answers */}
        <p className='fs-1 fw-bold'>YOUR WORTHINESS VALUE IS: {answers.map((elem) => elem.points).reduce((prev, curr) => prev + curr, 0)}</p>
        <Link className='fs-4' to='/last_chance/'> Try again?</Link>
      </div>
    </div>
  )
}

export default Summary