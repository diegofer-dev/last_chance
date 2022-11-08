import {React, useEffect} from 'react';
import './App.scss';
import { Link } from 'react-router-dom';
import { newGame } from './slices/questionsSlice';
import { resetAnswers } from './slices/answersSlice';
import { useDispatch } from 'react-redux';

function App() {
    // Cada vez que entremos en esta pagina, reseteamos todo el juego
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(newGame(
            [
                {
                    title: 'Which of the following countries is not in the European Union?',
                    type: 'CHOICES',
                    choices: [
                        'A. Sweden',
                        'B. Norway',
                        'C. Denmark',
                        'D. France',
                    ],
                    correctAnswer: 'B. Norway',
                    points: 5,
                    duration: 10
                },
                {
                    title: 'What is the capital of France?',
                    type: 'TEXT',
                    correctAnswer: 'Paris',
                    points: 10,
                    duration: 30
                },
                {
                    title: 'Which of the following is not a type of cheese?',
                    type: 'CHOICES',
                    choices: [
                        'A. Feta',
                        'B. Cheddar',
                        'C. Brie',
                        'D. The cow who laughs',
                    ],
                    correctAnswer: 'D. The cow who laughs',
                    points: 5,
                    duration: 10
                },
                {
                    title: 'What is the capital of Canada?',
                    type: 'TEXT',
                    correctAnswer: 'Ottawa',
                    points: 10,
                    duration: 30
                },
                {
                    title: 'Who gave the famous "I have a dream" speech?',
                    type: 'CHOICES',
                    choices: [
                        'A. Barack Obama',
                        'B. Martin Luther King, Jr.',
                        'C. Abraham Lincoln',
                        'D. John F. Kennedy',
                    ],
                    correctAnswer: 'B. Martin Luther King, Jr.',
                    points: 5,
                    duration: 10
                },
                {
                    title: 'What is the value of x if 5(x-3)=35?',
                    type: 'TEXT',
                    correctAnswer: '10',
                    points: 10,
                    duration: 20
                },
                {
                    title: 'Which of the following is not a mineral?',
                    type: 'CHOICES',
                    choices: [
                        'A. Diamond',
                        'B. Quartz',
                        'C. Glass',
                        'D. Pyrite',
                    ],
                    correctAnswer: 'C. Glass',
                    points: 5,
                    duration: 10
                },
                {
                    title: 'How many books are in the Harry Potter series?',
                    type: 'TEXT',
                    correctAnswer: '7',
                    points: 10,
                    duration: 10
                },
                {
                    title: 'Which of the following is not a stage in the cell cycle?',
                    type: 'CHOICES',
                    choices: [
                        'A. G1',
                        'B. S',
                        'C. G2',
                        'D. M',
                    ],
                    correctAnswer: 'D. M',
                    points: 5,
                    duration: 30
                },
                {
                    title: 'Who is the author of the book "To Kill a Mockingbird"?',
                    type: 'TEXT',
                    correctAnswer: 'Harper Lee',
                    points: 10,
                    duration: 30
                },
                {
                    title: '',
                    type: '',
                    correctAnswer: '',
                    points: 0,
                    duration: 10
                },
            ]
        ));
        dispatch(resetAnswers());
    }, []);
    return (
        <div>
            <div className='text-center fw-bold' style={{ fontSize: '5vw', height: '25vh' }}>LAST CHANCE FOR HUMANITY!</div>
            <div className='text-center fs-1 mb-5'>Time to prove your worthiness to the all mighty <strong>LOM</strong></div>
            <div className='text-center'><Link className='btn btn-dark fs-3' to='/last_chance/questions'>START 🤖</Link></div>
        </div>
    )
}

export default App