import React from 'react';
import App from './App';
import Questions from './pages/questions/Questions';
import Right from './pages/right/Right';
import Wrong from './pages/wrong/Wrong';
import Summary from './pages/summary/Summary';
import store from './store';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import {
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom';

/**
 * Router of application, all of them starts at last_chance to make this work on the domain provided by github
 */
const router = createBrowserRouter([
    {
        path: '/last_chance/',
        element: <App/>,
    },
    {
        path: '/last_chance/questions',
        element: <Questions/>
    },
    {
        path: '/last_chance/right',
        element: <Right/>
    },
    {
        path: '/last_chance/wrong',
        element: <Wrong/>
    },
    {
        path: '/last_chance/summary',
        element: <Summary/>
    }
]);

const root = createRoot(document.querySelector('#root'));

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
)