import "./App.css";
import React from "react";
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import loginReducer from './Pages/login/redux/reducers';
import fatherReducer from './Pages/father/redux/reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { mySaga } from './Pages/father/redux/saga';
import {renderRouter } from './routers';

import './index.css';
// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

const store = createStore(combineReducers({
  loginTest: loginReducer,
  fatherList: fatherReducer,
}), {}, composeWithDevTools(applyMiddleware(thunkMiddleware, sagaMiddleware))
);

// then run the saga
sagaMiddleware.run(mySaga)

function App() {
  return (
    <div>
      <Provider store={store}>
          {renderRouter()}
      </Provider>
    </div>
  );
}

export default App;
