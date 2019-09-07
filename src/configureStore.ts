import { createStore, applyMiddleware } from 'redux';
import app from './redux/reducers';
import thunk from 'redux-thunk';

export function configureStore() {
    let store = createStore(app, applyMiddleware(thunk))
    return store
}

export default configureStore();