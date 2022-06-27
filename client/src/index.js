import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import style
// import { Provider } from 'react-redux';
// import { applyMiddleware } from 'redux';
// import  thunk from 'redux-thunk';
// import rootReducer from '../src/reducers';
// devtools
// import { composeWithDevTools } from 'redux-devtools-extension';
// import logger from 'redux-logger';

// const store = createStore(
//   reactReducer, composeWithDevTools(applyMiddleware(thunk, logger))
// )

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <Provoder store={store}>
  <App />
  // </Provoder>  
);

