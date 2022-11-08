import React from 'react'
import { render } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import answersReducer from './slices/answersSlice';
import questionsReducer from './slices/questionsSlice';
import { BrowserRouter } from 'react-router-dom';

/**
 * Function overload the render function of the React Testing Library, to also provide
 * a preloaded store, and the context of the Browser Router
 * @param {JSX.Element} ui 
 * @param {object} param1 
 * @returns 
 */
export function renderWithProviders(
    ui,
    {
        preloadedState = {},
        // Automatically create a store instance if no store was passed in
        store = configureStore({
            reducer: {
                questions: questionsReducer,
                answers: answersReducer
            }, preloadedState
        }),
        ...renderOptions
    } = {}
) {
    function Wrapper({ children }) {
        // render what's given inside BrowserRouter that's inside a ReactRedux Provider
        return  <Provider store={store}><BrowserRouter>{children}</BrowserRouter></Provider>
    }

    // Return an object with the store and all of RTL's query functions
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}