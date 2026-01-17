import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; // Note: named export 'thunk' in newer versions
import reducer from './reducer';

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
