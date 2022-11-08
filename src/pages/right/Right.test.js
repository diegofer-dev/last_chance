import { waitFor } from "@testing-library/react";
import '@testing-library/jest-dom'
import { renderWithProviders } from '../../test-utils';
import Right from "./Right";

beforeAll(() => {
    jest.setTimeout(40000); // 40 seconds to all tests
})

beforeEach(() => {
    jest.useFakeTimers();
});


test('renders the bingo text', () => {
    const { queryByText } = renderWithProviders(<Right/>);
    
    expect(queryByText(/BINGO!/)).toBeInTheDocument();

});

test('after 5 seconds tries to go to questions page again, if there are more questions', async () => {

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
        currentQuestionIdx: 0
    };

    renderWithProviders(<Right />, {
        preloadedState: {
            questions: initialQuestions,
            answers: []
        }
    });

    await waitFor(() => new Promise(resolve => setTimeout(resolve, 5500)), {timeout: 6000});

    expect(window.location.href).toContain('last_chance/questions');

});

test('after 5 seconds tries to go to summary page again, if there aren\'t more questions', async () => {

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
    };

    renderWithProviders(<Right />, {
        preloadedState: {
            questions: initialQuestions,
            answers: []
        }
    });

    await waitFor(() => new Promise(resolve => setTimeout(resolve, 5500)), {timeout: 6000});

    expect(window.location.href).toContain('last_chance/summary');

});