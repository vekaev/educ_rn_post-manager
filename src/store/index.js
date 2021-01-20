import { applyMiddleware, combineReducers, createStore } from 'redux';
import { postReducer } from './reducers/post';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  post: postReducer,
});

export default createStore(rootReducer, applyMiddleware(thunk));
