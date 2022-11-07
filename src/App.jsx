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
                    title: 'Pregunta 1',
                    type: 'TEXT',
                    correctAnswer: 'Respuesta 1',
                    points: 10
                },
                {
                    title: 'Pregunta 2',
                    type: 'CHOICES',
                    choices: [
                        'Respuesta 1',
                        'Respuesta 2',
                        'Respuesta 3',
                        'Respuesta 4',
                    ],
                    correctAnswer: 'Respuesta 1',
                    points: 5
                },
                {
                    title: 'Pregunta 3',
                    type: 'TEXT',
                    correctAnswer: 'Respuesta 3',
                    points: 10
                },
                {
                    title: '',
                    type: '',
                    correctAnswer: '',
                    points: 0
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