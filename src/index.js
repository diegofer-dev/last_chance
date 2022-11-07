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

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
    },
    {
        path: '/questions',
        element: <Questions/>
    },
    {
        path: '/right',
        element: <Right/>
    },
    {
        path: '/wrong',
        element: <Wrong/>
    },
    {
        path: '/summary',
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