import { createSlice } from '@reduxjs/toolkit';

/**
* @summary This slice represents the state of the questions provided at the start of the app and it's reducers
*/

/*
    DEV note: I'm aware that the use of redux state to store all answers and questions when it could just be stored in the questions pages
    is a bit of overkill, and even not performance friendly, but i wanted to practice with the new @reduxjs/toolkit
*/
const questionsSlice = createSlice(
    {
        name: 'questions',
        initialState: {
            questions: [],
            currentQuestionIdx: 0
        },
        reducers: {
            /**
             * Puts a whole new state with it's new array of questions and reset the currentQuestionIdx
             * @param {object} state 
             * @param {any[]} action 
             * @returns 
             */
            newGame: (state, action) => {
                return {
                    questions: action.payload,
                    currentQuestionIdx: 0
                }
            },
            /**
             * Increment the current
             * @param {object} state 
             */
            nextQuestion: state => {
                state.currentQuestionIdx += 1; 
            }
        }
    }
)

export const { newGame, nextQuestion } = questionsSlice.actions;
export default questionsSlice.reducer;