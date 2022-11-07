import { createSlice } from '@reduxjs/toolkit';

const questionsSlice = createSlice(
    {
        name: 'questions',
        initialState: {
            questions: [],
            currentQuestionIdx: 0
        },
        reducers: {
            newGame: (state, action) => {
                return {
                    questions: action.payload,
                    currentQuestionIdx: 0
                }
            },
            nextQuestion: state => {
                state.currentQuestionIdx += 1; 
            }
        }
    }
)

export const { newGame, nextQuestion } = questionsSlice.actions;
export default questionsSlice.reducer;