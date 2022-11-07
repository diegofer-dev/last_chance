import { configureStore } from '@reduxjs/toolkit';
import answersReducer from './slices/answersSlice';
import questionsReducer from './slices/questionsSlice';
export default configureStore({
    reducer: {
        questions: questionsReducer,
        answers: answersReducer
    }
})