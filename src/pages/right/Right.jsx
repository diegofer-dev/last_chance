import { React, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import './Right.scss';

function Right() {
    const [timeToNextQuestion, setTimeToNextQuestion] = useState(5);
    const navigate = useNavigate();
    const questions = useSelector(state => state.questions.questions);
    const questionsLength = questions.length;
    const currentQuestionIdx = useSelector(state => state.questions.currentQuestionIdx);
    useEffect(() => {
        const timeout = setTimeout(() => {
            questionsLength - 1 > currentQuestionIdx? navigate('/questions') : navigate('/summary');
        }, 5000);
        const interval = setInterval(() => {
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