import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import App from './components/App/App';

import {Provider as ReduxProvider} from 'react-redux';
import {createStore} from './redux/store';

const store = createStore();

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('root')
);