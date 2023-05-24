/**
 * @file main.jsx
 * @description Entry point of the React application, rendering the App component with Redux store integration.
 * @author jhludwolf
 * @created May 18, 2023
 */


import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import './Log/logger';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
