import { React, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import './Right.scss';

/**
 * This and Wrong.jsx are called in similar circumstances, both navigate to the summary or questions page
 * The difference is this just navigate and doesnt display anything from the state
 * @returns 
 */
function Right() {
    const [timeToNextQuestion, setTimeToNextQuestion] = useState(5); // Number to appear in the counter
    const navigate = useNavigate();
    const questions = useSelector(state => state.questions.questions);
    const questionsLength = questions.length;
    const currentQuestionIdx = useSelector(state => state.questions.currentQuestionIdx);
    //componentDidMount
    useEffect(() => {
        const timeout = setTimeout(() => {
            // If we exhausted the questions we go to the summary page, if not we got the questions page to dsiplay new question
            questionsLength - 1 > currentQuestionIdx? navigate('/last_chance/questions') : navigate('/last_chance/summary');
        }, 5000);
        const interval = setInterval(() => {
            // Interval to make the countdown
            setTimeToNextQuestion(timeToNextQuestion => timeToNextQuestion - 1);
        }, 1000);
        return () => {
            clearTimeout(timeout);
            clearInterval(interval);
        }
    }, []);
    return (
        <div className='right-container'>
            <div className='right-text h-75 d-flex align-items-center justify-content-center'>BINGO!  ✌️</div>
            <div className='h-25'>
                <p className='d-flex justify-content-center align-items-center fs-1'> HUMANITY STILL HAVE A CHANCE!</p>
                <p className='d-flex justify-content-center align-items-center fs-3'>Next question will be in {timeToNextQuestion} seconds ...</p>
                </div>
        </div>
    )
}

export default Right