import { React, useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import './Wrong.scss';

function Wrong() {
    const navigate = useNavigate();
    const [timeToNextQuestion, setTimeToNextQuestion] = useState(5);
    const answers = useSelector(state => state.answers)
    const correctAnswer = answers[answers.length - 1].correctAnswer;
    const questions = useSelector(state => state.questions.questions);
    const questionsLength = questions.length;
    const currentQuestionIdx = useSelector(state => state.questions.currentQuestionIdx);

    useEffect(() => {
        console.log('compilo')
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
        <div className='wrong-container'>
            <div className='wrong-text h-75 d-flex align-items-center justify-content-center'>WRONG!  🤖</div>
            <div className='subwrongText h-25 d-flex row fs-1'>
                <div className='d-flex justify-content-center align-items-end col-12'>THE CORRECT ANSWER WAS :</div>
                <div className='d-flex justify-content-center align-items-center col-12'><div className='correct-answer-container'>{correctAnswer}</div></div>
                <p className='d-flex justify-content-center align-items-center fs-3'>Next question will be in {timeToNextQuestion} seconds ...</p>
            </div>
        </div>
    )
}

export default Wrong