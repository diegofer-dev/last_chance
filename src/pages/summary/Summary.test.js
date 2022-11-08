import { queryAllByRole, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { renderWithProviders } from '../../test-utils';
import Summary from './Summary';

test('should render results given answers', () => {
    const answers = [
        {
            title: 'Which of the following countries is not in the European Union?',
            answer: 'A. Sweden',
            correctAnswer: 'B. Norway',
            guessed: false,
            points: 0
        },
        {
            title: 'What is the capital of France?',
            answer: 'Paris',
            correctAnswer: 'Paris',
            guessed: true,
            points: 20
        },
        {
            title: 'Who gave the famous "I have a dream" speech?',
            answer: 'B. Martin Luther King, Jr.',
            correctAnswer: 'B. Martin Luther King, Jr.',
            guessed: true,
            points: 10
        },
    ];

    const { queryByText } = renderWithProviders(<Summary />, {
        preloadedState: {
            questions: {},
            answers
        }
    });

    const resultDivs = document.querySelectorAll('div.summary-question-container');
    expect(resultDivs.length).toBe(3);
    expect(queryByText('Which of the following countries is not in the European Union?').parentElement).toHaveClass('summary-wrong-answer');
    expect(queryByText('What is the capital of France?').parentElement).toHaveClass('summary-correct-answer');
    expect(queryByText('Who gave the famous "I have a dream" speech?').parentElement).toHaveClass('summary-correct-answer');
});

test('should compute the worthiness correctlty', () => {
    const answers = [
        {
            title: 'Which of the following countries is not in the European Union?',
            answer: 'A. Sweden',
            correctAnswer: 'B. Norway',
            guessed: false,
            points: 0
        },
        {
            title: 'What is the capital of France?',
            answer: 'Paris',
            correctAnswer: 'Paris',
            guessed: true,
            points: 20
        },
        {
            title: 'Who gave the famous "I have a dream" speech?',
            answer: 'B. Martin Luther King, Jr.',
            correctAnswer: 'B. Martin Luther King, Jr.',
            guessed: true,
            points: 10
        },
    ];

    const { queryByText } = renderWithProviders(<Summary />, {
        preloadedState: {
            questions: {},
            answers
        }
    });

    expect(queryByText('YOUR WORTHINESS VALUE IS: 30')).toBeTruthy();
});

test('should render the right answers in green, the wrong in red and No answers in orange', () => {
    const answers = [
        {
            title: 'Which of the following countries is not in the European Union?',
            answer: 'A. Sweden',
            correctAnswer: 'B. Norway',
            guessed: false,
            points: 0
        },
        {
            title: 'What is the capital of France?',
            answer: '',
            correctAnswer: 'Paris',
            guessed: false,
            points: 0
        },
        {
            title: 'Who gave the famous "I have a dream" speech?',
            answer: 'B. Martin Luther King, Jr.',
            correctAnswer: 'B. Martin Luther King, Jr.',
            guessed: true,
            points: 10
        },
    ];

    const { queryByText } = renderWithProviders(<Summary />, {
        preloadedState: {
            questions: {},
            answers
        }
    });

    const wrongAnswreDiv = within(queryByText('Which of the following countries is not in the European Union?').parentElement);
    const noAnswerDiv = within(queryByText('What is the capital of France?').parentElement);
    const correactAnswerDiv = within(queryByText('Who gave the famous "I have a dream" speech?').parentElement);

    expect(wrongAnswreDiv.queryByText('A. Sweden')).toHaveStyle('color: red');
    expect(wrongAnswreDiv.queryByText('B. Norway')).toHaveStyle('color: green');
    expect(noAnswerDiv.queryByText('No answer')).toHaveStyle('color: orange');
    expect(correactAnswerDiv.queryByText('B. Martin Luther King, Jr.')).toBeTruthy();

})