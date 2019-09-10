import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers/places';
import thunk from 'redux-thunk';

export default function configureStore() {
    let store = createStore(rootReducer, applyMiddleware(thunk))
    return store
}