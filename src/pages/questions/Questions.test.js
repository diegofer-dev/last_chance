import { screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Questions from "./Questions";
import { renderWithProviders } from '../../test-utils';


test('Should render the current question given an index', () => {
    const initialQuestions = {
        questions: [{
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
        }
        ],
        currentQuestionIdx: 1
    }
    renderWithProviders(<Questions />, {
        preloadedState: {
            questions: initialQuestions,
            answers: []
        }
    });
    const input = document.querySelector('input');
    expect(screen.getByText('What is the capital of France?')).toBeInTheDocument();
    expect(input).toBeInTheDocument();
})