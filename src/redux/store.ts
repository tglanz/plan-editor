import * as redux from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './rootReducer';

const DEVTOOLS_ENABLED = true;

export const createStore = () => {
    if (DEVTOOLS_ENABLED) {
        return redux.createStore(rootReducer, composeWithDevTools());
    } else {
        return redux.createStore(rootReducer);
    }
}