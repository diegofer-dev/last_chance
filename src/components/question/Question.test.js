import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'
import { renderWithProviders } from '../../test-utils';
import Question from "./Question";


test('renders text of the questions and the choices', () => {

    renderWithProviders(<Question question={
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
        }
    } />);

    expect(screen.getByText('Which of the following is not a stage in the cell cycle?')).toBeInTheDocument();
    expect(screen.getByText('A. G1')).toBeInTheDocument();
    expect(screen.getByText('B. S')).toBeInTheDocument();
    expect(screen.getByText('C. G2')).toBeInTheDocument();
    expect(screen.getByText('D. M')).toBeInTheDocument();
});

test('renders text of question and a input', async () => {

    renderWithProviders(<Question question={
        {
            title: 'Who is the author of the book "To Kill a Mockingbird"?',
            type: 'TEXT',
            correctAnswer: 'Harper Lee',
            points: 10,
            duration: 30
        }
    } />);
    const input = document.querySelector('input')

    expect(screen.getByText('Who is the author of the book "To Kill a Mockingbird"?')).toBeInTheDocument();
    expect(input).toBeInTheDocument();
});

test('when hovering and clicking a choice a submit button should appear in the right button', async () => {
    const { hover, click } = userEvent.setup();
    const { getByText } = renderWithProviders(<Question question={
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
        }
    } />);
    //First we fecth the elements to which hover and click
    const firstChoiceElement = getByText('A. G1');
    const secondChoiceElement = getByText('B. S');

    await hover(firstChoiceElement);
    await click(firstChoiceElement);
    await hover(secondChoiceElement);


    //Then we take the objects from the screen to which query
    const firstChoice = within(screen.getByText('A. G1').parentElement);
    const secondChoice = within(screen.getByText('B. S').parentElement);

    expect(firstChoice.queryByRole('button', {name: 'SUBMIT'})).toBeTruthy();
    expect(secondChoice.queryByRole('button', {name: 'SUBMIT'})).toBeFalsy();
    
});

test('when writing the correct answer, tries to navigate to right page', async () => {
    const { click, keyboard } = userEvent.setup();

    const { getByRole, queryByRole } = renderWithProviders(<Question question={
        {
            title: 'Who is the author of the book "To Kill a Mockingbird"?',
            type: 'TEXT',
            correctAnswer: 'Harper Lee',
            points: 10,
            duration: 30
        }
    } />);
    const inputElement = getByRole('textbox');

    await click(inputElement);
    await keyboard('haRper LeE');

    const buttonElement = queryByRole('button', {name: 'SUBMIT'});
    expect(buttonElement).toBeTruthy(); // The button should be there

    await click(buttonElement); // Submit response

    expect(window.location.href).toContain('last_chance/right');

});

test('when writing the wrong answer, tries to navigate to wrong page', async () => {
    const { click, keyboard } = userEvent.setup();

    const { getByRole, queryByRole } = renderWithProviders(<Question question={
        {
            title: 'Who is the author of the book "To Kill a Mockingbird"?',
            type: 'TEXT',
            correctAnswer: 'Harper Lee',
            points: 10,
            duration: 30
        }
    } />);
    const inputElement = getByRole('textbox');

    await click(inputElement);
    await keyboard('idk');

    const buttonElement = queryByRole('button', {name: 'SUBMIT'});
    expect(buttonElement).toBeTruthy(); // The button should be there

    await click(buttonElement); // Submit response

    expect(window.location.href).toContain('last_chance/wrong');

});