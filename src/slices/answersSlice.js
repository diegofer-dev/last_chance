import { createSlice } from '@reduxjs/toolkit';

const initialState = [];
/**
 * This slice represents the state of the answers provided by the user through the whole app and it's reducers
 */
const answersSlice = createSlice(
    {
        name: 'answers',
        initialState: initialState,
        reducers: {
            /**
             * Resets the state by returning an empty array
             * @param {never[]} state 
             * @returns 
             */
            resetAnswers: state => {
                return initialState;
            },
            /**
             * Push a new answer in the state
             * @param {never[]} state 
             * @param {any[]} action 
             */
            answerAdded: (state, action) => {
                state.push({
                    title: action.payload.title,
                    answer: action.payload.answer,
                    correctAnswer: action.payload.correctAnswer,
                    guessed: action.payload.guessed,
                    points: action.payload.points
                  })
            }
        }

    }
);

export const { resetAnswers, answerAdded } = answersSlice.actions;
export default answersSlice.reducer;