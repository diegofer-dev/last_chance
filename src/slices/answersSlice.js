import { createSlice } from '@reduxjs/toolkit';

const initialState = [];
const answersSlice = createSlice(
    {
        name: 'answers',
        initialState: initialState,
        reducers: {
            resetAnswers: state => {
                return initialState;
            },
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