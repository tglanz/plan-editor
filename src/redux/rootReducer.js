import {combineReducers} from 'redux';

import * as graph from './graph';

export default combineReducers({
    graph: graph.reducer
});