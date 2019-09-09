import { createStore, applyMiddleware } from 'redux';
import app from '../';
import rootReducer from './redux/reducers/index';
import thunk from 'redux-thunk';

export default function configureStore() {
    let store = createStore(rootReducer, applyMiddleware(thunk))
    return store
}