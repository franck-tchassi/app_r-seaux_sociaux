import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import './styles/index.scss';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import  thunk from 'redux-thunk';
import rootReducer from './reducers';


// dev tools
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';


const store = createStore(
  rootReducer, 
  applyMiddleware(thunk)

);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
