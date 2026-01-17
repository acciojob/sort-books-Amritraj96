import React from 'react';
import ReactDOM from 'react-dom'; // Changed from 'react-dom/client'
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';

// Legacy rendering for React 17 compatibility
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
